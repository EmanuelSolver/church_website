from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser, Pastor
from activities.models import JoinedDepartment
from django.contrib.auth import authenticate


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    departments = serializers.SerializerMethodField()

    def get_departments(self, user):
        # Retrieve joined departments for the user
        joined_departments = JoinedDepartment.objects.filter(user=user)

        # Extract department names from the joined departments
        department_names = [joined_department.department.title for joined_department in joined_departments]

        return department_names
    
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        # Add custom user data to the token response
        data['id'] = user.id
        data['username'] = user.username
        data['email'] = user.email
        data['mobile'] = user.mobile
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['gender'] = user.gender
        data['departments'] = self.get_departments(user)

        
        # Determine the user's role
        if user.is_superuser and user.is_staff:
            data['role'] = 'Admin'
        elif user.is_staff:
            data['role'] = 'Staff'
        else:
            data['role'] = 'Member'  
                    
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'gender', 'age', 'mobile')


class PastorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pastor
        fields = ('id', 'fellowship', 'ordination_status', 'image')


class CreatePastorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pastor
        fields = '__all__'

    def create(self, validated_data):
        # Extract the pastor data from validated_data
        pastor_data = validated_data.pop('pastor')
        
        # Get the existing CustomUser instance
        pastor_user = pastor_data
        
        # Update the is_staff field of the CustomUser instance
        pastor_user.is_staff = True
        pastor_user.save()
        
        # Create the Pastor instance with the updated pastor_user instance
        pastor = Pastor.objects.create(pastor=pastor_user, **validated_data)
        
        return pastor


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'required': True}
        }

    def validate(self, attrs):
        email = attrs.get('email', '').strip().lower()
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError('User with this email id already exists.')
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user





class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)

    def validate(self, attrs):
        email = attrs.get('email').lower()
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError("Please give both email and password.")

        if not CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email does not exist.')

        user = authenticate(request=self.context.get('request'), email=email,
                            password=password)
        if not user:
            raise serializers.ValidationError("Wrong Credentials.")

        attrs['user'] = user
        return attrs