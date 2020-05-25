const { rmStrictQuotationLineBreak, rmQuotationLineBreak, rmStartEmptyLine, rmLineBreak, splitInLinesByCaracters } = require('./utils')
const HTML = require('node-html-parser')
const j2y = require('js-yaml')

module.exports = class PoJson {
  constructor(body, header) {
    if (typeof body === 'string') {
      const poJson = JSON.parse(body)
      this.header = poJson.header
      this.body = poJson.body
    } else if (Array.isArray(body)) {
      this.header = header || [
        "msgid \"\"\nmsgstr \"\"",
        "MIME-Version: 1.0\\n\"",
        "Content-Type: text/plain; charset=UTF-8\\n\"",
        "Content-Transfer-Encoding: 8bit\\n\"",
        `X-Generator: poJson 0.6.0\\n\"`,
        "Project-Id-Version: \\n\"",
        "Language: pt-br\\n\"",
        "POT-Creation-Date: \\n\"",
        "PO-Revision-Date: \\n\"",
        "Last-Translator: \\n\"",
        "Language-Team: \\n\""
      ]
      this.body = body
    } else { return {erro: 'the body param need to be array or Json String'}}
    this.dict = {
      bodyHeader: '##HEADER: HEADER'
    }

    // PARSERS =============================================================
    // =====================================================================
    this.toJson = () => {
      return { header: this.header, body: this.body }
    }
    this.toString = () => {
      return JSON.stringify(this.toJson())
    }
    this.toPo = () => {
        function sanitizeLineBreak(text = '') {
          const sanitized = text.replace(/\n/g, '\\n"\n"')
          return sanitized.replace()
        }
        let summary
        if (this.body[0].comment === this.dict.bodyHeader){
          summary = `\n\n${this.body[0].comment}\nmsgid "${j2y.safeDump(this.body[0].id).split('\n').join('\\n"\n"')}"\nmsgstr "${this.body[0].str === ''?'':j2y.safeDump(this.body[0].str)}"`
          this.body.shift()
        }
        return this.header.join('\n"') + summary + '\n\n'+ this.body.map(line => {
          return `${line.comment}\nmsgid "${line.id.map(i=>splitInLinesByCaracters(i)).join('"\n"')}"\nmsgstr "${line.str.map(i=>sanitizeLineBreak(i)).join('"\n"')}"\n\n`
        }).join('')
    }
    this.toHtml = (translated = false) => {

      let content

      const article = `<article>${this.body.map(poLineObject => {
        const thereIsHTMLNotation = poLineObject.comment.startsWith('##HTML:')
        const undefinedNode = poLineObject.comment.startsWith('##HTML: <undefined undefined')

        if (thereIsHTMLNotation && !undefinedNode) {
          content = translated? poLineObject.str: poLineObject.id

          if (typeof content != 'string' ) {
            content = content.join("")
            .replace(/\\n/g, "")
            .replace(/\\t/g, "")
            .replace(/\\"/g, '"')
          }

          return poLineObject.comment.substr(8).replace('{{#c}}',content)
        } else {
          content = translated? poLineObject.str: poLineObject.id

          content = typeof content
          return `<p>${content}</p>`
        }
      }).join('\n')}</article>`

      return `<HTML>\n${article}\n</HTML>`
    }
    this.toTranslatedHtml = () => {
      return this.toHtml(true)
    }
    this.generateInfo = () => {
      const translatedLines = this.body.filter(line=> line.str != '').length
      const totalLines = this.body.length
      const percentageTranslated = (translatedLines/totalLines)*100
      const haveHeader = this.body[0].comment === this.dict.bodyHeader || false
      this._info = {
        totalLines,
        translatedLines,
        percentageTranslated,
        haveHeader
      }
      return this
    }
  }

  get json () { return this.toJson() }

  get string () { return this.toString() }

  get po () { return this.toPo() }

  get html () { return this.toHtml() }

  get translatedHtml () { return this.toHtml(true) }

  get removeEmpty () {
    this.body = this.body.filter(line => {
      // console.log(line)
      const firstLineParsed = rmLineBreak(line.id[0]).trim()
      if (line.id.length === 1 && firstLineParsed.length === 0) {
        return false
      }
      return true
    })
    return this
  }

  get i () { return this._info }

  get info () { return this._info }

  updateInfo () { return this.generateInfo() }

  static fromPo (string) {
    const splitedPo = string.split('\n\n')
    const header = splitedPo.shift().split('\n"')
    // IF the last line is Empty it will be droped
    if (splitedPo[splitedPo.length-1].length === 0){
      // console.log('droped')
      splitedPo.pop()
    }
    const body = splitedPo.map(i => {
      const splited = i.split('msgid "')
      const comment = splited.shift()
      const msg = splited[0].split('msgstr "')
      let id = rmStartEmptyLine(rmStrictQuotationLineBreak(msg[0]))
      id = id.search('"\n"')>0? id.split('"\n"'): [id];

      let str = rmStartEmptyLine(rmQuotationLineBreak(msg[1]))
      str = str.search('"\n"')>0? str.split('"\n"'): [str];

      return {
        id,
        str: msg[1] ? str : msg[1],
        comment
      }
    })
    if(body[0].comment.trim() === '##HEADER: HEADER') {
      body[0].id = j2y.safeLoad(body[0].id.join('\n').replace(/\\n/g, ''))
      body[0].str = j2y.safeLoad(body[0].str.join('\n').replace(/\\n/g, '')) || {}
    }
    // console.log(body)
    return new PoJson(body, header)
  }

  static fromHtml (string) {
    const content = HTML.parse(string)

    const body = content.childNodes[0].childNodes.map(node => {
      return {
        id: splitInLinesByCaracters(node.rawText.replace(/(\t|\n)/g, '').trim()),
        str: [''],
        comment: `##HTML: <${node.tagName} ${node.rawAttrs}>{{#c}}</${node.tagName}>`
      }
    }).filter(line=>line.id != '')

    return  new PoJson(body)
  }
}
