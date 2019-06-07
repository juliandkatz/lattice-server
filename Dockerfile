FROM mhart/alpine-node:8.15.1
WORKDIR /app

# SYSTEM DEPENDENCIES
RUN apk add --no-cache make

# SCRIPTS
COPY Makefile ./

# DEPENDENCIES
COPY package*.json ./
RUN make build-prd

# CODE
COPY server.js ./

EXPOSE 4000

ENTRYPOINT ["make"]
CMD [ "start" ]
