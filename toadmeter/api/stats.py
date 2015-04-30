# encoding: utf-8
from rest_framework import serializers, viewsets, filters, exceptions, permissions, response, status, decorators
from django.db import models
from toadmeter.transactions.models import Transaction, Tag

#from django.http import HttpResponse, HttpResponseForbidden, HttpResponseBadRequest

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
