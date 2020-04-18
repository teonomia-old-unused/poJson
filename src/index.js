const F = require('./File')
const HTML = require('node-html-parser')
const { rmStrictQuotationLineBreak, rmQuotationLineBreak, rmStartEmptyLine } = require('./utils')


function po2poJson (string) {
  const splitedPo = string.split('\n\n')

  function breakLine (string) {
    return string.split('\\n"\n"')
  }

  const poJson = {
    header: splitedPo.shift().split('\n"'),
    body: splitedPo.map(i => {
      const splited = i.split('msgid "')
      const comment = splited.shift()
      const msg = splited[0].split('msgstr "')
      return {
        id: rmStartEmptyLine(rmStrictQuotationLineBreak(breakLine(msg[0]))),
        str: msg[1] ? rmStartEmptyLine(rmQuotationLineBreak(breakLine(msg[1]))) : msg[1],
        comment
      }
    })
  }
  return poJson
}
function poJson2po (string) {
  function sanitizeLineBreak(text = '') {
    const sanitized = text//.replace(/\n/g, '\\n"\n"')
    return sanitized.replace()
  }
  const poJson = JSON.parse(string)
  const file = poJson.header.join('\n"') +'\n\n'+ poJson.body.map(line => {
    return `${line.comment}msgid "${line.id.map(i=>sanitizeLineBreak(i))}"\nmsgmsg "${line.str.map(i=>sanitizeLineBreak(i))}"\n\n`
  }).join('')
  return file
}
function html2poJson (string) {
  // console.log(string)
  const content = HTML.parse(string)
  // console.log(content.childNodes[0].rawText)

  const body = content.childNodes[0].childNodes.map(node => {
    return {
      id: node.rawText,
      str: '',
      comment: `##HTML: <${node.tagName} ${node.rawAttrs}>{{#c}}</${node.tagName}>` }
    }
  )
  return JSON.stringify({
    header: [
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
    ],
    body
  })
}
function poJson2html (string, translated = false) {
  // console.log(string)
  const poJson = JSON.parse(string)
  const header = `<header>${poJson.header.join('\n')}</header>`
  let content

  const article = `<article>${poJson.body.map(poLineObject => {
    const thereIsHTMLNotation = poLineObject.comment.startsWith('##HTML:')
    const undefinedNode = poLineObject.comment.startsWith('##HTML: <undefined undefined')
    // console.log(thereIsHTMLNotation)

    if (thereIsHTMLNotation && !undefinedNode) {
      content = translated? poLineObject.str: poLineObject.id
      return poLineObject.comment.substr(8).replace('{{#c}}',content)
    } else {
      content = translated? poLineObject.str: poLineObject.id
      // console.log(thereIsHTMLNotation,content.substr(thereIsHTMLNotation))
      return `<p>${content}</p>`
    }
    return ``
  }).join('\n')}</article>`

  return `<HTML>\n${header}\n${article}\n</HTML>`
}

module.exports = {
  po2poJson,
  poJson2po,
  html2poJson,
  poJson2html
}