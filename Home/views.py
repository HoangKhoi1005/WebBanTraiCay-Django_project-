import keyword
from django.contrib.auth.decorators import login_required
from urllib import request
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from .forms import RegistrationForm, LoginForm
from django.http import HttpResponseRedirect
from django.http import JsonResponse
# from Home.models import Post
from Home.models import SanPham,GioHang , GioHangItem
from django.contrib.auth.forms import UserCreationForm
from Home.models import CustomUser
from django.views import View
from .models import CustomUser, LoaiSanPham
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from django.core.paginator import Paginator
from .forms import themLoaiForm,suaLoaiForm,SanPhamForm
import os
from django.conf import settings

def index(request):
    products_hoa_qua_tuoi = SanPham.objects.filter(MaLoai_id=1)[:8]
    products_hoa_qua_dong_hop = SanPham.objects.filter(MaLoai_id=2)[:8]
    products_nuoc_hoa_qua = SanPham.objects.filter(MaLoai_id=5)[:8]
    products_hop_qua_hoa_qua = SanPham.objects.filter(MaLoai_id=4)[:8]
    
    return render(request, 'page/index.html', {'products_hoa_qua_tuoi': products_hoa_qua_tuoi,
                                                'products_hoa_qua_dong_hop': products_hoa_qua_dong_hop,
                                                'products_nuoc_hoa_qua': products_nuoc_hoa_qua,
                                                'products_hop_qua_hoa_qua': products_hop_qua_hoa_qua})


def cart(request):
    return render(request, 'page/cart.html')


def add_to_cart(request):
    if request.method == 'POST':
        product_id = request.POST.get('variantId')
        quantity = int(request.POST.get('quantity', 1))  # Lấy số lượng từ yêu cầu POST, mặc định là 1
        print(quantity);    
        if product_id:
            try:
                product = SanPham.objects.get(pk=product_id)
                # Tạo hoặc lấy giỏ hàng của người dùng
                cart, created = GioHang.objects.get_or_create(user=request.user)
                # Thêm sản phẩm vào giỏ hàng
                cart_item, item_created = GioHangItem.objects.get_or_create(gio_hang=cart, MaSP=product)
                
                if item_created:
                    cart_item.SoLuong = quantity
                    cart_item.TongTien = product.GiaMoi * quantity
                else:
                    cart_item.SoLuong += quantity
                    cart_item.TongTien += product.GiaMoi * quantity
                
                cart_item.save()
                # Cập nhật giỏ hàng sau khi thêm sản phẩm
                cart.update_cart()
                tongTien = cart.TongTien
                anh = product.Anh
                image_url = f"{product.Anh}" 
                # Trả về một phản hồi JSON với thông tin sản phẩm đã thêm vào giỏ hàng
                return JsonResponse({
                    'success': True,
                    'product_name': product.TenSP,
                    'product_price': product.GiaMoi,
                    'tongTien': tongTien,
                    'soLuong': quantity,
                    'anh': image_url
                })
            except SanPham.DoesNotExist:
                return JsonResponse({'success': False, 'error': 'Sản phẩm không tồn tại.'})
        return JsonResponse({'success': False, 'error': 'Yêu cầu không hợp lệ.'})
    return JsonResponse({'success': False, 'error': 'Yêu cầu không hợp lệ.'})


class register(View):
     def get(self,request):
         form = RegistrationForm()
         return render(request, 'page/DangKy.html', {'form': form})
     def post(self,request):
         username = request.POST['username']
         email = request.POST['email']
         phone = request.POST['phone']
         password = request.POST['password1']
         user = CustomUser.objects.create_user(email,username,phone,password)
         user.save()
         return redirect('UserMember:DangNhap')
     
class UserLogin(View):
    def get(self,request):
         formDangNhap = LoginForm()
         return render(request, 'page/DangNhap.html', {'formDangNhap': formDangNhap})
    def post(self,request):
         username = request.POST.get('username')
         password = request.POST.get('password')
         user = authenticate(request,username=username,password=password)
         if user is not None:
             login(request,user)
             return redirect('UserMember:index')
         else:
             return HttpResponse('login fail')
         
def UserLogout(request):
    logout(request)
    return redirect('UserMember:index')

@login_required(login_url='/DangNhap/')
def listGioHang(request):
    user = request.user
    try:
        cart = GioHang.objects.get(user=user)
        tong_tien = cart.TongTien
        data = {
            'DM_GH': GioHangItem.objects.filter(gio_hang=cart),
            'TongTien': tong_tien,
        }
    except GioHang.DoesNotExist:
        # Nếu giỏ hàng không tồn tại, tạo một giỏ hàng mới cho người dùng
        cart = GioHang.objects.create(user=user)
        data = {
            'DM_GH': [],
            'TongTien': 0,
        }

    return render(request, 'page/cart.html', data)

