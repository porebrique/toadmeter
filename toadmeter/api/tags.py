# encoding: utf-8
#import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators
from time import sleep
from toadmeter.transactions.models import Tag
from toadmeter.api.permissions import DemoUserPermission
#from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'text', 'type')
        
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['owner'] = user
        return Tag.objects.create(**validated_data)            
        
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',)
    permission_classes = (permissions.IsAuthenticated, DemoUserPermission)
    
    def get_queryset(self):
        self.queryset = self.queryset.filter(owner=self.request.user)
        return self.queryset    