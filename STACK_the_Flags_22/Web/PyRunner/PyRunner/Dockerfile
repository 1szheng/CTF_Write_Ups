FROM python:3.10.8-alpine3.16

RUN adduser -D -u 1000 -g 1000 -s /bin/sh www

RUN apk add --update --no-cache gcc musl-dev

WORKDIR /app
COPY app /app

COPY flag /root/flag

COPY config/readflag.c /
RUN gcc -o /readflag /readflag.c && chmod 4755 /readflag && rm /readflag.c

RUN pip install -r requirements.txt

CMD ["python3", "app.py"]



