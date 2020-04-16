const F = require('./File')
const HTML = require('node-html-parser')

async function searchAndTransform (print =true , path = `./gettext_po_sample_file.po`){
  const file = await F.rf(path)
  const fileString = await file.toString()
  const transformed = transform(fileString)
  if (print) {
    console.log(transformed)
  }

  return transformed
}

function po2poJson (string){
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
        id: breakLine(msg[0]),
        str: msg[1] ? breakLine(msg[1]) : msg[1],
        comment
      }
    })
  }
  // console.log(poJson)
  console.log(poJson.body.map(i=>i.id))
  return poJson
}

function html2poJson (string) {
  // console.log(string)
  const content = HTML.parse(string)
  console.log(content.childNodes[0].rawText)

  const body = content.childNodes[0].childNodes.map(node => {
    return {
      id: node.rawText,
      msg: '',
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

module.exports = {
  po2poJson,
  searchAndTransform,
  html2poJson
}