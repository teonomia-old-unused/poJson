const poJson = require('./index')
const F = require('./File')
const cwdPath = process.cwd()
function cwd (path) {return `${cwdPath}/src/${path}`}

describe('PO para JSON', () => {
  jest.resetModules()
  it('modelo de body com id, str e comment', async () => {
    expect.assertions(5)
    const poPoBuff = await F.rf(cwd('data.test/po.po')); const poPo = poPoBuff.toString()
    const returnedPoJson = poJson.po2poJson(poPo)

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

    const splitedReturnedPo = returnedPo.split('\n\n')
    expect(splitedReturnedPo[1]).toBe('#. Please don\'t change the name of the application\n#: /app/modules/views\nmsgid "TODO List"\nmsgmsg "Lista TODO"')
  })
})