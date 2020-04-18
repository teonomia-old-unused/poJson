const r = require('./index')
const F = require('./File')
async function  traslate (it) {

  // const html = await F.rf('./article.html')
  // const string = r.html2poJson(html.toString())
  // console.log(string)
  // F.wf('html.json', string)

  // const poBuff = await F.rf(process.cwd()+'/src/data.test/po.po'); const po = await poBuff.toString()
  // const pojson = r.po2poJson(po)
  // F.wf(process.cwd()+'/src/dataProcessed/poJson.json', JSON.stringify(pojson))

  const poJsonBuff = await F.rf(process.cwd()+'/src/dataProcessed/poJson.json'); const poJson = await poJsonBuff.toString()
  console.log(JSON.parse(poJson))
  const poFrompoJson = r.poJson2po(poJson)
  F.wf(process.cwd()+'/src/dataProcessed/poJson2Po.po', poFrompoJson)
}

traslate('')
