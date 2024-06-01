from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class SanPham(models.Model):
    MaSP = models.AutoField(primary_key=True)
    TenSP = models.CharField(max_length=255)
    NguonGoc = models.TextField()
    MoTa = models.TextField()
    GiaCu = models.DecimalField(max_digits=10, decimal_places=2)
    GiaMoi = models.DecimalField(max_digits=10, decimal_places=2)
    Anh = models.ImageField(upload_to='')
    Anh1 = models.ImageField(upload_to='')
    NgayNhap = models.DateField()
    MaLoai = models.ForeignKey('LoaiSanPham', on_delete=models.CASCADE)

    def __str__(self):
        return self.TenSP

class LoaiSanPham(models.Model):
    MaLoaiSP = models.AutoField(primary_key=True)
    TenLoaiSP = models.CharField(max_length=255)

    def __str__(self):
        return self.TenLoaiSP

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, phone, password=None):
        if not email:
            raise ValueError("Email address is required")
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone=phone
        )
        user.set_password(password)
        user.save(using=self._db)
        
        # Tạo giỏ hàng cho người dùng mới
        gio_hang = GioHang.objects.create(user=user)
        gio_hang.update_cart()
        
        return user

    def create_superuser(self, email, username, phone, password=None):
        user = self.create_user(
            email=email,
            username=username,
            phone=phone,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'phone']

    def __str__(self):
        return self.username

class GioHang(models.Model):
    MaGH = models.AutoField(primary_key=True)
    TongTien = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    SoLuong = models.IntegerField(default=0)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Gio hang {self.MaGH}"

    def update_cart(self):
        # Tính tổng tiền và số lượng của các sản phẩm trong giỏ hàng
        tong_tien = 0
        so_luong = 0
        for item in self.giohangitem_set.all():
            tong_tien += item.TongTien
            so_luong += item.SoLuong

        # Cập nhật tổng tiền và số lượng của giỏ hàng
        self.TongTien = tong_tien
        self.SoLuong = so_luong
        self.save()

class GioHangItem(models.Model):
    MaGHI = models.AutoField(primary_key=True)
    SoLuong = models.IntegerField(default=0)
    TongTien = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    MaSP = models.ForeignKey('SanPham', on_delete=models.CASCADE)
    gio_hang = models.ForeignKey(GioHang, on_delete=models.CASCADE)

    def __str__(self):
        return f"Item in cart {self.MaGHI}"
