#!/bin/bash
docker rm -f web_blogpost2
docker build -t web_blogpost2 .
docker run --name=web_blogpost2 --rm -p8001:1337 -it web_blogpost2
