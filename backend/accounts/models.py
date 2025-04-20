from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        ('individual', 'Individual'),
        ('organization', 'Organization'),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)  # Added null=True
    phone_number = models.CharField(max_length=20)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='individual')
    organization_name = models.CharField(max_length=255, blank=True, null=True)  # Added null=True
    company_address = models.TextField(blank=True, null=True)  # Added null=True
    account_administrator_name = models.CharField(max_length=255, blank=True, null=True)  # Added null=True
    account_administrator_role = models.CharField(max_length=255, blank=True, null=True)  # Added null=True
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)  # Added null=True
    verification_token_expires_at = models.DateTimeField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def set_verification_token(self):
        self.verification_token = str(uuid.uuid4())
        self.verification_token_expires_at = timezone.now() + timezone.timedelta(hours=24)
        self.save()

    def is_verification_token_expired(self):
        if not self.verification_token_expires_at:
            return True
        return timezone.now() > self.verification_token_expires_at

class DeliveryDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='delivery_details')
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postcode = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s delivery details"