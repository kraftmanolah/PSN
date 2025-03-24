# from django.urls import path
# from .views import RegisterView, LoginView, UserDetail  # Already correct

# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('user/', UserDetail.as_view(), name='user'),  # Now works with fixed views.py
# ]

# accounts/urls.py
from django.urls import path
from .views import RegisterView, LoginView, UserDetail, PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetail.as_view(), name='user'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),  # New endpoint
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),  # New endpoint
]