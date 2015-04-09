from django.http import HttpResponse
import json




# From django-annoying
# http://bitbucket.org/offline/django-annoying/wiki/Home
def json_view(func):
    def wrap(request, *a, **kw):
        response = func(request, *a, **kw)
#        jsonresponse = json.dumps(response, default=date_handler, ensure_ascii=False) # nb about parsefloat?
        jsonresponse = json.dumps(response, ensure_ascii=False) # nb about parsefloat?
        return HttpResponse(jsonresponse, mimetype='application/json')
    return wrap

