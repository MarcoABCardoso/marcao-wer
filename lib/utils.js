const fs = require('fs')

function removeDirSync(dir) {
    let things = fs.readdirSync(`${dir}`)
    things.map(t => fs.statSync(`${dir}/${t}`).isDirectory() ?
        removeDirSync(`${dir}/${t}`) :
        fs.unlinkSync(`${dir}/${t}`)
    )
    fs.rmdirSync(dir)
}

module.exports = { removeDirSync }