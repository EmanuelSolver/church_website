from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Event, ExternalForm
from .serializers import  EventSerializer, ExternalFormSerializer
from rest_framework.generics import UpdateAPIView

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
    

class CreateExternalForm(APIView):
    def post(self, request, format=None):
        serializer = ExternalFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExternalFormList(APIView):
    def get(self, request, format=None):
        links = ExternalForm.objects.all()
        serializer = ExternalFormSerializer(links, many=True)
        return Response(serializer.data)


class DeleteExternalFormView(generics.DestroyAPIView):
    queryset = ExternalForm.objects.all()
    serializer_class = ExternalFormSerializer

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)