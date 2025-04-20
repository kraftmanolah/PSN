# from rest_framework import generics, status, permissions, views
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.conf import settings
# from .serializers import UserSerializer, LoginSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer, DeliveryDetailsSerializer
# from .models import User, DeliveryDetails

# class RegisterView(generics.CreateAPIView):
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         try:
#             serializer.is_valid(raise_exception=True)
#         except Exception as e:
#             print(f"Validation error: {serializer.errors}")
#             return Response(
#                 {"error": serializer.errors},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#         user = serializer.save()
#         token, _ = Token.objects.get_or_create(user=user)

#         # Send verification email
#         verification_link = f"{settings.FRONTEND_URL}/verify-email?token={user.verification_token}"
#         subject = "Verify Your Email Address"
#         message = f"""
#         Hello {user.full_name or user.organization_name or user.email},

#         Thank you for signing up with PrintShopNaija! Please verify your email address by clicking the link below:

#         {verification_link}

#         This link will expire in 24 hours. If you did not sign up for this account, please ignore this email.

#         Best regards,
#         The PrintShopNaija Team
#         """
#         try:
#             send_mail(
#                 subject=subject,
#                 message=message,
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[user.email],
#                 fail_silently=False,
#             )
#         except Exception as e:
#             print(f"Failed to send verification email: {e}")
#             pass

#         return Response({'token': token.key}, status=status.HTTP_201_CREATED)

# class VerifyEmailView(generics.GenericAPIView):
#     def get(self, request, *args, **kwargs):
#         token = request.GET.get('token')
#         try:
#             user = User.objects.get(verification_token=token)
#             if user.is_verification_token_expired():
#                 return Response({"error": "Verification link has expired."}, status=status.HTTP_400_BAD_REQUEST)

#             user.is_verified = True
#             user.verification_token = ''  # Set to empty string instead of None
#             user.verification_token_expires_at = None
#             user.save()

#             redirect_url = f"{settings.FRONTEND_URL}/signup-success"
#             return Response({"detail": "Email verified successfully.", "redirect_url": redirect_url})
#         except User.DoesNotExist:
#             return Response({"error": "Invalid verification token."}, status=status.HTTP_400_BAD_REQUEST)

# class LoginView(generics.GenericAPIView):
#     serializer_class = LoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key})

# class UserDetail(views.APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         if not request.user.is_authenticated:
#             return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
#         serializer = UserSerializer(request.user, context={'request': request})
#         return Response(serializer.data)

