# Generated by Django 5.0.4 on 2024-05-09 08:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sanpham',
            name='ThuongHieu',
        ),
    ]