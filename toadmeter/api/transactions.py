# encoding: utf-8
#import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators, parsers
from toadmeter.transactions.models import Transaction
from toadmeter.transactions.parsers import CSVParser
from toadmeter.api.permissions import DemoUserPermission
#from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

from toadmeter.api import utils as api_utils
    
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('id', 'size', 'date', 'type', 'tag')

    def create(self, validated_data):
#        print 'create transaction'
        user = self.context['request'].user
        validated_data['owner'] = user
        return Transaction.objects.create(**validated_data)        
        
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('type',) 
    permission_classes = (permissions.IsAuthenticated, DemoUserPermission)
    parser_classes = (parsers.JSONParser, parsers.MultiPartParser)
    
    def get_queryset(self):
        period = self.request.GET.get('period', 'default')
        return api_utils.get_period_limited_queryset(self.queryset, period, self.request.user)
    
    @decorators.list_route(methods=['post'])
    def upload(self, request, filename=None, format=None, pk=None):
        file = request.FILES['file']
        format = request.DATA.get('format', None)
        user = request.user
#        print file, format
        if file:
            results = CSVParser.parse(format, file, user)
            if results['status'] < 1:
                return response.Response(results['message'])
            else:
                return response.Response(results['message'], status=status.HTTP_400_BAD_REQUEST) 
        else:
            return response.Response('No csv provided', status=status.HTTP_400_BAD_REQUEST)
        return response.Response('ok')
    