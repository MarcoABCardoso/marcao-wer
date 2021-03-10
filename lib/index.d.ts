
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
    filePath: string
    recognize: (audioFilePath: string) => Promise<string>
    verbose?: boolean
    batchSize?: number
}

interface Change {
    type: string
    phrase: string
    with?: string
}

interface Transcription {
    file: string
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