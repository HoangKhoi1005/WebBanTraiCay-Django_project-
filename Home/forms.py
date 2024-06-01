from django import forms
from django.contrib.auth.models import User
import re

from .models import CustomUser, LoaiSanPham, SanPham  # Import CustomUser từ mô hình của bạn

class RegistrationForm(forms.Form):
    username = forms.CharField(label='Tài khoản')
    email = forms.EmailField(label='Email')
    phone = forms.CharField(label='Số điện thoại')
    password1 = forms.CharField(label='Mật khẩu', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Nhập lại mật khẩu', widget=forms.PasswordInput())
    
    def clean_password2(self):
        if 'password1' in self.cleaned_data:
            password1 = self.cleaned_data['password1']
            password2 = self.cleaned_data['password2']
            if password1 == password2 and password1:
                return password2
        raise forms.ValidationError("Mật khẩu không hợp lệ")

    def clean_username(self):
        username = self.cleaned_data['username']
        if not re.search(r'^\w+$', username):
            raise forms.ValidationError("Tên tài khoản có kí tự đặc biệt")
        try:
            CustomUser.objects.get(username=username)  # Sử dụng CustomUser thay vì User
        except CustomUser.DoesNotExist:  # Thay vì User.DoesNotExist
            return username
        raise forms.ValidationError("Tài khoản đã tồn tại")

    def save(self):
        CustomUser.objects.create_user(  # Sử dụng CustomUser thay vì User
            username=self.cleaned_data['username'], 
            email=self.cleaned_data['email'], 
            password=self.cleaned_data['password1'],
            phone=self.cleaned_data['phone']
        )

class LoginForm(forms.Form):
    username = forms.CharField(label='Tài khoản')
    password = forms.CharField(label='Mật khẩu', widget=forms.PasswordInput())
    
class themLoaiForm(forms.Form):
    TenLoaiSP = forms.CharField(label='Tên loại', max_length=100)
    
    def clean_TenLoai(self):
        TenLoaiSP = self.cleaned_data['TenLoaiSP']
        
        try :
            LoaiSanPham.objects.get(TenLoaiSP=TenLoaiSP)
        except LoaiSanPham.DoesNotExist:
            return TenLoaiSP
        raise forms.ValidationError("Tên loại đã tồn tại")
    
    def save(self):
        LoaiSanPham.objects.create(TenLoaiSP = self.cleaned_data['TenLoaiSP'])
        
class suaLoaiForm(forms.ModelForm):
    class Meta:
        model = LoaiSanPham
        fields = ['TenLoaiSP']
        labels = {
            'TenLoaiSP': 'Tên loại'
        }
    
    def clean_TenLoaiSP(self):
        TenLoaiSP = self.cleaned_data['TenLoaiSP']
        
        try:
            LoaiSanPham.objects.get(TenLoaiSP=TenLoaiSP)
        except LoaiSanPham.DoesNotExist:
            return TenLoaiSP
        raise forms.ValidationError("Tên loại đã tồn tại")
    
    def save(self, commit=True):
        loai_san_pham = super().save(commit=False)
        loai_san_pham.TenLoaiSP = self.cleaned_data['TenLoaiSP']
        if commit:
            loai_san_pham.save()
        return loai_san_pham

class SanPhamForm(forms.ModelForm):
    class Meta:
        model = SanPham
        fields = [
            'TenSP', 'NguonGoc', 'MoTa', 'GiaCu', 'GiaMoi', 
            'Anh', 'Anh1', 'NgayNhap', 'MaLoai'
        ]
        widgets = {
            'NgayNhap': forms.DateInput(attrs={'type': 'date'}),
        }
        labels = {
            'TenSP': 'Tên Sản Phẩm',
            'NguonGoc': 'Nguồn Gốc',
            'MoTa': 'Mô Tả',
            'GiaCu': 'Giá Cũ',
            'GiaMoi': 'Giá Mới',
            'Anh': 'Ảnh',
            'Anh1': 'Ảnh 1',
            'NgayNhap': 'Ngày Nhập',
            'MaLoai': 'Loại Sản Phẩm',
        }

    def __init__(self, *args, **kwargs):
        super(SanPhamForm, self).__init__(*args, **kwargs)
        self.fields['MaLoai'].queryset = LoaiSanPham.objects.all()