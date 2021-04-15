<h1 align="center">marcao-wer</h1>
<p>
  <a href="https://www.npmjs.com/package/marcao-wer" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/marcao-wer.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href='https://coveralls.io/github/MarcoABCardoso/marcao-wer?branch=master'>
    <img src='https://coveralls.io/repos/github/MarcoABCardoso/marcao-wer/badge.svg?branch=master' alt='Coverage Status' />
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
    "total_words": 32,
    "word_error_rate": 0.21235119047619047,
    "sentence_error_rate": 0.8,
    "transcriptions": [
        {
            "audio": "test_audio/audio_1.mp3",
            "text": "Como trocar senha do banco",
            "prediction": "Como trocar senha do banco",
            "word_error_rate": 0,
            "changes": []
        },
        {
            "audio": "test_audio/audio_2.mp3",
            "text": "Como trocar a senha do banco",
            "prediction": "Como trocar senha do banco",
            "word_error_rate": 0.16666666666666666,
            "changes": [
                {
                    "type": "deletion",
                    "phrase": "a"
                }
            ]
        },
        {
            "audio": "test_audio/audio_3.mp3",
            "text": "Como trocar senha banco",
            "prediction": "Como trocar senha do banco",
            "word_error_rate": 0.2,
            "changes": [
                {
                    "type": "addition",
                    "phrase": "do"
                }
            ]
        },
        {
            "audio": "test_audio/audio_4.mp3",
            "text": "Como troco senha do banco",
            "prediction": "Como trocar senha do banco",
            "word_error_rate": 0.2,
            "changes": [
                {
                    "type": "substitution",
                    "phrase": "troco",
                    "with": "trocar"
                }
            ]
        },
        {
            "audio": "test_audio/audio_5.mp3",
            "text": "Como troco a senha do meu banco",
            "prediction": "Como trocar senha do banco",
            "word_error_rate": 0.42857142857142855,
            "changes": [
                {
                    "type": "substitution",
                    "phrase": "troco",
                    "with": "trocar"
                },
                {
                    "type": "deletion",
                    "phrase": "a"
                },
                {
                    "type": "deletion",
                    "phrase": "meu"
                }
            ]
        }
    ],
    "reports": {
        "additionDistribution": [
            {
                "phrase": "do",
                "count": 1
            }
        ],
        "deletionDistribution": [
            {
                "phrase": "a",
                "count": 2
            },
            {
                "phrase": "meu",
                "count": 1
            }
        ],
        "substitutionDistribution": [
            {
                "phrase": "troco",
                "count": 2
            }
        ],
        "pairwise_phrase_substitutions": [
            {
                "phrase": "troco",
                "with": "trocar",
                "count": 2
            }
        ]
    }
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