def CapNhatGH(request):
    variant_id = request.POST.get('variantId')
    action = request.POST.get('action')
    try:
        cart = GioHang.objects.get(user=request.user)
        cart_item = get_object_or_404(GioHangItem, gio_hang=cart, MaSP_id=variant_id)
        
        if action == 'increase':
            cart_item.SoLuong += 1
        elif action == 'decrease' and cart_item.SoLuong > 1:
            cart_item.SoLuong -= 1
        
        cart_item.TongTien = cart_item.SoLuong * cart_item.MaSP.GiaMoi
        cart_item.save()
        cart.update_cart()
        
        return JsonResponse({
            'success': True,
            'item_total': cart_item.TongTien,
            'cart_total': cart.TongTien,
            'item_quantity': cart_item.SoLuong
        })
    except SanPham.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Sản phẩm không tồn tại.'})
    except GioHang.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Giỏ hàng không tồn tại.'})
    
def xoaSPGH(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        try:
            cart = GioHang.objects.get(user=request.user)
            cart_item = GioHangItem.objects.get(gio_hang__user=request.user, MaSP_id=product_id)
            cart_item.delete()
            
            cart_item.gio_hang.update_cart()
            cart.update_cart()
            return JsonResponse({
                'success': True,
                'cart_total': cart.TongTien,
            })
            return JsonResponse({'success': True})
        except GioHangItem.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Sản phẩm không tồn tại trong giỏ hàng.'})
    return JsonResponse({'success': False, 'error': 'Yêu cầu không hợp lệ.'})

# Trong view của bạn

def soLuong(request):
    try:
        cart = GioHang.objects.get(user=request.user)
        so_luong_san_pham = cart.SoLuong
    except GioHang.DoesNotExist:
        so_luong_san_pham = 0

    return JsonResponse({'so_luong_san_pham': so_luong_san_pham})

def chiTietSP(request, product_id):
    san_pham = get_object_or_404(SanPham, MaSP=product_id)
    loaiSP = SanPham.objects.filter(MaLoai_id=san_pham.MaLoai).exclude(MaSP=product_id)[:4]
    return render(request, 'page/chiTietSP.html', {'san_pham': san_pham, 'loai_sp': loaiSP})

def DSSanPham(request):
    keyword = request.POST.get("keyword", "")
    sort = request.GET.get('sort', '')
    
    if keyword:
        product_list = SanPham.objects.filter(TenSP__icontains=keyword)
        ten_loai = "Tìm kiếm cho " + keyword
        ma_loai = None
    else:
        ma_loai = request.GET.get('loai')
        if ma_loai:
            loai_sp = LoaiSanPham.objects.get(MaLoaiSP=ma_loai)
            product_list = SanPham.objects.filter(MaLoai=ma_loai)
            ten_loai = loai_sp.TenLoaiSP
        else:
            product_list = SanPham.objects.all()
            ten_loai = "Tất cả sản phẩm"

    # Xử lý sắp xếp
    if sort == 'NgayCu':
        product_list = product_list.order_by('-NgayNhap')
        ten_loai = "Hàng cũ nhất"
    elif sort == 'NgayMoi':
        product_list = product_list.order_by('NgayNhap')
        ten_loai = "Hàng mới nhất"
    elif sort == 'GiaTang':
        product_list = product_list.order_by('GiaMoi')
        ten_loai = "Giá tăng dần"
    elif sort == 'GiaGiam':
        product_list = product_list.order_by('-GiaMoi')
        ten_loai = "Giá giảm dần"

    paginator = Paginator(product_list, 8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    loai_san_pham_list = LoaiSanPham.objects.all()

    return render(request, 'page/DSSanPham.html', {
        'dsSanPham': page_obj,
        'ten_loai': ten_loai,
        'ma_loai': ma_loai,
        'sort':sort,
        'loai_san_pham_list': loai_san_pham_list,
    })

def loaiSP(request):
    loai_san_pham_list = LoaiSanPham.objects.all()
    return {'loaiSanPhamList': loai_san_pham_list}

def themLoai(request):
    form = themLoaiForm()
    if request.method == 'POST':
        form = themLoaiForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/themDanhMuc/')
    return render(request, 'page/ThemDanhMuc.html', {'form':form})

def QuanLyDanhMuc(request):
    loai_san_pham_list = LoaiSanPham.objects.all()
    paginator = Paginator(loai_san_pham_list, 4) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'page/QuanLyDanhMuc.html', {'dsLoaiSP': page_obj})

def SuaDanhMuc(request, id):
    loai_san_pham = get_object_or_404(LoaiSanPham, pk=id)
    if request.method == 'POST':
        form = suaLoaiForm(request.POST, instance=loai_san_pham)
        if form.is_valid():
            form.save()
            return redirect('UserMember:quanLyDanhMuc')
    else:
        form = suaLoaiForm(instance=loai_san_pham)
    return render(request, 'page/SuaDanhMuc.html', {'form': form})

def XoaDanhMuc(request, id):
    loai_san_pham = get_object_or_404(LoaiSanPham, pk=id)
    if request.method == 'POST':
        loai_san_pham.delete()
        return redirect('UserMember:quanLyDanhMuc')
    return render(request, 'page/XoaDanhMuc.html', {'loai_san_pham': loai_san_pham})

def QuanLySanPham(request):
    danh_sach_san_pham = SanPham.objects.all()
    paginator = Paginator(danh_sach_san_pham, 8) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'page/QuanLySanPham.html', {'dsSanPham': page_obj})

