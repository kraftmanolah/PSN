from django.urls import path
from .views import RegisterView, LoginView, UserDetail  # Already correct

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserDetail.as_view(), name='user'),  # Now works with fixed views.py
]