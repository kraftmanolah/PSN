# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from .models import User, DeliveryDetails

# # Inline for DeliveryDetails in User detail page
# class DeliveryDetailsInline(admin.StackedInline):
#     model = DeliveryDetails
#     can_delete = True  # Allow deletion since DeliveryDetails is optional
#     extra = 0  # Don't show an extra empty form by default
#     verbose_name_plural = "Delivery Details"

# # Custom UserAdmin to include delivery details
# class UserAdmin(BaseUserAdmin):
#     # Fields to display in the Users table
#     list_display = (
#         "email",
#         "user_type",
#         "full_name",
#         "organization_name",
#         "phone_number",
#         "is_staff",
#         "delivery_address",
#         "delivery_city",
#         "delivery_state",
#         "delivery_postcode",
#     )
#     # Fields to search by
#     search_fields = ("email", "full_name", "organization_name", "phone_number")
#     # Filters for easier navigation
#     list_filter = ("user_type", "is_staff", "is_superuser", "is_active")
#     # Make email clickable
#     list_display_links = ("email",)
#     # Add the DeliveryDetails inline to the User detail page
#     inlines = [DeliveryDetailsInline]

#     # Custom methods to display delivery details from DeliveryDetails
#     def delivery_address(self, obj):
#         return obj.delivery_details.address if hasattr(obj, 'delivery_details') and obj.delivery_details else "-"
#     delivery_address.short_description = "Delivery Address"

#     def delivery_city(self, obj):
#         return obj.delivery_details.city if hasattr(obj, 'delivery_details') and obj.delivery_details else "-"
#     delivery_city.short_description = "Delivery City"

#     def delivery_state(self, obj):
#         return obj.delivery_details.state if hasattr(obj, 'delivery_details') and obj.delivery_details else "-"
#     delivery_state.short_description = "Delivery State"

#     def delivery_postcode(self, obj):
#         return obj.delivery_details.postcode if hasattr(obj, 'delivery_details') and obj.delivery_details else "-"
#     delivery_postcode.short_description = "Delivery Postcode"

# # Check if User is registered before unregistering
# if admin.site.is_registered(User):
#     admin.site.unregister(User)

# # Register the User model with the custom UserAdmin
# admin.site.register(User, UserAdmin)

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, DeliveryDetails

# Inline for DeliveryDetails in User detail page
class DeliveryDetailsInline(admin.StackedInline):
    model = DeliveryDetails
    can_delete = True  # Allow deletion since DeliveryDetails is optional
    extra = 0  # Don't show an extra empty form by default
    verbose_name_plural = "Delivery Details"

# Custom UserAdmin to include delivery details
class UserAdmin(BaseUserAdmin):
    # Fields to display in the Users table
    list_display = (
        "email",
        "user_type",
        "full_name",
        "organization_name",
        "phone_number",
        "is_staff",
        "delivery_address",
        "delivery_city",
        "delivery_state",
        "delivery_postcode",
    )
    # Fields to search by
    search_fields = ("email", "full_name", "organization_name", "phone_number")
    # Filters for easier navigation
    list_filter = ("user_type", "is_staff", "is_superuser", "is_active")
    # Make email clickable
    list_display_links = ("email",)
    # Add the DeliveryDetails inline to the User detail page
    inlines = [DeliveryDetailsInline]
    
    # Override ordering to use a field that exists in the User model
    ordering = ("email",)
    
    # Override filter_horizontal to remove groups and user_permissions
    filter_horizontal = ()
    
    # Define fieldsets for editing an existing user
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("full_name", "phone_number", "user_type")}),
        ("Organization Info", {"fields": ("organization_name", "company_address", "account_administrator_name", "account_administrator_role")}),
        ("Verification", {"fields": ("is_verified", "verification_token", "verification_token_expires_at")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )
    
    # Define add_fieldsets for creating a new user
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "user_type", "full_name", "phone_number"),
        }),
    )

    # Custom methods to display delivery details from DeliveryDetails
    def delivery_address(self, obj):
        return obj.delivery_details.address if hasattr(obj, "delivery_details") and obj.delivery_details else "-"
    delivery_address.short_description = "Delivery Address"

    def delivery_city(self, obj):
        return obj.delivery_details.city if hasattr(obj, "delivery_details") and obj.delivery_details else "-"
    delivery_city.short_description = "Delivery City"

    def delivery_state(self, obj):
        return obj.delivery_details.state if hasattr(obj, "delivery_details") and obj.delivery_details else "-"
    delivery_state.short_description = "Delivery State"

    def delivery_postcode(self, obj):
        return obj.delivery_details.postcode if hasattr(obj, "delivery_details") and obj.delivery_details else "-"
    delivery_postcode.short_description = "Delivery Postcode"

# Check if User is registered before unregistering
if admin.site.is_registered(User):
    admin.site.unregister(User)

# Register the User model with the custom UserAdmin
admin.site.register(User, UserAdmin)