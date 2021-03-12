const Experiment = require('../lib')

let sampleResults = require('./sample-results.json')
let sampleResultsPerfect = require('./sample-results-perfect.json')
let experimentOptions

beforeEach(() => {
    experimentOptions = {
        groundTruth: require('./ground-truth.json'),
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
        it('Executes WER experiment using provided ground truth', (done) => {
            let experiment = new Experiment(experimentOptions)
            experiment.run()
                .then(results => {
                    require('fs').writeFileSync('results.json', JSON.stringify(results, null, 4))
                    expect(results).toEqual(sampleResults)
                    expect(experiment.recognize).toHaveBeenCalledTimes(5)
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_1.mp3', 0, ['test_audio/audio_1.mp3', 'test_audio/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_2.mp3', 1, ['test_audio/audio_1.mp3', 'test_audio/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_3.mp3', 0, ['test_audio/audio_3.mp3', 'test_audio/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_4.mp3', 1, ['test_audio/audio_3.mp3', 'test_audio/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_5.mp3', 0, ['test_audio/audio_5.mp3'])
                    done()
                })
                .catch(err => done.fail(err))
        })
        it('Works even when no errors are found', (done) => {
            let experiment = new Experiment({ ...experimentOptions, groundTruth: require('./ground-truth-perfect.json') })
            experiment.run()
                .then(results => {
                    expect(results).toEqual(sampleResultsPerfect)
                    expect(experiment.recognize).toHaveBeenCalledTimes(5)
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_1.mp3', 0, ['test_audio/audio_1.mp3', 'test_audio/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_2.mp3', 1, ['test_audio/audio_1.mp3', 'test_audio/audio_2.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_3.mp3', 0, ['test_audio/audio_3.mp3', 'test_audio/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_4.mp3', 1, ['test_audio/audio_3.mp3', 'test_audio/audio_4.mp3'])
                    expect(experiment.recognize).toHaveBeenCalledWith('test_audio/audio_5.mp3', 0, ['test_audio/audio_5.mp3'])
                    done()
                })
                .catch(err => done.fail(err))
        })
    })
})