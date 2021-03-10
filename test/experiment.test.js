const Experiment = require('../lib')

let sampleResults = require('./sample-results.json')
let experimentOptions

beforeEach(() => {
    experimentOptions = {
        filePath: './test/_groundTruthFile.csv',
        recognize: jest.fn(() => Promise.resolve('Como trocar senha do banco')),
        batchSize: 2
    }
})

describe('Experiment', () => {
    describe('#constructor', () => {
        it('Creates an instance of Experiment', () => {
            let experiment = new Experiment(experimentOptions)
            expect(experiment).toBeInstanceOf(Experiment)
        })
    })

    describe('#runExperiment', () => {
        it('Executes WER experiment using provided files', (done) => {
            let experiment = new Experiment(experimentOptions)
            experiment.run()
                .then(results => {
                    expect(results).toEqual(sampleResults)
                    expect(experiment.recognize).toHaveBeenCalledTimes(5)
                    expect(experiment.recognize).toHaveBeenCalledWith('_audioFile/audio_1.mp3', 0, ['_audioFile/audio_1.mp3', '_audioFile/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('_audioFile/audio_2.mp3', 1, ['_audioFile/audio_1.mp3', '_audioFile/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('_audioFile/audio_3.mp3', 0, ['_audioFile/audio_3.mp3', '_audioFile/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('_audioFile/audio_4.mp3', 1, ['_audioFile/audio_3.mp3', '_audioFile/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('_audioFile/audio_5.mp3', 0, ['_audioFile/audio_5.mp3'])
                    done()
                })
                .catch(err => done.fail(err))
        })
    })
})