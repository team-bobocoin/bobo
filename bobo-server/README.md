# Bobo Server

## Requirement

* `jest`가 설치되어 있어야 합니다.

## Install

```bash
npm install
```

## Config

* root폴더에 `.env`파일이 서버를 실행하는데 필요한 정보를 가지고 있습니다.
  `.test.env`를 참고해서 새로 `.env`파일을 생성하면 됩니다.
* `.test.env`는 테스트를 실행하는데 사용되는 환경변수입니다.

## Run

```bash
npm start
```

## Test

```bash
npm run test 
```

## Test Watch

```bash
npm run watch
```

* 특정 테스트만 watch하고 싶다면 다음과 같이 실행합니다.

```bash
npm run watch -- testFileName
```
