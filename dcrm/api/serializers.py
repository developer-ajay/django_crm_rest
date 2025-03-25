from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Record
        
class UserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['id', 'username', 'password',]
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'
        
    def create(self, validated_data):
        record = Record.objects.create(**validated_data)
        return record