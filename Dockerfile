# build environment
ARG APP_DIR=/app

# base image
FROM node:16.13.1

# update
RUN apt-get update -y

# set working directory
# RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# install app dependencies
COPY package.json ${APP_DIR}/
RUN npm i npm@8.3.2 -g
RUN npm install

# add app
COPY --chown=1001:0 . ${APP_DIR}

# run tests
RUN npm run test

# run app
EXPOSE 3000
CMD npm run start
