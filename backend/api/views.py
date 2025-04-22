# from rest_framework import viewsets, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, Delivery
# from .serializers import ProductSerializer, ProductCategorySerializer, CartSerializer, CartItemSerializer, OrderSerializer
# from django.db.models import Q
# from django.conf import settings
# from django.core.mail import send_mail
# from django.template.loader import render_to_string
# import requests
# from decimal import Decimal

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

# class SearchAPIView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def get(self, request):
#         query = request.query_params.get("q", "")
#         if not query:
#             return Response({"error": "Query parameter 'q' is required"}, status=status.HTTP_400_BAD_REQUEST)

#         products = Product.objects.filter(
#             Q(name__icontains=query) |
#             Q(description__icontains=query) |
#             Q(product_description__icontains=query) |
#             Q(product_category__name__icontains=query)
#         ).distinct()

#         serializer = ProductSerializer(products, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class CartViewSet(viewsets.ModelViewSet):
#     serializer_class = CartSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Cart.objects.filter(user=self.request.user)

#     def list(self, request, *args, **kwargs):
#         cart, created = Cart.objects.get_or_create(user=request.user)
#         serializer = self.get_serializer(cart)
#         return Response(serializer.data)

#     @action(detail=False, methods=['post'])
#     def add_item(self, request, pk=None):
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
#             return Response({'error': 'Cart item not found'}, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['delete'], url_path=r'items/(?P<item_id>\d+)')
#     def remove_item(self, request, pk=None, item_id=None):
#         cart = self.get_object()
#         try:
#             cart_item = CartItem.objects.get(cart=cart, id=item_id)
#             cart_item.delete()
#             return Response({'status': 'item removed'})
#         except CartItem.DoesNotExist:
#             return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

#     @action(detail=True, methods=['put'], url_path=r'items/(?P<item_id>\d+)/update')
#     def update_item(self, request, pk=None, item_id=None):
#         cart = self.get_object()
#         try:
#             cart_item = CartItem.objects.get(cart=cart, id=item_id)
#             quantity = int(request.data.get('quantity', cart_item.quantity))
#             design_file = request.FILES.get('design_file', cart_item.design_file)
#             additional_info = request.data.get('additional_info', cart_item.additional_info)
#             color = request.data.get('color', cart_item.color)

#             if quantity < 1:
#                 return Response({'error': 'Quantity must be at least 1'}, status=status.HTTP_400_BAD_REQUEST)

#             cart_item.quantity = quantity
#             cart_item.design_file = design_file if design_file != '' else cart_item.design_file
#             cart_item.additional_info = additional_info if additional_info != '' else cart_item.additional_info
#             cart_item.color = color if color != '' else cart_item.color

#             if 'design_file' in request.data and request.data['design_file'] == '':
#                 cart_item.design_file = None
#             if 'additional_info' in request.data and request.data['additional_info'] == '':
#                 cart_item.additional_info = None

#             cart_item.save()
#             serializer = CartItemSerializer(cart_item)
#             return Response(serializer.data, status=status.HTTP_200_OK)
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
#         total_amount = sum(
#             item.product.price * (Decimal(item.quantity) / Decimal(max(item.product.increment_step or 1, 1)))
#             for item in cart.items.all()
#         )
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
#         return Response({'id': order.id, **serializer.data}, status=status.HTTP_201_CREATED)

#     @action(detail=True, methods=['post'])
#     def initialize_payment(self, request, pk=None):
#         order = self.get_object()
#         if order.status != 'pending':
#             return Response({'error': 'Order already processed'}, status=status.HTTP_400_BAD_REQUEST)

#         headers = {
#             'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
#             'Content-Type': 'application/json',
#         }
#         data = {
#             'email': request.user.email,
#             'amount': int(order.total_amount * 100),
#             'currency': 'NGN',
#             'callback_url': f'{settings.FRONTEND_URL}/order/summary?orderId={order.id}',
#         }
#         response = requests.post('https://api.paystack.co/transaction/initialize', headers=headers, json=data)
#         if response.status_code == 200:
#             return Response(response.json())
#         return Response({'error': 'Failed to initialize payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     @action(detail=True, methods=['post'])
#     def verify_payment(self, request, pk=None):
#         order = self.get_object()
#         reference = request.data.get('reference')
#         if not reference:
#             return Response({'error': 'Reference required'}, status=status.HTTP_400_BAD_REQUEST)

#         headers = {
#             'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
#         }
#         response = requests.get(f'https://api.paystack.co/transaction/verify/{reference}', headers=headers)
#         if response.status_code == 200:
#             data = response.json()
#             if data['status'] and data['data']['status'] == 'success':
#                 order.status = 'processing'
#                 order.transaction_id = reference
#                 order.save()

#                 # Send emails to user and staff
#                 email_context = {
#                     'user': self.request.user,
#                     'order': order,
#                     'frontend_url': settings.FRONTEND_URL,
#                     'default_from_email': settings.DEFAULT_FROM_EMAIL,
#                 }

#                 # User email
#                 user_html_message = render_to_string('emails/order_confirmation_user.html', email_context)
#                 user_plain_message = render_to_string('emails/order_confirmation_user.txt', email_context)
#                 send_mail(
#                     subject='Order Confirmation - PrintShop Naija',
#                     message=user_plain_message,
#                     from_email=settings.DEFAULT_FROM_EMAIL,
#                     recipient_list=[self.request.user.email],
#                     html_message=user_html_message,
#                     fail_silently=True,
#                 )

