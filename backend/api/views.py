

# from rest_framework import viewsets, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, Delivery
# from .serializers import ProductSerializer, ProductCategorySerializer, CartSerializer, CartItemSerializer, OrderSerializer

# class ProductList(APIView):
#     def get(self, request):
#         products = Product.objects.all()
#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data)

# class ProductCategoryViewSet(viewsets.ModelViewSet):
#     queryset = ProductCategory.objects.all()
#     serializer_class = ProductCategorySerializer
#     permission_classes = [permissions.AllowAny]

# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.AllowAny]

#     @action(detail=True, methods=['get'])
#     def details(self, request, pk=None):
#         try:
#             product = self.get_object()
#             serializer = ProductSerializer(product)
#             return Response(serializer.data)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

# class CartViewSet(viewsets.ModelViewSet):
#     serializer_class = CartSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)

#     def list(self, request, *args, **kwargs):
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         serializer = self.get_serializer(cart)
#         return Response(serializer.data)  # Returns single object, not list

#     @action(detail=False, methods=['post'])
#     def add_item(self, request, pk=None):
#         print("Reached add_item with POST:", request.data, request.FILES)
#         cart, created = Cart.objects.get_or_create(user=self.request.user)
#         product_id = request.data.get('product_id')
#         quantity = int(request.data.get('quantity', 1))
#         design_file = request.FILES.get('design_file')
#         additional_info = request.data.get('additional_info')
#         color = request.data.get('color')

#         try:
#             product = Product.objects.get(id=product_id)
#             if quantity < 1:
#                 return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

#         cart_item, created = CartItem.objects.get_or_create(
#             cart=cart,
#             product=product,
#             defaults={'quantity': quantity, 'design_file': design_file, 'additional_info': additional_info, 'color': color}
#         )
#         if not created:
#             cart_item.quantity += quantity
#             if design_file:
#                 cart_item.design_file = design_file
#             if additional_info:
#                 cart_item.additional_info = additional_info
#             if color:
#                 cart_item.color = color
#             cart_item.save()
#         serializer = CartItemSerializer(cart_item)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     @action(detail=True, methods=['patch'])
#     def update_quantity(self, request, pk=None):
#         cart = self.get_object()
#         cart_item_id = request.data.get('cart_item_id')
#         quantity = int(request.data.get('quantity', 1))
#         try:
#             cart_item = CartItem.objects.get(cart=cart, id=cart_item_id)
#             if quantity < 1:
#                 return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)
#             cart_item.quantity = quantity
#             cart_item.save()
#             return Response({'status': 'quantity updated'})
#         except CartItem.DoesNotExist:
#             return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

#     @action(detail=True, methods=['delete'], url_path=r'items/(?P<item_id>\d+)')
#     def remove_item(self, request, pk=None, item_id=None):
#         cart = self.get_object()
#         try:
#             cart_item = CartItem.objects.get(cart=cart, id=item_id)
#             cart_item.delete()
#             return Response({'status': 'item removed'})
#         except CartItem.DoesNotExist:
#             return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

# class OrderViewSet(viewsets.ModelViewSet):
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user)

#     @action(detail=False, methods=['post'])
#     def create_from_cart(self, request):
#         cart = Cart.objects.get(user=self.request.user)
#         total_amount = sum(item.product.price * item.quantity for item in cart.items.all())
#         delivery_option = request.data.get('delivery_option', 'pickup')
#         if delivery_option not in ['pickup', 'delivery']:
#             return Response({'error': 'Invalid delivery option'}, status=status.HTTP_400_BAD_REQUEST)

#         delivery_data = {
#             'address': request.data.get('delivery_address'),
#             'city': request.data.get('delivery_city'),
#             'state': request.data.get('delivery_state'),
#             'postcode': request.data.get('delivery_postcode'),
#         }

#         order = Order.objects.create(
#             user=self.request.user,
#             total_amount=total_amount,
#             delivery_option=delivery_option
#         )
#         if delivery_option == 'delivery' and any(delivery_data.values()):
#             Delivery.objects.create(order=order, **{k: v for k, v in delivery_data.items() if v})

