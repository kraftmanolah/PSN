
# from rest_framework import generics, status, permissions, views
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.conf import settings
# from .serializers import UserSerializer, LoginSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
# from .models import User

# class RegisterView(generics.CreateAPIView):
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=status.HTTP_201_CREATED)

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

#         # Generate a password reset token
#         token_generator = PasswordResetTokenGenerator()
#         token = token_generator.make_token(user)
#         uid = urlsafe_base64_encode(force_bytes(user.pk))

#         # Construct the reset link
#         reset_link = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"

#         # Send the email, but handle failures gracefully
#         try:
#             send_mail(
#                 subject='Password Reset Request',
#                 message=f'Click the link to reset your password: {reset_link}',
#                 from_email=settings.DEFAULT_FROM_EMAIL,
#                 recipient_list=[email],
#                 fail_silently=False,
#             )
#         except Exception as e:
#             # Log the error for debugging, but don't fail the request
#             print(f"Failed to send password reset email: {str(e)}")
#             # Still return a success response to avoid leaking email existence
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

#         # Update the user's password
#         user.set_password(new_password)
#         user.save()

#         return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)

# accounts/views.py
from rest_framework import generics, status, permissions, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail, get_connection
from django.conf import settings
from .serializers import UserSerializer, LoginSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)

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

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        print(f"Received password reset request for email: {email}")

        try:
            user = User.objects.get(email=email)
            print(f"User found: {user.email}")
        except User.DoesNotExist:
            print(f"No user found with email: {email}")
            return Response({'detail': 'If an account with this email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

        # Generate a password reset token
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        print(f"Generated token: {token}, UID: {uid}")

        # Construct the reset link
        reset_link = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
        print(f"Reset link: {reset_link}")

        # Send the email, but handle failures gracefully
        try:
            print("Attempting to send email...")
            connection = get_connection('django.core.mail.backends.console.EmailBackend')
            send_mail(
                subject='Password Reset Request',
                message=f'Click the link to reset your password: {reset_link}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
                connection=connection,
            )
            print("Email sent successfully.")
        except Exception as e:
            # Log the error for debugging, but don't fail the request
            print(f"Failed to send password reset email: {str(e)}")
            # Still return a success response to avoid leaking email existence
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

        # Update the user's password
        user.set_password(new_password)
        user.save()

        # Invalidate all existing tokens for the user (log them out from everywhere)
        Token.objects.filter(user=user).delete()

        return Response({'detail': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)