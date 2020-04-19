const poJson = require('./index')
const PoJson = require('./PoJson')
const F = require('./File')
const cwdPath = process.cwd()
function cwd (path) {return `${cwdPath}/src/${path}`}
const HTML = require('node-html-parser')


describe('PO para JSON', () => {
  jest.resetModules()
  it('modelo de body com id, str e comment', async () => {
    expect.assertions(5)
    const poPoBuff = await F.rf(cwd('data.test/po.po')); const poPo = poPoBuff.toString()
    const returnedPoJson = PoJson.fromPo(poPo)
    F.wf(cwd('dataProcessed/test/po2poJson.json'),returnedPoJson.toString)

    expect(returnedPoJson.body[0].id).toBeDefined()
    expect(returnedPoJson.body[0].id[0]).toBe('TODO List')
    expect(returnedPoJson.body[0].str).toBeDefined()
    expect(returnedPoJson.body[0].str[0]).toBe('Lista TODO')
    expect(returnedPoJson.body[0].comment).toBeDefined()
  })
})

describe('PoJSON para PO', () => {
  jest.resetModules()
  it('modelo da estrutura do po', async () => {
    expect.assertions(1)
    const poJsonBuff = await F.rf(cwd('data.test/poJson.json')); const poJsonS = poJsonBuff.toString()
    const returnedPo = poJson.poJson2po(poJsonS)
    F.wf(cwd('dataProcessed/test/poJson2po.po'),returnedPo)
    const splitedReturnedPo = returnedPo.split('\n\n')
    expect(splitedReturnedPo[1]).toBe('#. Please don\'t change the name of the application\n#: /app/modules/views\nmsgid "TODO List"\nmsgmsg "Lista TODO"')
  })
})

describe('HTML para PoJSON', () => {
  jest.resetModules()
  it('modelo da estrutura do poJson', async () => {
    expect.assertions(4)
    const htmlBuff = await F.rf(cwd('data.test/article.html')); const htmlS = htmlBuff.toString()
    const returnedPoJson = PoJson.fromHtml(htmlS)
    F.wf(cwd('dataProcessed/test/articleHtml.json'),returnedPoJson.string)

    expect(returnedPoJson.body[0].id).toBeDefined()
    expect(returnedPoJson.body[0].str).toBeDefined()
    expect(returnedPoJson.body[0].comment).toBeDefined()
    expect(returnedPoJson.body[0].comment).toMatch(/^##HTML:/g)
  })
})

describe('PoJSON para HTML', () => {
  jest.resetModules()
  it('modelo da estrutura do poJson', async () => {
    expect.assertions(4)
    const jsonBuff = await F.rf(cwd('data.test/articleHtml.json')); const jsonS = jsonBuff.toString()
    const returnedJsonHtmlString = new PoJson(jsonS).html

    const HTMLElement = HTML.parse(returnedJsonHtmlString)

    F.wf(cwd('dataProcessed/test/json.html'),returnedJsonHtmlString)

    expect(HTMLElement.querySelector('article').tagName).toBe('article')
    expect(HTMLElement.querySelector('header').tagName).toBe('header')
    expect(HTMLElement.querySelector('div').tagName).toBe('div')
    expect(HTMLElement.querySelector('p').tagName).toBe('p')
  })
})