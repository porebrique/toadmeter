from datetime import datetime
import calendar
def get_period_limited_queryset(queryset, period, user):
#    print type(serializer.queryset),serializer.queryset
#    period = serializer.request.GET.get('period', 'default')
    if period == 'default':
        now = datetime.now()
        period = {
            'year': now.year,
            'month': now.month
        }            
    else:
        period = [int(i) for i in period.split('.')]
        period = {
            'year': period[1],
            'month': period[0]
        }
    lastday = calendar.monthrange(period['year'], period['month'])[1]
    from_date = '%s-%s-01' % (period['year'], period['month'])
    to_date = '%s-%s-%s' % (period['year'], period['month'], lastday)
#        print from_date, to_date
    queryset = queryset.filter(owner=user, date__range=[from_date, to_date])
    return queryset