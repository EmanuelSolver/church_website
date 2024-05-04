from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingpage.urls')),
    path('account/', include('accounts.urls')),
    path('appointment/', include('appointments.urls')),
    path('department/', include('departments.urls')),
    path('event/', include('events.urls')),
    path('media/', include('media.urls')),

    path('api-auth', include('rest_framework.urls')), 

]