def ThemSanPham(request):
    if request.method == 'POST':
        TenSP = request.POST['TenSP']
        NguonGoc = request.POST['NguonGoc']
        MoTa = request.POST['MoTa']
        GiaCu = request.POST['GiaCu']
        GiaMoi = request.POST['GiaMoi']
        Anh = request.FILES['Anh']
        Anh1 = request.FILES['Anh1']
        NgayNhap = request.POST['NgayNhap']
        MaLoai = request.POST['MaLoai']
        
        loai = LoaiSanPham.objects.get(MaLoaiSP=MaLoai)
        
        # Concatenate the image name with the desired path
        image_path = os.path.join('assets', 'images', Anh.name)
        image_path1 = os.path.join('assets', 'images', Anh1.name)
        

        san_pham = SanPham(
            TenSP=TenSP,
            NguonGoc=NguonGoc,
            MoTa=MoTa,
            GiaCu=GiaCu,
            GiaMoi=GiaMoi,
            Anh=image_path,  # Save the path to the database
            Anh1=image_path1,  # Save the path to the database
            NgayNhap=NgayNhap,
            MaLoai=loai
        )
        san_pham.save()
        return redirect('UserMember:quanLySanPham')

    loaiSanPhamList = LoaiSanPham.objects.all()
    return render(request, 'page/ThemSanPham.html', {'loaiSanPhamList': loaiSanPhamList})

def SuaSanPham(request, id):
    san_pham = get_object_or_404(SanPham, MaSP=id)
    
    if request.method == 'POST':
        san_pham.TenSP = request.POST['TenSP']
        san_pham.NguonGoc = request.POST['NguonGoc']
        san_pham.MoTa = request.POST['MoTa']
        san_pham.GiaCu = request.POST['GiaCu']
        san_pham.GiaMoi = request.POST['GiaMoi']
        
        # Check if new image files are uploaded
        if 'Anh' in request.FILES:
            san_pham.Anh = request.FILES['Anh']
            # Update image path in case of a new image upload
            san_pham.Anh = os.path.join('assets', 'images', request.FILES['Anh'].name)
        
        if 'Anh1' in request.FILES:
            san_pham.Anh1 = request.FILES['Anh1']
            # Update image path in case of a new image upload
            san_pham.Anh1 = os.path.join('assets', 'images', request.FILES['Anh1'].name)

        
        san_pham.NgayNhap = request.POST['NgayNhap']
        san_pham.MaLoai = LoaiSanPham.objects.get(id=request.POST['MaLoai'])
        san_pham.save()
        return redirect('UserMember:quanLySanPham')

    loaiSanPhamList = LoaiSanPham.objects.all()
    return render(request, 'page/SuaSanPham.html', {'san_pham': san_pham, 'loaiSanPhamList': loaiSanPhamList})


def XoaSanPham(request, id):
    san_pham = get_object_or_404(SanPham, MaSP=id)
    if request.method == 'POST':
        san_pham.delete()
        return redirect('UserMember:quanLySanPham')
    return render(request, 'page/XoaSanPham.html', {'san_pham': san_pham})

def GioiThieu(request):
    return render(request, 'page/GioiThieu.html')

def TinTuc(request):
    return render(request, 'page/TinTuc.html')

def LienHe(request):
    return render(request, 'page/LienHe.html')