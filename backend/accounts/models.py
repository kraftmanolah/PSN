from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('individual', 'Individual'),
        ('organization', 'Organization'),
    )
    user_type = models.CharField(max_length=12, choices=USER_TYPE_CHOICES, default='individual')
    
    # Fields for all users (shared)
    email = models.EmailField(unique=True, null=False, blank=False)  # Use email as both username and unique identifier
    phone_number = models.CharField(max_length=20, null=False, blank=False)  # Required for all users (individuals and companies)
    
    # Fields for individuals
    full_name = models.CharField(max_length=255, blank=True, null=True)  # Required for individuals, optional in model for now
    
    # Fields for organizations (companies)
    organization_name = models.CharField(max_length=255, blank=True, null=True)  # Required for companies, optional in model for now
    company_address = models.TextField(blank=True, null=True)  # Required for companies, optional in model for now
    account_administrator_name = models.CharField(max_length=255, blank=True, null=True)  # Required for companies, optional in model for now
    account_administrator_role = models.CharField(max_length=100, blank=True, null=True)  # Required for companies, optional in model for now

    def __str__(self):
        if self.user_type == 'individual':
            return self.full_name or self.email
        return self.organization_name or self.email

    # Use email as the username field for authentication
    USERNAME_FIELD = 'email'  # Use email for authentication instead of username
    REQUIRED_FIELDS = ['phone_number']  # Required fields for createsuperuser, excluding user_type (inferred)

    # Explicitly use UserManager to ensure create_user() works with email as username
    objects = UserManager()  # Use Django’s UserManager instead of a generic Manager