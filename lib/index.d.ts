
/**
 * @module marcao-wer
 */

 declare class Experiment {
    constructor(options: ExperimentOptions)
    run(): Promise<ExperimentResults>
}

interface Transcription {
    audio: string
    transcript: string
}

interface ExperimentOptions {
    groundTruth: Transcription[]
    recognize: (audioFilePath: string) => Promise<string>
    batchSize?: number
}

interface Change {
    type: string
    phrase: string
    with?: string
}

interface TranscriptionResult {
    audio: string
    text: string
    prediction: string
    word_error_rate: number
    changes: Change[]
}

interface ErrorDistributionItem {
    count: number
    phrase: string
}

interface PairwiseDistributionItem extends ErrorDistributionItem {
    with: string
}

interface ExperimentReports {
    addition_distribution: ErrorDistributionItem[]
    deletion_distribution: ErrorDistributionItem[]
    substitution_distribution: ErrorDistributionItem[]
    pairwise_phrase_substitutions: PairwiseDistributionItem[]
}

interface ExperimentResults {
    total_words: number
    word_error_rate: number
    sentence_error_rate: number
    transcriptions: TranscriptionResult[]
    reports: ExperimentReports
}

export = Experiment