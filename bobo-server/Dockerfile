FROM node:10.15.3 AS builder
WORKDIR /u/app/
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build
RUN mv node_modules/ node_modules_/
RUN mv dist/ dist_/

FROM node:10.15.3
WORKDIR /u/app/
COPY --from=builder /u/app/node_modules_/ /u/app/node_modules/
COPY --from=builder /u/app/dist_/ /u/app/dist/
