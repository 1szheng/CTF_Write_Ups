#!/bin/bash
docker rm -f web_pyrunner
docker build --tag=web_pyrunner .
docker run -p 8888:8888 --rm --name=web_pyrunner web_pyrunner