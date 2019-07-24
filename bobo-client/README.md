# Bobo client

This is client-side web application of [cosmos-intercharity-net](https://github.com/team-bobocoin/cosmos-intercharity-net), which is a interblockchain network for charity projects built on Cosmos SDK. 

Every volunteer(helpee), or donator(helper) can join this network with simple signup process, and support or supported by each other. Helpers can donate tokens(DAI) for helpees who want to participate charity activities. The detailed usage of donation is traced and transparently opened for donators to monitor misused tokens.

## Install

```bash
$ npm i
```

## Dev

```bash
$ npm start
```

## Build in production

```bash
$ npm run build -- --prod=true
```

## Upload

```bash
$ BUCKET=www.give-to.me
$ aws s3 rm s3://$BUCKET  --include "*" --recursive
$ aws s3 cp www s3://$BUCKET --recursive --exclude ".DS_Store" --acl public-read
```