#                 # Staff email
#                 staff_html_message = render_to_string('emails/order_notification_staff.html', email_context)
#                 staff_plain_message = render_to_string('emails/order_notification_staff.txt', email_context)
#                 send_mail(
#                     subject=f'New Order #{order.id} - PrintShop Naija',
#                     message=staff_plain_message,
#                     from_email=settings.DEFAULT_FROM_EMAIL,
#                     recipient_list=settings.STAFF_EMAILS,
#                     html_message=staff_html_message,
#                     fail_silently=True,
#                 )

#                 return Response({'status': 'Payment verified', 'order_id': order.id})
#         return Response({'error': 'Payment verification failed'}, status=status.HTTP_400_BAD_REQUEST)

#     @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAdminUser])
#     def update_status(self, request, pk=None):
#         order = self.get_object()
#         new_status = request.data.get('status')
#         if new_status not in ['pending', 'processing', 'completed', 'cancelled']:
#             return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
#         order.status = new_status
#         order.save()
#         serializer = self.get_serializer(order)
#         return Response(serializer.data)

#     @action(detail=True, methods=['post'])
#     def cancel(self, request, pk=None):
#         order = self.get_object()
#         if order.status != 'pending':
#             return Response({'error': 'Only pending orders can be cancelled'}, status=status.HTTP_400_BAD_REQUEST)
#         order.status = 'cancelled'
#         order.save()
#         serializer = self.get_serializer(order)
#         return Response({'message': 'Order cancelled successfully', 'order': serializer.data}, status=status.HTTP_200_OK)

from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, ProductCategory, Cart, CartItem, Order, OrderItem, Delivery
from .serializers import ProductSerializer, ProductCategorySerializer, CartSerializer, CartItemSerializer, OrderSerializer
from django.db.models import Q
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
import requests
from decimal import Decimal

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

class SearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        query = request.query_params.get("q", "")
        if not query:
            return Response({"error": "Query parameter 'q' is required"}, status=status.HTTP_400_BAD_REQUEST)

        products = Product.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(product_description__icontains=query) |
            Q(product_category__name__icontains=query)
        ).distinct()

        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request, pk=None):
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
            return Response({'error': 'Cart item not found'}, status=status.HTTP_400_BAD_REQUEST)

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
        total_amount = sum(
            item.product.price * (Decimal(item.quantity) / Decimal(max(item.product.increment_step or 1, 1)))
            for item in cart.items.all()
        )
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
        return Response({'id': order.id, **serializer.data}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def initialize_payment(self, request, pk=None):
        order = self.get_object()
        if order.status != 'pending':
            return Response({'error': 'Order already processed'}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json',
        }
        data = {
            'email': request.user.email,
            'amount': int(order.total_amount * 100),
            'currency': 'NGN',
            'callback_url': f'{settings.FRONTEND_URL}/order/summary?orderId={order.id}',
        }
        response = requests.post('https://api.paystack.co/transaction/initialize', headers=headers, json=data)
        if response.status_code == 200:
            return Response(response.json())
        return Response({'error': 'Failed to initialize payment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def verify_payment(self, request, pk=None):
        order = self.get_object()
        reference = request.data.get('reference')
        if not reference:
            return Response({'error': 'Reference required'}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}',
        }
        response = requests.get(f'https://api.paystack.co/transaction/verify/{reference}', headers=headers)
        if response.status_code == 200:
            data = response.json()
            if data['status'] and data['data']['status'] == 'success':
                order.status = 'processing'
                order.transaction_id = reference
                order.save()

                # Prepare email context with absolute design file URLs
                order_items = order.items.all()
                email_context = {
                    'user': self.request.user,
                    'order': order,
                    'order_items': [
                        {
                            'product_name': item.product.name,
                            'quantity': item.quantity,
                            'price': item.price,
                            'design_file_url': f"{settings.SITE_URL}{item.design_file.url}" if item.design_file else None,
                        }
                        for item in order_items
                    ],
                    'frontend_url': settings.FRONTEND_URL,
                    'site_url': settings.SITE_URL,
                    'default_from_email': settings.DEFAULT_FROM_EMAIL,
                }

                # User email
                user_html_message = render_to_string('emails/order_confirmation_user.html', email_context)
                user_plain_message = render_to_string('emails/order_confirmation_user.txt', email_context)
                send_mail(
                    subject='Order Confirmation - PrintShop Naija',
                    message=user_plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[self.request.user.email],
                    html_message=user_html_message,
                    fail_silently=True,
                )

                # Staff email
                staff_html_message = render_to_string('emails/order_notification_staff.html', email_context)
                staff_plain_message = render_to_string('emails/order_notification_staff.txt', email_context)
                send_mail(
                    subject=f'New Order #{order.id} - PrintShop Naija',
                    message=staff_plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=settings.STAFF_EMAILS,
                    html_message=staff_html_message,
                    fail_silently=True,
                )

                return Response({'status': 'Payment verified', 'order_id': order.id})
        return Response({'error': 'Payment verification failed'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAdminUser])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status not in ['pending', 'processing', 'completed', 'cancelled']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = new_status
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        order = self.get_object()
        if order.status != 'pending':
            return Response({'error': 'Only pending orders can be cancelled'}, status=status.HTTP_400_BAD_REQUEST)
        order.status = 'cancelled'
        order.save()
        serializer = self.get_serializer(order)
        return Response({'message': 'Order cancelled successfully', 'order': serializer.data}, status=status.HTTP_200_OK)
