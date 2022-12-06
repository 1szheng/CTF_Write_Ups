#!/bin/bash
cd /tmp  # dump all the temp files Pyinstaller may generate in the temp dir
cp /root/build.py build.py
python3 build.py >/dev/null 2>&1  # build flag printing binary
rm -r *
