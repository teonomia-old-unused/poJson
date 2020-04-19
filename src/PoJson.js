const utils = require('./utils')

module.exports = class PoJson {
  constructor(body, header) {
    this.header = header || [
      "msgid \"\"\nmsgstr \"\"",
      "MIME-Version: 1.0\\n\"",
      "Content-Type: text/plain; charset=UTF-8\\n\"",
      "Content-Transfer-Encoding: 8bit\\n\"",
      `X-Generator: poJson 0.0.1\\n\"`,
      "Project-Id-Version: \\n\"",
      "Language: pt-br\\n\"",
      "POT-Creation-Date: \\n\"",
      "PO-Revision-Date: \\n\"",
      "Last-Translator: \\n\"",
      "Language-Team: \\n\""
    ]
    this.body = body

    this.toJson = () => {
      return { header: this.header, body: this.body }
    }

    this.toString = () => {
      return JSON.stringify(this.toJson())
    }

    this.removeEmpty = () => {
      return this.body.filter(line => {
        console.log(line)
        const firstLineParsed = utils.rmLineBreak(line.id[0]).trim()
        if (line.id.length === 1 && firstLineParsed.length === 0) {
          return false
        }
        return true
      })
    }
  }
}