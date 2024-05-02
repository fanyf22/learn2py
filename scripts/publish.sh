#!/bin/bash

rsync -zar -e "ssh -p 22 " \
 --exclude=.svn \
 --exclude=.cvs \
 --exclude=.idea \
 --exclude=.DS_Store \
 --exclude=.git \
 --exclude=.hg \
 --exclude=*.hprof \
 --exclude=*.pyc \
 --exclude=node_modules/ \
 learn2py/ server@1.15.36.71:/home/server/learn2py/ --delete

