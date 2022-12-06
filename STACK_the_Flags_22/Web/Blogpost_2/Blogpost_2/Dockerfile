FROM node:18.8-buster-slim

# Install Chrome
RUN apt update \
    && apt install -y wget gnupg sqlite3 curl \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt update \
    && apt install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxshmfence-dev \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install supervisord
RUN apt update \
    && apt install -y apt-transport-https supervisor \
    && rm -rf /var/lib/apt/lists/*

# Setup supervisord
COPY ./config/supervisord.conf /etc/supervisor/supervisord.conf

# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY --chown=www-data:www-data src .

RUN node --version

# Install dependencies
WORKDIR /app/app
RUN rm -rf node_modules
RUN npm install

# Expose the port application is reachable on
EXPOSE 1337

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]