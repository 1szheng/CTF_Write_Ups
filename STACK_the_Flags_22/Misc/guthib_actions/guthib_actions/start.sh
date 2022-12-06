#!/bin/sh


mkdir /var/run/sshd && /usr/sbin/sshd -D -o ListenAddress=0.0.0.0 -p 1337 &
cron -f