# class PasswordResetRequestView(generics.GenericAPIView):
#     serializer_class = PasswordResetRequestSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         email = serializer.validated_data['email']

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             return Response({'detail': 'If an account with this email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

#         token_generator = PasswordResetTokenGenerator()
#         token = token_generator.make_token(user)
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         reset_link = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"

#         try:
#             send_mail(
#                 subject='Password Reset Request',
#                 message=f'Click the link to reset your password: {reset_link}',
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[email],
#                 fail_silently=False,
#             )
#         except Exception as e:
#             print(f"Failed to send email: {e}")
#             return Response({'detail': 'If an account with this email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

#         return Response({'detail': 'A password reset link has been sent to your email.'}, status=status.HTTP_200_OK)

# class PasswordResetConfirmView(generics.GenericAPIView):
#     serializer_class = PasswordResetConfirmSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         uidb64 = serializer.validated_data['uid']
#         token = serializer.validated_data['token']
#         new_password = serializer.validated_data['new_password']

#         try:
#             uid = force_str(urlsafe_base64_decode(uidb64))
#             user = User.objects.get(pk=uid)
#         except (TypeError, ValueError, OverflowError, User.DoesNotExist):
#             return Response({'detail': 'Invalid token or user.'}, status=status.HTTP_400_BAD_REQUEST)

#         token_generator = PasswordResetTokenGenerator()
#         if not token_generator.check_token(user, token):
#             return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

#         user.set_password(new_password)
#         user.save()
#         Token.objects.filter(user=user).delete()

#         return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

# class DeliveryDetailsView(views.APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request):
#         try:
#             details = DeliveryDetails.objects.get(user=request.user)
#             serializer = DeliveryDetailsSerializer(details)
#             return Response(serializer.data)
#         except DeliveryDetails.DoesNotExist:
#             return Response({'address': '', 'city': '', 'state': '', 'postcode': ''})

#     def patch(self, request):
#         try:
#             details = DeliveryDetails.objects.get(user=request.user)
#         except DeliveryDetails.DoesNotExist:
#             details = None

#         if not details:
#             serializer = DeliveryDetailsSerializer(data=request.data, partial=True)
#             if serializer.is_valid():
#                 serializer.save(user=request.user)
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         serializer = DeliveryDetailsSerializer(details, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request):
#         try:
#             details = DeliveryDetails.objects.get(user=request.user)
#             details.delete()
#             return Response({'detail': 'Delivery details deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
#         except DeliveryDetails.DoesNotExist:
#             return Response({'detail': 'No delivery details found.'}, status=status.HTTP_404_NOT_FOUND)

from rest_framework import generics, status, permissions, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from .serializers import (
    UserSerializer, LoginSerializer, PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer, DeliveryDetailsSerializer,
    PasswordChangeSerializer  # New import
)
from .models import User, DeliveryDetails

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            print(f"Validation error: {serializer.errors}")
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)

        # Send verification email
        verification_link = f"{settings.FRONTEND_URL}/verify-email?token={user.verification_token}"
        subject = "Verify Your Email Address"
        message = f"""
        Hello {user.full_name or user.organization_name or user.email},

        Thank you for signing up with PrintShopNaija! Please verify your email address by clicking the link below:

        {verification_link}

        This link will expire in 24 hours. If you did not sign up for this account, please ignore this email.

        Best regards,
        The PrintShopNaija Team
        """
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send verification email: {e}")
            pass

        return Response({'token': token.key}, status=status.HTTP_201_CREATED)

class VerifyEmailView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')
        try:
            user = User.objects.get(verification_token=token)
            if user.is_verification_token_expired():
                return Response({"error": "Verification link has expired."}, status=status.HTTP_400_BAD_REQUEST)

            user.is_verified = True
            user.verification_token = ''
            user.verification_token_expires_at = None
            user.save()

            redirect_url = f"{settings.FRONTEND_URL}/signup-success"
            return Response({"detail": "Email verified successfully.", "redirect_url": redirect_url})
        except User.DoesNotExist:
            return Response({"error": "Invalid verification token."}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class UserDetail(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

    def patch(self, request):  # New PATCH method
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'If an account with this email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"

        try:
            send_mail(
                subject='Password Reset Request',
                message=f'Click the link to reset your password: {reset_link}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")
            return Response({'detail': 'If an account with this email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

        return Response({'detail': 'A password reset link has been sent to your email.'}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uidb64 = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'detail': 'Invalid token or user.'}, status=status.HTTP_400_BAD_REQUEST)

        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, token):
            return Response({'detail': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        Token.objects.filter(user=user).delete()

        return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

class DeliveryDetailsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            details = DeliveryDetails.objects.get(user=request.user)
            serializer = DeliveryDetailsSerializer(details)
            return Response(serializer.data)
        except DeliveryDetails.DoesNotExist:
            return Response({'address': '', 'city': '', 'state': '', 'postcode': ''})

    def patch(self, request):
        try:
            details = DeliveryDetails.objects.get(user=request.user)
        except DeliveryDetails.DoesNotExist:
            details = None

        if not details:
            serializer = DeliveryDetailsSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = DeliveryDetailsSerializer(details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            details = DeliveryDetails.objects.get(user=request.user)
            details.delete()
            return Response({'detail': 'Delivery details deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except DeliveryDetails.DoesNotExist:
            return Response({'detail': 'No delivery details found.'}, status=status.HTTP_404_NOT_FOUND)

class ChangePasswordView(generics.GenericAPIView):  # New view
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        current_password = serializer.validated_data.get('current_password')
        new_password = serializer.validated_data['new_password']

        # Verify current password
        if not user.check_password(current_password):
            return Response(
                {'current_password': 'Incorrect current password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set new password
        user.set_password(new_password)
        user.save()

        # Invalidate existing tokens and issue a new one
        Token.objects.filter(user=user).delete()
        new_token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {'detail': 'Password changed successfully.', 'token': new_token.key},
            status=status.HTTP_200_OK
        )