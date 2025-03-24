# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProductList, ProductCategoryViewSet, ProductViewSet, CartViewSet, OrderViewSet
# from django.conf import settings
# from django.conf.urls.static import static

# router = DefaultRouter()
# router.register(r'product-categories', ProductCategoryViewSet)
# router.register(r'products', ProductViewSet, basename='product')
# router.register(r'cart', CartViewSet, basename='cart')
# router.register(r'orders', OrderViewSet, basename='order')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('products/', ProductList.as_view(), name='product-list'),
#     path('accounts/', include('accounts.urls')),
# ]

# # Serve media files during development
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductList, ProductCategoryViewSet, ProductViewSet, CartViewSet, OrderViewSet, SearchAPIView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'product-categories', ProductCategoryViewSet)
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('products/', ProductList.as_view(), name='product-list'),
    path('search/', SearchAPIView.as_view(), name='search'),  # New search endpoint
    path('accounts/', include('accounts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)