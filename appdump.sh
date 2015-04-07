#!/bin/bash

python manage.py dumpdata "$1" --indent 4 > fixtures/"$1".json