#         for item in cart.items.all():
#             OrderItem.objects.create(
#                 order=order,
#                 product=item.product,
#                 quantity=item.quantity,
#                 price=item.product.price,
#                 design_file=item.design_file,
#                 additional_info=item.additional_info,
#                 color=item.color
#             )
#         cart.items.all().delete()
#         serializer = OrderSerializer(order)
#         return Response(serializer.data)
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, Delivery
from .serializers import ProductSerializer, ProductCategorySerializer, CartSerializer, CartItemSerializer, OrderSerializer

class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        try:
            product = self.get_object()
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)  # Returns single object, not list

    @action(detail=False, methods=['post'])
    def add_item(self, request, pk=None):
        print("Reached add_item with POST:", request.data, request.FILES)
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        design_file = request.FILES.get('design_file')
        additional_info = request.data.get('additional_info')
        color = request.data.get('color')

        try:
            product = Product.objects.get(id=product_id)
            if quantity < 1:
                return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity, 'design_file': design_file, 'additional_info': additional_info, 'color': color}
        )
        if not created:
            cart_item.quantity += quantity
            if design_file:
                cart_item.design_file = design_file
            if additional_info:
                cart_item.additional_info = additional_info
            if color:
                cart_item.color = color
            cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['patch'])
    def update_quantity(self, request, pk=None):
        cart = self.get_object()
        cart_item_id = request.data.get('cart_item_id')
        quantity = int(request.data.get('quantity', 1))
        try:
            cart_item = CartItem.objects.get(cart=cart, id=cart_item_id)
            if quantity < 1:
                return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = quantity
            cart_item.save()
            return Response({'status': 'quantity updated'})
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['delete'], url_path=r'items/(?P<item_id>\d+)')
    def remove_item(self, request, pk=None, item_id=None):
        cart = self.get_object()
        try:
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            cart_item.delete()
            return Response({'status': 'item removed'})
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['put'], url_path=r'items/(?P<item_id>\d+)/update')
    def update_item(self, request, pk=None, item_id=None):
        cart = self.get_object()
        try:
            cart_item = CartItem.objects.get(cart=cart, id=item_id)
            quantity = int(request.data.get('quantity', cart_item.quantity))
            design_file = request.FILES.get('design_file', cart_item.design_file)
            additional_info = request.data.get('additional_info', cart_item.additional_info)
            color = request.data.get('color', cart_item.color)

            if quantity < 1:
                return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)

            cart_item.quantity = quantity
            cart_item.design_file = design_file if design_file != '' else cart_item.design_file
            cart_item.additional_info = additional_info if additional_info != '' else cart_item.additional_info
            cart_item.color = color if color != '' else cart_item.color

            # If design_file or additional_info is explicitly set to an empty string, clear the field
            if 'design_file' in request.data and request.data['design_file'] == '':
                cart_item.design_file = None
            if 'additional_info' in request.data and request.data['additional_info'] == '':
                cart_item.additional_info = None

            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def create_from_cart(self, request):
        cart = Cart.objects.get(user=self.request.user)
        total_amount = sum(item.product.price * item.quantity for item in cart.items.all())
        delivery_option = request.data.get('delivery_option', 'pickup')
        if delivery_option not in ['pickup', 'delivery']:
            return Response({'error': 'Invalid delivery option'}, status=status.HTTP_400_BAD_REQUEST)

        delivery_data = {
            'address': request.data.get('delivery_address'),
            'city': request.data.get('delivery_city'),
            'state': request.data.get('delivery_state'),
            'postcode': request.data.get('delivery_postcode'),
        }

        order = Order.objects.create(
            user=self.request.user,
            total_amount=total_amount,
            delivery_option=delivery_option
        )
        if delivery_option == 'delivery' and any(delivery_data.values()):
            Delivery.objects.create(order=order, **{k: v for k, v in delivery_data.items() if v})

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
                design_file=item.design_file,
                additional_info=item.additional_info,
                color=item.color
            )
        cart.items.all().delete()
        serializer = OrderSerializer(order)
        return Response(serializer.data)