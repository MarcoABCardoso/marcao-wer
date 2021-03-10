const { diffWords } = require('diff')
const { wordErrorRate } = require('word-error-rate')

function getWordEditions(incoming, expected) {
    return diffWords(expected, incoming)
        .reduce((diff, change, i, changes) => {
            if (!change.added && !change.removed) return diff
            else if (change.removed && changes[i + 1] && changes[i + 1].added) return [...diff, { type: 'substitution', phrase: change.value, with: changes[i + 1].value.trim() }]
            else if (change.added && changes[i - 1] && changes[i - 1].removed) return diff
            else if (change.removed) return [...diff, { type: 'deletion', phrase: change.value.trim() }]
            else return [...diff, { type: 'addition', phrase: change.value.trim() }]
        }, [])
}

function generateReports(groudTruth, transcripts) {
    // Format transcriptions data
    let transcriptions = groudTruth
        .map((line, i) => ({
            file: line.file,
            text: line.transcript,
            prediction: transcripts[i],
            word_error_rate: wordErrorRate(transcripts[i], line.transcript),
            changes: getWordEditions(transcripts[i], line.transcript)
        }))

    // Get global statistics for this experiment
    let numWords = groudTruth.reduce((numWords, line) => numWords + line.transcript.split(/\b[^\s]+\b/).length, 0)
    let wer = groudTruth.reduce((wer, line, i) => wer + line.transcript.split(/\b[^\s]+\b/).length * transcriptions[i].word_error_rate / numWords, 0)
    let ser = groudTruth.reduce((ser, line, i) => ser + (transcriptions[i].word_error_rate === 0 ? 0 : 1) / groudTruth.length, 0)

    return {
        total_words: numWords,
        word_error_rate: wer,
        sentence_error_rate: ser,
        transcriptions
    }
}

module.exports = {
    generateReports
}