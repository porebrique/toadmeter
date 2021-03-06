import csv
from toadmeter.libs.csv_reader import UnicodeCsvReader

from toadmeter.transactions.models import Transaction, Tag
#ERROR_CODES:
#0: success
#1: unsupported format


class CSVParser():
    pass
    
    @classmethod
    def parse(self, format, file, user):
        
        formatProcessors = {
            'toshl': {
                    'trim_first_line': True,
                    'row_parser': self.toshl  
            }
        }        
        processor = formatProcessors.get(format, None)
        
        if not processor:
            return {
                'status': 1,
                'message': 'unsupported format %s' % format
            }        
        
        csv_data = file
#        print file, file.content_type
#        csv_data = csv_data.split('\n')[1:]
#        csv_data = csv_data.split('\n')
        
        data = [row for row in csv.reader(file.read().splitlines())]
        if processor['trim_first_line']:
            data = data[1:]
            
        counters = {
            'added': 0,
            'ignored': 0
        }
    
#        for row in UnicodeCsvReader(csv_data):
        for row in data:
            row = processor['row_parser'](row, user)
            if row > 0:
                counters['added'] += 1;
            else:
                counters['ignored'] += 1;
        return {
                'status': 0,
                'message': '%i entries added, %i ignored as already existing' % (counters['added'], counters['ignored'])
            }            

    
    @classmethod
    def toshl(self, row, user):
        date = row[0]
        tagname = row[1]
        if row[2]:
            size = float(row[2].replace(',', '.'))
            type = 'out'
        elif row[3]:
            size = float(row[3].replace(',', '.'))
            type = 'in'
        tags = Tag.objects.filter(text__iexact=tagname)
        if tags:
            tag = tags[0]
        else:
            tag = Tag.objects.create(text=tagname, owner=user, type=type)
#        print 'type is', type, ', tag is ', tag.text 
        matched_transactions = Transaction.objects.filter(size=size, type=type, tag=tag, date=date)
        if not matched_transactions:
            Transaction.objects.create(date=date, type=type, tag=tag, size=size, owner=user)
            return 1
        else:
            return 0
