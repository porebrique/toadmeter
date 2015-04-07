#!/bin/bash

rm www/db.sqlite3
python manage.py syncdb
python manage.py loaddata fixtures/*.json
