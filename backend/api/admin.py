# from django.contrib import admin
# from .models import Product

# # Register your models here.


from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget  # Install this package if not already installed
from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, ProductImage

class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "currency", "created_at")  # Fields displayed in the admin list
    search_fields = ("name",)  # Enable search by name
    list_filter = ("currency", "created_at")  # Filters for easier navigation

admin.site.register(Product, ProductAdmin)

# Register ProductCategory so it appears in the Django admin panel
@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")  # Customize how categories are displayed
    search_fields = ("name",)  # Enable search by category name

# Register ProductImage model (for thumbnails)
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image", "is_main")  # Display thumbnail details
    search_fields = ("product__name",)  # Enable search by product name
    list_filter = ("is_main",)  # Filter by whether it's the main image

# Register Cart model
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "created_at")  # Display cart ID, user email, and creation time
    search_fields = ("user__email",)  # Enable search by user email
    list_filter = ("created_at",)  # Filter by creation time

# Register CartItem model
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity")  # Display cart item details
    search_fields = ("product__name", "cart__user__email")  # Enable search by product name or user email
    list_filter = ("quantity",)  # Filter by quantity

# Register Order model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total_amount", "status", "delivery_option", "created_at")  # Display order details
    search_fields = ("user__email", "transaction_id")  # Enable search by user email or transaction ID
    list_filter = ("status", "delivery_option", "created_at")  # Filter by status, delivery option, and creation time

# Register OrderItem model
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price")  # Display order item details
    search_fields = ("product__name", "order__user__email")  # Enable search by product name or user email
    list_filter = ("quantity", "price")  # Filter by quantity and price