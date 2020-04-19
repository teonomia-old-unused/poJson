const F = require('./File')
const HTML = require('node-html-parser')
const { rmStrictQuotationLineBreak, rmQuotationLineBreak, rmStartEmptyLine } = require('./utils')
const PoJson = require('./PoJson')

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
function html2poJson (string, removeEmpty = true) {
  const content = HTML.parse(string)

  const body = content.childNodes[0].childNodes.map(node => {
    return {
      id: [node.rawText],
      str: [''],
      comment: `##HTML: <${node.tagName} ${node.rawAttrs}>{{#c}}</${node.tagName}>` }
    }
  )
  const response = new PoJson(body)
  return response.removeEmpty().toString()
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