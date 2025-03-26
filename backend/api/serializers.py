# api/serializers.py
from rest_framework import serializers
from .models import Product, ProductCategory, ProductImage, Cart, CartItem, Order, OrderItem, Delivery
from decimal import Decimal

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_main']

class ProductSerializer(serializers.ModelSerializer):
    product_category = ProductCategorySerializer()
    thumbnails = ProductImageSerializer(many=True, read_only=True)
    main_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'currency', 'description', 'product_description', 'colors', 'features', 'product_category', 'created_at', 'thumbnails', 'main_image', 'increment_step']

    def get_main_image(self, obj):
        return obj.get_main_image()

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    design_file = serializers.FileField(required=False)
    item_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'design_file', 'additional_info', 'color', 'item_total']

    def get_item_total(self, obj):
        increment_step = max(obj.product.increment_step or 1, 1)
        units = Decimal(obj.quantity) / Decimal(increment_step)
        return obj.product.price * units

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    total = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at', 'total', 'item_count']

    def get_total(self, obj):
        return sum(
            (item.product.price * (Decimal(item.quantity) / Decimal(max(item.product.increment_step or 1, 1))))
            for item in obj.items.all()
        )

    def get_item_count(self, obj):
        return obj.items.count()

class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['address', 'city', 'state', 'postcode']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    design_file = serializers.FileField(required=False)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'design_file', 'additional_info', 'color']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    delivery = DeliverySerializer(required=False)

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 'total_amount', 'status', 'created_at', 'transaction_id', 'delivery_option', 'delivery']

    def create(self, validated_data):
        delivery_data = validated_data.pop('delivery', None)
        items_data = validated_data.pop('items', [])
        order = Order.objects.create(**validated_data)
        if delivery_data:
            Delivery.objects.create(order=order, **delivery_data)
        for item_data in items_data:
            product = item_data.pop('product')
            OrderItem.objects.create(order=order, product=product, **item_data)
        return order


