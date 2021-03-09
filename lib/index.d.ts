
/**
 * @module marcao-wer
 */

 declare class Experiment {
    /**
     * Construct an Experiment object.
     * @constructor
     */
    constructor(options: ExperimentOptions)
    /**
     * Execute experiment
     */
    run(): Promise<ExperimentResults>
}

interface ExperimentOptions {
    audioFile: string
    groundTruthFile: string
    recognize: (audioFilePath: string) => Promise<string>
    tempDir?: string
    verbose?: boolean
    batchSize?: number
}

interface Change {
    type: string
    word: string
    with: string
}

interface Transcription {
    text: string
    prediction: string
    word_error_rate: number
    changes: Change[]
}

interface ExperimentResults {
    total_words: number
    word_error_rate: number
    sentence_error_rate: number
    transcriptions: Transcription[]
}

export = Experiment