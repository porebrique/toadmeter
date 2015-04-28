# encoding: utf-8
import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators

from time import sleep
from toadmeter.libs.csv_reader import UnicodeCsvReader
from django.db import models

from django.contrib.auth.models import User
from toadmeter.transactions.models import Transaction, Tag

from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

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
        
#-------        
#class UnicodeCsvReader(object):
#    def __init__(self, f, encoding="utf-8", **kwargs):
#        self.csv_reader = csv.reader(f, **kwargs)
#        self.encoding = encoding
#
#    def __iter__(self):
#        return self
#
#    def next(self):
#        # read and split the csv row into fields
#        row = self.csv_reader.next() 
#        # now decode
#        return [unicode(cell, self.encoding) for cell in row]
#
#    @property
#    def line_num(self):
#        return self.csv_reader.line_num
#
#class UnicodeDictReader(csv.DictReader):
#    def __init__(self, f, encoding="utf-8", fieldnames=None, **kwds):
#        csv.DictReader.__init__(self, f, fieldnames=fieldnames, **kwds)
#        self.reader = UnicodeCsvReader(f, encoding=encoding, **kwds)
#-------        
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
            if format == 'toshl':
                csv_data = csv_data.split('\n')
                counters = {
                    'added': 0,
                    'ignored': 0
                }
                print 'csv_data:', len(csv_data), csv_data
                for row in UnicodeCsvReader(csv_data):
                    print 'row', row
                    date = row[0]
                    tagname = row[1]
                    if row[2]:
                        size = float(row[2].replace(',', '.'))
                        type = 'out'
                    elif row[3]:
                        size = float(row[3].replace(',', '.'))
                        type = 'in'
                    else:
                        pass 
                    tags = Tag.objects.filter(text__iexact=tagname)
                    print date, type, size, ':', tags

                    if tags:
                        tag = tags[0]
                    else:
                        tag = Tag.objects.create(text=tagname, owner=request.user, type=type)
                    matched_transactions = Transaction.objects.filter(size=size, type=type, tag=tag, date=date)
                    if not matched_transactions:
                        Transaction.objects.create(date=date, type=type, tag=tag, size=size, owner=request.user)
                        counters['added'] = counters['added'] + 1;
                    else:
                        counters['ignored'] = counters['ignored'] + 1;
#                        print 'There already is transaction with equal date, type, tag and size, ignoring this one.'
            else:
                return response.Response('Unknown import format "%s"' % format, status=status.HTTP_400_BAD_REQUEST)
            return response.Response('%i entries added, %i ignored as already existing' % (counters['added'], counters['ignored']))   
        else:
            return response.Response('No csv provided', status=status.HTTP_400_BAD_REQUEST)
         