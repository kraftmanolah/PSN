from rest_framework import serializers
from .models import User
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'phone_number', 'user_type', 'organization_name', 'company_address', 'account_administrator_name', 'account_administrator_role']
        extra_kwargs = {
            'password': {'write_only': True},
            'phone_number': {'required': True},
        }

    def create(self, validated_data):
        if validated_data.get('full_name') or not any([validated_data.get('organization_name'), validated_data.get('company_address'), validated_data.get('account_administrator_name'), validated_data.get('account_administrator_role')]):
            user_type = 'individual'
        else:
            user_type = 'organization'

        if user_type == 'individual' and not validated_data.get('full_name'):
            raise ValidationError({'full_name': 'Full name is required for individuals.'})
        if user_type == 'organization' and not all([validated_data.get('organization_name'), validated_data.get('company_address'), validated_data.get('account_administrator_name'), validated_data.get('account_administrator_role')]):
            raise ValidationError({'organization': 'All company fields are required for organizations.'})

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=user_type,
            full_name=validated_data.get('full_name', ''),
            phone_number=validated_data['phone_number'],
            organization_name=validated_data.get('organization_name', ''),
            company_address=validated_data.get('company_address', ''),
            account_administrator_role=validated_data.get('account_administrator_role', ''),
            account_administrator_name=validated_data.get('account_administrator_name', '')
        )
        return user

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