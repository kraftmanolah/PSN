# accounts/models.py
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('individual', 'Individual'),
        ('organization', 'Organization'),
    )
    user_type = models.CharField(max_length=12, choices=USER_TYPE_CHOICES, default='individual')
    
    # Fields for all users (shared)
    email = models.EmailField(unique=True, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    
    # Fields for individuals
    full_name = models.CharField(max_length=255, blank=True, null=True)
    
    # Fields for organizations
    organization_name = models.CharField(max_length=255, blank=True, null=True)
    company_address = models.TextField(blank=True, null=True)
    account_administrator_name = models.CharField(max_length=255, blank=True, null=True)
    account_administrator_role = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        if self.user_type == 'individual':
            return self.full_name or self.email
        return self.organization_name or self.email

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number']

    objects = UserManager()

class DeliveryDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='delivery_details')
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    postcode = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Delivery details for {self.user.email}"