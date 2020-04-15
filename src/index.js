const F = require('./File')

async function searchAndTransform (path = `${process.cwd()}/gettext_po_sample_file.po`){
  const file = await F.rf(path)
  const fileString = await file.toString()
  const transformed = transform(fileString)
  // console.log(transformed)
  return transformed
}

function transform (string){
  const splitedPo = string.split('\n\n')

  const poJson = {
    header: splitedPo.shift().split('\n"'),
    body: splitedPo.map(i => {
      const splited = i.split('msgid "')
      const comment = splited.shift()
      const msg = splited[0].split('msgstr "')
      return {
        id: msg[0],
        str: msg[1],
        comment
      }
    })
  }
  // console.log(poJson)
  // console.log(poJson.body.map(i=>i.id))
  return poJson
}

module.exports = {
  transform,
  searchAndTransform
}