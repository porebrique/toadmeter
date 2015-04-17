from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

#from django.contrib import admin
#admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'longbox.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

#    url(r'^admin/', include(admin.site.urls)),
    (r'^dev/$', TemplateView.as_view(template_name="ngapp/app/index.html")),
    (r'^$', TemplateView.as_view(template_name="ngapp/dist/index.html")),
                       
    (r'^api/', include('toadmeter.api.urls')),                       
)
