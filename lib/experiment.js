const { generateReports } = require('./experiment-analysis')


class Experiment {

    constructor(options) {
        this.groundTruth = options.groundTruth
        this.recognize = options.recognize

        this.config = {
            ...Experiment.getDefaultConfig(),
            ...options
        }

    }

    async run() {
        let numChunks = Math.ceil(this.groundTruth.length / this.config.batchSize)
        let transcripts = (await Promise.all(
            this.groundTruth
                .reduce((chunks, line, i) => chunks
                    .map((chunk, j) => Math.floor(i / this.config.batchSize) === j ? [...chunk, line.audio] : chunk), Array(numChunks).fill([]))
                .map(chunk => Promise.all(chunk.map(this.recognize))))
        )
            .reduce((transcripts, batch) => [...transcripts, ...batch], [])
        return generateReports(this.groundTruth, transcripts)
    }

}

Experiment.getDefaultConfig = () => ({
    batchSize: 10,
})

module.exports = Experiment