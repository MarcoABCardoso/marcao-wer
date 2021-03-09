const ow = require('ow')
const fs = require('fs')
const { Extract } = require('unzipper')
const { removeDirSync } = require('./utils')
const { generateReports } = require('./experiment-analysis')


class Experiment {

    constructor(options) {
        ow(options.audioFile, 'Missing parameter \'audioFile\' or value provided is not a string', ow.string)
        ow(options.groundTruthFile, 'Missing parameter \'groundTruthFile\' or value provided is not a string', ow.string)
        ow(options.recognize, 'Parameter \'recognize\' is not a function', ow.function)
        ow(options.tempDir, 'Missing parameter \'tempDir\' or value provided is not a string', ow.optional.string)
        ow(options.verbose, 'Parameter \'verbose\' is not boolean', ow.optional.boolean)
        ow(options.batchSize, 'Parameter \'batchSize\' is not a number', ow.optional.number)

        this.audioFile = options.audioFile
        this.groundTruthFile = options.groundTruthFile
        this.recognize = options.recognize

        this.config = {
            ...Experiment.getDefaultConfig(),
            ...options
        }

        this.log = this.config.verbose ? console.log : () => { }
    }

    async run() {
        // Remove temporary directory
        this.log('[MARCAO-WER] Removing tempDir')
        try { removeDirSync(this.config.tempDir) }
        catch (err) { this.log('[MARCAO-WER] tempDir does not exist') }

        this.log('[MARCAO-WER] Unzipping audio files')
        // Unzip audio files into tempDir and get array of file paths
        let audioStream = fs.createReadStream(this.audioFile)
        audioStream.pipe(Extract({ path: this.config.tempDir }))
        await new Promise(r => audioStream.on('close', r))
        await new Promise(r => setTimeout(r, 100))

        // Get array of audio files
        let audioFiles = fs
            .readdirSync(this.config.tempDir)
            .map(file => `${this.config.tempDir}/${file}`)
            .filter(path => fs.lstatSync(path).isFile())

        this.log('[MARCAO-WER] Reading groundTruthFile')
        // Read transcriptions file
        let groundTruth = fs.readFileSync(this.groundTruthFile, { encoding: 'utf-8' })
            .split('\n')

        // Exit early if there's a size mismatch
        if (groundTruth.length !== audioFiles.length) {
            this.log('[MARCAO-WER] Length mismatch between groundTruth and audio')
            removeDirSync(this.config.tempDir)
            throw new Error('Length mismatch between groundTruth and audio')
        }

        this.log('[MARCAO-WER] Getting transcriptions')
        // Get transcriptions array from the audios
        let numChunks = Math.ceil(audioFiles.length / this.config.batchSize)
        let transcripts = (await Promise.all(
            audioFiles
                .reduce((chunks, file, i) => chunks
                    .map((chunk, j) => Math.floor(i / this.config.batchSize) === j ? [...chunk, file] : chunk), Array(numChunks).fill([]))
                .map(chunk => Promise.all(chunk.map(this.recognize))))
        )
            .reduce((transcripts, batch) => [...transcripts, ...batch], [])

        // Remove temporary directory
        this.log('[MARCAO-WER] Removing tempDir')
        removeDirSync(this.config.tempDir)

        this.log('[MARCAO-WER] Testing complete!')
        return generateReports(groundTruth, transcripts)
    }

}

Experiment.getDefaultConfig = () => ({
    tempDir: './temp',
    verbose: false,
    batchSize: 10,
})

module.exports = Experiment