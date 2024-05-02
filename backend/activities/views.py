from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Department, Event, JoinedDepartment, Sermon, Image
from accounts.models import CustomUser
from .serializers import DepartmentSerializer, EventSerializer, JoinedDepartmentSerializer, SermonSerializer, ImageSerializer
from rest_framework.generics import UpdateAPIView


class CreateDepartment(APIView):
    def post(self, request, format=None):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentList(APIView):
    def get(self, request, format=None):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)


class DeleteDepartmentView(generics.DestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class JoinDepartment(APIView):
    def post(self, request, user_id, dept_id):
        # Get the user and department objects or return 404 if not found
        user = get_object_or_404(CustomUser, id=user_id)
        department = get_object_or_404(Department, id=dept_id)

        # Create a JoinedDepartment instance
        joined_department = JoinedDepartment.objects.create(user=user, department=department)

        # Optionally, you can serialize the instance and return it in the response
        joined_department_serializer = JoinedDepartmentSerializer(joined_department)
        return Response(joined_department_serializer.data, status=status.HTTP_201_CREATED)


class CreateEvent(APIView):
    def post(self, request, format=None):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventList(APIView):
    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class UpdateEventView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



class DeleteEventView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CreateSermon(APIView):
    def post(self, request, format=None):
        serializer = SermonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
class SermonListCreateAPIView(generics.ListCreateAPIView):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer


class DeleteSermonView(generics.DestroyAPIView):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CreateImage(APIView):
    def post(self, request, format=None):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageListCreateAPIView(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class DeleteImageView(generics.DestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
  