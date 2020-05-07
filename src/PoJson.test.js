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
    F.wf(cwd('data.test/po2poJson.json'),returnedPoJson.toString)

    expect(returnedPoJson.body[0].id).toBeDefined()
    expect(returnedPoJson.body[0].id[0]).toBeDefined()
    expect(returnedPoJson.body[0].str).toBeDefined()
    expect(returnedPoJson.body[0].str[0]).toBeDefined()
    expect(returnedPoJson.body[0].comment).toBeDefined()
  })
})

describe('PoJSON para PO', () => {
  jest.resetModules()
  it('modelo da estrutura do po', async () => {
    expect.assertions(1)
    const poJsonBuff = await F.rf(cwd('data.test/poJson.json')); const poJsonS = poJsonBuff.toString()
    const returnedPo = new PoJson(poJsonS).po
    F.wf(cwd('data.test/poJson2po.po'),returnedPo)
    const splitedReturnedPo = returnedPo.split('\n\n')
    expect(splitedReturnedPo[1]).toBeDefined()
  })
})

describe('HTML para PoJSON', () => {
  jest.resetModules()
  it('modelo da estrutura do poJson', async () => {
    expect.assertions(4)
    const htmlBuff = await F.rf(cwd('data.test/article.html')); const htmlS = htmlBuff.toString()
    const returnedPoJson = PoJson.fromHtml(htmlS)
    F.wf(cwd('data.test/articleHtml.json'),returnedPoJson.string)

    expect(returnedPoJson.body[0].id).toBeDefined()
    expect(returnedPoJson.body[0].str).toBeDefined()
    expect(returnedPoJson.body[0].comment).toBeDefined()
    expect(returnedPoJson.body[0].comment).toMatch(/^##HTML:/g)
  })
})

describe('PoJSON para HTML', () => {
  jest.resetModules()
  it('modelo da estrutura do poJson', async () => {
    expect.assertions(3)
    const jsonBuff = await F.rf(cwd('data.test/articleHtml.json')); const jsonS = jsonBuff.toString()
    const returnedJsonHtmlString = new PoJson(jsonS).html

    const HTMLElement = HTML.parse(returnedJsonHtmlString)

    F.wf(cwd('data.test/json.html'),returnedJsonHtmlString)

    expect(HTMLElement.querySelector('article').tagName).toBe('article')
    expect(HTMLElement.querySelector('div').tagName).toBe('div')
    expect(HTMLElement.querySelector('p').tagName).toBe('p')
  })
})

describe('Generating info', () => {
  jest.resetModules()
  it('Test if all informations are being Created', async () => {
    expect.assertions(8)
    const jsonBuff = await F.rf(cwd('data.test/8-rush.json')); const jsonS = jsonBuff.toString()
    const returnedPoJson = new PoJson(jsonS)
    let recievedObjct = returnedPoJson.generateInfo()
    expect(returnedPoJson._info).toBeDefined()
    expect(returnedPoJson._info.translatedLines).toBeGreaterThan(0) // Expect a file with minimum of 1 line translated
    expect(returnedPoJson._info.totalLines).toBeGreaterThan(0)
    expect(returnedPoJson._info.percentageTranslated).toBeGreaterThan(0) // Expect a file with minimum of 1 line translated
    expect(recievedObjct).toBeDefined()
    
    recievedObjct = returnedPoJson.updateInfo()
    expect(recievedObjct).toBeDefined()
    expect(recievedObjct.i).toBeDefined()
    expect(recievedObjct.info).toBeDefined()
  })
  it('Test if first line infos are being readed', async () => {
    expect.assertions(4)
    const jsonBuff = await F.rf(cwd('data.test/bodyHeader/json.json')); const jsonS = jsonBuff.toString()
    const returnedPoJson = new PoJson(jsonS)
    expect(returnedPoJson.parseFirstLine().headerInfo).toBeDefined()
    expect(returnedPoJson.parseFirstLine().headerInfo.contributors[0].name).toBeDefined()
    expect(returnedPoJson.parseFirstLine().headerInfo.contributors[0].email).toBeDefined()
    expect(returnedPoJson.parseFirstLine().headerInfo.contributors.length).toBeGreaterThan(1)

  })
})

describe('PO rush', () => {
  //jest.resetModules()
  it('4 rush', async () => {
    expect.assertions(2)
    const poPoBuff = await F.rf(cwd('data.test/final-rush-article.po')); const poPo = poPoBuff.toString()
    const returnedPoJson = PoJson.fromPo(poPo)
    //returnedPoJson.toHtml()
    // console.log(returnedPoJson)
    F.wf(cwd('data.test/final-rush-article.json'),returnedPoJson.toString)

    expect(returnedPoJson.body[0].id).toBeDefined()
    expect(returnedPoJson.body[4].id[1]).toBe('	To be prayerless is to regard ourselves as autonomous, and to believe, im')

    // console.log(returnedPoJson.body)
    // expect(returnedPoJson.body[0].id).toBeDefined()
    // expect(returnedPoJson.body[4].id[0]).toBe('	To be prayerless is to regard ourselves as autonomous, and to believe, im')
  })

  it('8 rush', async () => {
    expect.assertions(2)
    const poPoBuff = await F.rf(cwd('data.test/8-rush.po')); const poPo = poPoBuff.toString()
    const returnedPoJson = PoJson.fromPo(poPo)
    const returnedHtml = PoJson.fromPo(poPo).html
    const returnedHtmlTranslated = PoJson.fromPo(poPo).translatedHtml
    returnedPoJson.toHtml()

    F.wf(cwd('data.test/8-rush.json'),returnedPoJson.toString())

    expect(returnedPoJson.body[0].str).toBeDefined()
    expect(returnedPoJson.body[4].str.length).toBe(1)

    F.wf(cwd('data.test/8-rush.html'),returnedHtmlTranslated)
    F.wf(cwd('data.test/8-rush-translated.html'),returnedHtml)

  })
})