from django.db import models
from django.conf import settings

class ProductCategory(models.Model):
    name = models.CharField(max_length=255, unique=True, default="General")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Product category"
        verbose_name_plural = "Product categories"

class Product(models.Model):
    name = models.CharField(max_length=255, default="Default Product Name")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default='₦')
    description = models.CharField(max_length=255, default="Per item")
    product_description = models.TextField(default="Detailed product description goes here.")
    colors = models.JSONField(default=list)
    features = models.JSONField(default=list)
    product_category = models.ForeignKey(
        ProductCategory, 
        on_delete=models.CASCADE, 
        related_name="products", 
        default=1
    )
    created_at = models.DateTimeField(auto_now_add=True)
    increment_step = models.IntegerField(default=1)  # New field added

    def __str__(self):
        return self.name

    def get_main_image(self):
        main_image = self.thumbnails.filter(is_main=True).first()
        return main_image.image.url if main_image else (self.thumbnails.first().image.url if self.thumbnails.exists() else None)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='thumbnails')
    image = models.ImageField(upload_to='product_images/')
    is_main = models.BooleanField(default=False, help_text="Mark as main image if true")

    def __str__(self):
        return f"Thumbnail for {self.product.name} (Main: {self.is_main})"

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.email}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    design_file = models.FileField(upload_to='cart_designs/', null=True, blank=True)
    additional_info = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"

class Delivery(models.Model):
    order = models.OneToOneField('Order', on_delete=models.CASCADE, related_name='delivery')
    address = models.CharField(max_length=255, null=True, blank=True, help_text="Delivery address")
    city = models.CharField(max_length=100, null=True, blank=True, help_text="Delivery city")
    state = models.CharField(max_length=100, null=True, blank=True, help_text="Delivery state")
    postcode = models.CharField(max_length=20, null=True, blank=True, help_text="Delivery postcode (optional)")

    def __str__(self):
        return f"Delivery for Order {self.order.id}"

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    delivery_option = models.CharField(max_length=20, choices=(('pickup', 'Pick Up'), ('delivery', 'Deliver to Address')), default='pickup')

    def __str__(self):
        return f"Order {self.id} by {self.user.email}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    design_file = models.FileField(upload_to='order_designs/', null=True, blank=True)
    additional_info = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"