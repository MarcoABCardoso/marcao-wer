const ow = require('ow')
const csvtojsonV2 = require('csvtojson')
const { generateReports } = require('./experiment-analysis')


class Experiment {

    constructor(options) {
        ow(options.filePath, 'Missing parameter \'filePath\' or value provided is not a string', ow.string)
        ow(options.recognize, 'Parameter \'recognize\' is not a function', ow.function)
        ow(options.verbose, 'Parameter \'verbose\' is not boolean', ow.optional.boolean)
        ow(options.batchSize, 'Parameter \'batchSize\' is not a number', ow.optional.number)

        this.filePath = options.filePath
        this.recognize = options.recognize

        this.config = {
            ...Experiment.getDefaultConfig(),
            ...options
        }

    }

    async run() {
        let groundTruth = await csvtojsonV2().fromFile(this.filePath)
        let numChunks = Math.ceil(groundTruth.length / this.config.batchSize)
        let transcripts = (await Promise.all(
            groundTruth
                .reduce((chunks, line, i) => chunks
                    .map((chunk, j) => Math.floor(i / this.config.batchSize) === j ? [...chunk, line.file] : chunk), Array(numChunks).fill([]))
                .map(chunk => Promise.all(chunk.map(this.recognize))))
        )
            .reduce((transcripts, batch) => [...transcripts, ...batch], [])
        return generateReports(groundTruth, transcripts)
    }

}

Experiment.getDefaultConfig = () => ({
    verbose: false,
    batchSize: 10,
})

module.exports = Experiment