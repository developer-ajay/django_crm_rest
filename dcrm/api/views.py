from django.contrib.auth.models import User
from .models import Record
from .serializers import RecordSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny , IsAuthenticated
# Create your views here.

class userCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RecordListView(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            return serializer.ValidationError(serializer.errors)