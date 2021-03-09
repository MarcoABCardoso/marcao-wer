<h1 align="center">marcao-wer</h1>
<p>
  <a href="https://www.npmjs.com/package/marcao-wer" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/marcao-wer.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://codecov.io/gh/MarcoABCardoso/marcao-wer">
    <img src="https://codecov.io/gh/MarcoABCardoso/marcao-wer/branch/master/graph/badge.svg?token=Y37C79MARF"/>
  </a>
  <a href="#" target="_blank">
    <img alt="Node.js CI" src="https://github.com/MarcoABCardoso/marcao-wer/workflows/Node.js%20CI/badge.svg" />
  </a>
</p>

> Generic word-error-rate evaluation package

## Install

```sh
npm install marcao-wer
```

## Usage

```js
const Experiment = require('marcao-wer')

const experiment = new Experiment({
    audioFile: './audios.zip'                     // Path to a zip file containing audios to be recognized
    groundTruthFile: './transcriptions.txt'       // Path to a txt file containing one transcription per line, in the same order as the audios
    recognize: (audioFilePath) => Promise<string> // Function that sends input to a service, resolves transcription
})
let results = await experiment.run()
```

## Run tests

```sh
npm run test
```

## Author

👤 **Marco Cardoso**

* Github: [@MarcoABCardoso](https://github.com/MarcoABCardoso)
* LinkedIn: [@marco-cardoso](https://linkedin.com/in/marco-cardoso)

## Show your support

Give a ⭐️ if this project helped you!