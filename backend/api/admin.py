# # from django.contrib import admin
# # from .models import Product

# # # Register your models here.


from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget
from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, ProductImage, Delivery

class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "currency", "created_at")
    search_fields = ("name",)
    list_filter = ("currency", "created_at")

admin.site.register(Product, ProductAdmin)

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "image", "is_main")
    search_fields = ("product__name",)
    list_filter = ("is_main",)

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "created_at")
    search_fields = ("user__email",)
    list_filter = ("created_at",)

@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("id", "cart", "product", "quantity")
    search_fields = ("product__name", "cart__user__email")
    list_filter = ("quantity",)

# Inline for Order Items in Order detail page
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # No extra empty rows

# Inline for Delivery in Order detail page
class DeliveryInline(admin.StackedInline):
    model = Delivery
    extra = 0  # No extra empty rows

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "total_amount",
        "status",
        "delivery_option",
        "delivery_address",
        "delivery_city",
        "delivery_state",
        "created_at",
    )
    search_fields = ("user__email", "transaction_id")
    list_filter = ("status", "delivery_option", "created_at")
    list_display_links = ("id", "user")
    inlines = [OrderItemInline, DeliveryInline]  # Add inlines for Order Items and Delivery

    # Custom methods to display delivery details
    def delivery_address(self, obj):
        return obj.delivery.address if obj.delivery else "-"
    delivery_address.short_description = "Delivery Address"

    def delivery_city(self, obj):
        return obj.delivery.city if obj.delivery else "-"
    delivery_city.short_description = "Delivery City"

    def delivery_state(self, obj):
        return obj.delivery.state if obj.delivery else "-"
    delivery_state.short_description = "Delivery State"

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "product", "quantity", "price", "design_file", "additional_info")
    search_fields = ("product__name", "order__user__email")
    list_filter = ("quantity", "price")
    list_display_links = ("id", "order")