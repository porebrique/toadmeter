from django.conf.urls import url, include
from rest_framework import routers


#from karhu.ngadmin.api.blog import PostViewSet

from toadmeter.api.users import UserViewSet

from toadmeter.api.auth import login_view, logout_view
from toadmeter.api.transactions import TransactionViewSet, TagViewSet, StatViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tags', TagViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'stats', StatViewSet)
#router.register(r'config', ConfigView, base_name="config")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = [
    
#    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    
#    url(r'^config/$', ConfigView.as_view(), name='config'),
#    url(r'^config$', ConfigView.as_view(), name='config'),
    url(r'^login', login_view, name="login"),
    url(r'^logout', logout_view, name="logout"),
    
    url(r'^', include(router.urls)),
    
]