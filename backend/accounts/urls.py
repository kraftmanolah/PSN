

# from django.urls import path
# from .views import RegisterView, LoginView, UserDetail, PasswordResetRequestView, PasswordResetConfirmView, DeliveryDetailsView, VerifyEmailView

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('user/', UserDetail.as_view(), name='user'),
#     path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
#     path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
#     path('delivery-details/', DeliveryDetailsView.as_view(), name='delivery-details'),
#     path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
# ]

from django.urls import path
from .views import (
    RegisterView, LoginView, UserDetail, PasswordResetRequestView,
    PasswordResetConfirmView, DeliveryDetailsView, VerifyEmailView,
    ChangePasswordView  # New import
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetail.as_view(), name='user'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('delivery-details/', DeliveryDetailsView.as_view(), name='delivery-details'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),  # New endpoint
]