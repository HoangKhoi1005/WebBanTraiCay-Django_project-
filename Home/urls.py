from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
# from .models import Post
from django.views.generic import ListView
from .views import CapNhatGH
from django.conf import settings
from django.conf.urls.static import static
app_name =  'UserMember'

urlpatterns = [
    path('', views.index, name='index'),
    path('cart.html/', views.listGioHang, name='dsSPGioHang'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    # path('DSBaiViet/', views.list, name='dsbaiviet'),
    path('DangKy/', views.register.as_view(), name="register"),
    path('DangNhap/', views.UserLogin.as_view(), name="DangNhap"),
    path('DangXuat/',views.UserLogout,name='DangXuat'),
    path('capNhatGH/', views.CapNhatGH, name='capNhatGH'),
    path('xoaSPGH/', views.xoaSPGH, name='xoaSPGH'),
    path('soLuongSP/', views.soLuong, name='soLuongSP'),
    path('SanPham/Detail/<int:product_id>/', views.chiTietSP, name='chiTietSP'),
    path('DSSanPham/', views.DSSanPham, name='SanPham'),
    path('GioiThieu/',views.GioiThieu,name='GioiThieu'),
    path('TinTuc/',views.TinTuc,name='TinTuc'),
    path('LienHe/',views.LienHe,name='LienHe'),
    
    #Admin danhMuc
    path('themDanhMuc/',views.themLoai,name='themDanhMuc'),
    path('quanLyDanhMuc/',views.QuanLyDanhMuc,name='quanLyDanhMuc'),
    path('suaDanhMuc/<int:id>/', views.SuaDanhMuc, name='suaDanhMuc'),
    path('xoaDanhMuc/<int:id>/', views.XoaDanhMuc, name='xoaDanhMuc'),
    
    
    #Admin sanPham
    path('quanLySanPham/',views.QuanLySanPham,name='quanLySanPham'),
    path('themSanPham/', views.ThemSanPham, name='themSanPham'),
    path('suaSanPham/<int:id>/', views.SuaSanPham, name='suaSanPham'),
    path('xoaSanPham/<int:id>/', views.XoaSanPham, name='xoaSanPham'),      
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)