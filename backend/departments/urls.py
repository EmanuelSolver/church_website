from django.urls import path
from . import views

urlpatterns = [
    path('create-department/', views.CreateDepartment.as_view(), name='create-department'),
    path('departments/', views.DepartmentList.as_view(), name='department-list'),
    path('join-department/<int:user_id>/<int:dept_id>/', views.JoinDepartment.as_view(), name='join-department'),
    path('delete-department/<int:pk>', views.DeleteDepartmentView.as_view(), name='delete-department'),
]