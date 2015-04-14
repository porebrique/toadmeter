import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status

from time import sleep

from django.db import models

from django.contrib.auth.models import User
from toadmeter.transactions.models import Transaction, Tag


class StatSerializer(serializers.ModelSerializer):
    sum = serializers.SerializerMethodField()
    class Meta:
        model = Tag
        fields = ('id', 'text', 'sum')
        
    def get_sum(self, object):
        sum = object.transactions.aggregate(sum=models.Sum('size'))
        print sum
        return sum['sum'] or 0
    
class StatViewSet(viewsets.GenericViewSet):    
    serializer_class = StatSerializer
    queryset = Tag.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    
    
    
    def list(self, request):
        print self.queryset
        queryset = Tag.objects.filter(owner=self.request.user)
        result = StatSerializer(queryset, many=True).data    
        return response.Response(result, status=status.HTTP_200_OK)

class TagSerializer(serializers.ModelSerializer):
    
#    name = serializers.SerializerMethodField()
    class Meta:
        model = Tag
        fields = ('id', 'text', 'type', 'owner')
        
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',)
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        self.queryset = self.queryset.filter(owner=self.request.user)
        return self.queryset    
    
class TransactionSerializer(serializers.ModelSerializer):
#    name = serializers.SerializerMethodField()
    class Meta:
        model = Transaction
        fields = ('id', 'size', 'date', 'type', 'tag')

    def create(self, validated_data):
        print dir(self)
        user = self.context['request'].user
        print 'validate_data', validated_data
        validated_data['owner'] = user
        return Transaction.objects.create(**validated_data)        
        
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',) 
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)
#        if self.request.user.is_authenticated():
#            return self.queryset.filter(owner=self.request.user)
#        else:
#            raise exceptions.NotAuthenticated(detail=None)