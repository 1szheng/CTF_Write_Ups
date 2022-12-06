FROM ubuntu:22.04

RUN apt-get update &&  \
    apt-get install -y python3 python3-pip openssh-server cron && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pip install pyinstaller && \
    pip cache purge

RUN useradd -m -c 'Restricted guest account' guest && \
    echo 'guest:guest' | chpasswd

RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config

RUN (crontab -l ; echo "* * * * * /root/build.sh") | crontab


COPY ./flag.py /root/flag.py
COPY ./build.sh /root/build.sh
COPY ./build.py /root/build.py
COPY ./start.sh /root/start.sh

RUN chown -R guest /home/guest && \
    chmod -R 700 /root && \
    chmod -R 777 /home/guest
EXPOSE 1337
ENTRYPOINT /root/start.sh
