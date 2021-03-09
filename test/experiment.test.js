const Experiment = require('../lib')

let sampleResults = require('./sample-results.json')
let experimentOptions

beforeEach(() => {
    experimentOptions = {
        audioFile: './test/_audioFile.zip',
        groundTruthFile: './test/_groundTruthFile.txt',
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
        it('Sets this.log when verbose is enabled', () => {
            let experiment = new Experiment({ ...experimentOptions, verbose: true })
            expect(experiment.log).toEqual(console.log)
        })
    })

    describe('#runExperiment', () => {
        it('Executes WER experiment using provided files', (done) => {
            let experiment = new Experiment(experimentOptions)
            experiment.run()
                .then(results => {
                    expect(results).toEqual(sampleResults)
                    expect(experiment.recognize).toHaveBeenCalledTimes(5)
                    done()
                })
                .catch(err => done.fail(err))
        })
        it('Fails when number of audios does not match number of transcriptions', (done) => {
            let experiment = new Experiment({...experimentOptions, groundTruthFile: './test/_badGroundTruthFile.txt'})
            experiment.run()
                .then(err => done.fail(err))
                .catch(err => {
                    expect(err.message).toEqual('Length mismatch between groundTruth and audio')
                    done()
                })
        })
    })
})