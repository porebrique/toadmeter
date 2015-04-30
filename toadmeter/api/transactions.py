# encoding: utf-8
#import django_filters
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators
from toadmeter.transactions.models import Transaction
from toadmeter.transactions.parsers import CSVParser
#from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

    
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
         