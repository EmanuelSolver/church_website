from django.urls import path
from . import views
from knox.views import LogoutView, LogoutAllView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer

urlpatterns = [
    path('signup/', views.CreateUserAPI.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(serializer_class=CustomTokenObtainPairSerializer), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    
    path('add-pastor/', views.CreatePastorAPI.as_view(), name='create_new_pastor'),
    path('fetch-pastors/', views.fetch_pastors, name='fetch_pastors'),
    path('update-pastor/<int:pk>/', views.UpdatePastorAPI.as_view()),
    path('delete-pastor/<int:pk>/', views.DeletePastorView.as_view(), name='delete_pastor'),
    
    path('fetch-users/', views.fetch_users, name='fetch_users'),
    path('update-user/<int:pk>/', views.UpdateUserAPI.as_view()),  # Add <int:pk> here
    path('delete-user/<int:pk>/', views.DeleteUserView.as_view(), name='delete_user'),

    #below urls are currently not in use
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('logout-all/', LogoutAllView.as_view(), name='logout-all'),
]

