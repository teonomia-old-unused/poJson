const r = require('./index')
const F = require('./File')
async function  traslate (it) {
  // const file = await r.searchAndTransform(false)
  // await F.wf('po.json', JSON.stringify(file))

  const html = await F.rf('./article.html')
  const string = r.html2poJson(html.toString())
  console.log(string)
  F.wf('html.json', string)
}
traslate('')