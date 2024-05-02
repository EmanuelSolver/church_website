from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingpage.urls')),
    path('account/', include('accounts.urls')),
    path('activity/', include('activities.urls')),
    path('appointment/', include('appointments.urls')),
    path('api-auth', include('rest_framework.urls')), 

]
