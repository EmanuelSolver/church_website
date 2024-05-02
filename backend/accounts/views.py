from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .models import CustomUser, Pastor
from .serializers import  *
from knox import views as knox_views
from django.contrib.auth import authenticate, login as auth_login
from django.db import transaction
from django.http import JsonResponse
from rest_framework.response import Response


class CreateUserAPI(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)



class LoginAPIView(knox_views.LoginView):
    permission_classes = (AllowAny, )
    serializer_class = LoginSerializer
    
    @transaction.atomic
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user:
                auth_login(request, user)
                response = super().post(request, format=None)
                return Response(response.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
    

class CreatePastorAPI(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = CreatePastorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def fetch_pastors(request):
    # Fetch pastor users who are leaders
    pastors = Pastor.objects.all()
    # Serialize the data to JSON
    pastors_data = [
        {
            'id': pastor.id,
            'user_id': pastor.pastor.id,
            'username': pastor.pastor.username,
            'first_name': pastor.pastor.first_name,
            'mobile': pastor.pastor.mobile,
            'last_name': pastor.pastor.last_name,
            'image_url': pastor.image,
            'fellowship': pastor.fellowship,
            'ordination_status': pastor.ordination_status,
            'isSenior': pastor.is_senior
        }
        for pastor in pastors
    ]
    # Return the data as JSON response
    return JsonResponse(pastors_data, safe=False)


def fetch_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


class UpdateUserAPI(UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    

class DeleteUserView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdatePastorAPI(UpdateAPIView):
    queryset = Pastor.objects.all()
    serializer_class = PastorSerializer
    
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

  
class DeletePastorView(generics.DestroyAPIView):
    queryset = Pastor.objects.all()
    serializer_class = PastorSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)