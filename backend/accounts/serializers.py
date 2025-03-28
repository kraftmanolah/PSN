# accounts/serializers.py
from rest_framework import serializers
from .models import User, DeliveryDetails
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate
from django.db import IntegrityError

class DeliveryDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryDetails
        fields = ['address', 'city', 'state', 'postcode']

class UserSerializer(serializers.ModelSerializer):
    delivery_details = DeliveryDetailsSerializer(required=False)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'full_name', 'phone_number', 'user_type', 'organization_name', 'company_address', 'account_administrator_name', 'account_administrator_role', 'delivery_details']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True},
            'phone_number': {'required': True},
        }

    def create(self, validated_data):
        delivery_data = validated_data.pop('delivery_details', None)
        if validated_data.get('full_name') or not any([validated_data.get('organization_name'), validated_data.get('company_address'), validated_data.get('account_administrator_name'), validated_data.get('account_administrator_role')]):
            user_type = 'individual'
        else:
            user_type = 'organization'

        if user_type == 'individual' and not validated_data.get('full_name'):
            raise ValidationError({'full_name': 'Full name is required for individuals.'})
        if user_type == 'organization' and not all([validated_data.get('organization_name'), validated_data.get('company_address'), validated_data.get('account_administrator_name'), validated_data.get('account_administrator_role')]):
            raise ValidationError({'organization': 'All company fields are required for organizations.'})

        try:
            user = User.objects.create_user(
                username=validated_data['email'],
                email=validated_data['email'],
                password=validated_data['password'],
                user_type=user_type,
                full_name=validated_data.get('full_name', ''),
                phone_number=validated_data['phone_number'],
                organization_name=validated_data.get('organization_name', ''),
                company_address=validated_data.get('company_address', ''),
                account_administrator_name=validated_data.get('account_administrator_name', ''),
                account_administrator_role=validated_data.get('account_administrator_role', '')
            )
            if delivery_data:
                DeliveryDetails.objects.create(user=user, **delivery_data)
        except IntegrityError as e:
            if 'email' in str(e).lower():
                raise ValidationError({'email': 'This email is already registered.'})
            raise ValidationError({'error': 'An error occurred while creating the user.'})

        return user

    def update(self, instance, validated_data):
        delivery_data = validated_data.pop('delivery_details', None)
        instance = super().update(instance, validated_data)
        if delivery_data:
            delivery_details, _ = DeliveryDetails.objects.get_or_create(user=instance)
            for attr, value in delivery_data.items():
                setattr(delivery_details, attr, value)
            delivery_details.save()
        return instance

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid email or password')
        data['user'] = user
        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)
    confirm_password = serializers.CharField(min_length=8)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return data