FROM node:12-slim

WORKDIR /var/www

RUN apt update
RUN apt-get install -f --yes mc
RUN npm install @angular/cli@10.1.2 -g

COPY test-app/package.json ./

RUN npm install

COPY test-app/angular.json ./
COPY test-app/tsconfig.app.json ./
COPY test-app/tsconfig.spec.json ./
COPY test-app/tsconfig.json ./
COPY test-app/karma.conf.js ./
COPY test-app/tslint.json ./

COPY ./test-app/src ./src
COPY ./test-app/e2e ./e2e

CMD ["npm", "run", "start"]
