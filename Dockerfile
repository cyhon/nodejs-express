FROM docker.finogeeks.club/base/node-base:8.5

WORKDIR /app

RUN echo 'registry=https://npm.finogeeks.club/' > ~/.npmrc \
    && echo '//npm.finogeeks.club/:_authToken="O8ejqyCQrvRy1IPquH+ggN6ftsqFCY1YP6A3j/lun0Q="' >> ~/.npmrc

COPY package.json /app/
RUN npm i --only=production node-client && cnpm i --only=production

COPY . /app

EXPOSE 3000

CMD ["node", "--harmony_object_rest_spread", "bootstrap.js"]
