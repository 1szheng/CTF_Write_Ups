#!/bin/bash
docker rm -f blogpost
docker build -t blogpost .
docker run --name=blogpost --rm -p8001:1337 -it blogpost
