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
    groundTruth: []                             // Array of { audio: "audio_id", transcript: "Text said in this audio" }
    recognize: (audio_id) => Promise<string>    // Function that sends audio to a service, resolves transcript
})
let results = await experiment.run()
```

## Sample results

```json
{
    "total_words": 11,
    "word_error_rate": 0.90909091,
    "sentence_error_rate": 0.5,
    "transcriptions": [
        {
            "audio": "some_dir/audio_1.mp3",
            "text": "How to change my password",
            "prediction": "How to change my password",
            "word_error_rate": 0,
            "changes": []
        },
        {
            "audio": "some_dir/audio_2.mp3",
            "text": "How do I change my password",
            "prediction": "How I change my password",
            "word_error_rate": 0.16666666666666666,
            "changes": [
                {
                    "type": "deletion",
                    "phrase": "do"
                }
            ]
        }
    ]
}
```
Supported change types are currently:
- addition
- deletion
- substitution


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