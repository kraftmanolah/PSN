# Generated by Django 5.1.3 on 2025-02-24 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_user_phone_number'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
            ],
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=20),
        ),
    ]
