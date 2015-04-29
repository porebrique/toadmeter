# encoding: utf-8
import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators

from time import sleep
#from toadmeter.libs.csv_reader import UnicodeCsvReader
from django.db import models

from django.contrib.auth.models import User
from toadmeter.transactions.models import Transaction, Tag

from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest
from toadmeter.transactions.parsers import CSVParser

class StatSerializer(serializers.ModelSerializer):
    sum = serializers.SerializerMethodField()
    class Meta:
        model = Tag
        fields = ('id', 'text', 'sum', 'type')
        
#    NB! this is TOTAL sum, not limited by any period
    def get_sum(self, object):
        sum = object.transactions.aggregate(sum=models.Sum('size'))
        return sum['sum'] or 0
    
class StatViewSet(viewsets.GenericViewSet):    
    serializer_class = StatSerializer
    queryset = Tag.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',)    
    
    def list(self, request):
        type = request.query_params.get('type', None)
        queryset = Tag.objects.filter(owner=self.request.user)
        if type:
            queryset = queryset.filter(type=type)
        result = StatSerializer(queryset, many=True).data    
#        print result
#        for tag in result:
#            print 'Tag:', tag
#            result.remove(tag)
        result = [tag for tag in result if tag['sum'] > 0]
        result = sorted(result, key=lambda k: k['sum'], reverse=True) 
#        print 'after', result
        return response.Response(result, status=status.HTTP_200_OK)

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
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        self.queryset = self.queryset.filter(owner=self.request.user)
        return self.queryset    
    
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'size', 'date', 'type', 'tag')

    def create(self, validated_data):
        print 'create transaction'
        user = self.context['request'].user
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
    
    @decorators.list_route(methods=['post'])
    def upload(self, request):
        
        csv_data = request.DATA.get('csv', None).encode('utf-8')
        format = request.DATA.get('format', None)
        
        if csv_data:
            results = CSVParser.parse(format, csv_data)
            if results['status'] < 1:
                return response.Response(results['message'])
            else:
                return response.Response(results['message'], status=status.HTTP_400_BAD_REQUEST) 
        else:
            return response.Response('No csv provided', status=status.HTTP_400_BAD_REQUEST)
         