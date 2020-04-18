/**
 * Remove LineBreak
 * @param {string} input
 */
function rmLineBreak(input) {

  if (typeof input === 'string') {
    return input.replace(/(\n)$/g,'')
  } else if (Array.isArray(input)) {
    return input.map(i=>i.replace(/(\n)$/g,''))
  } else {
    throw new Error('Error on Remove caracteres, from Utils.')
  }
}
/**
 * Remove Quotation
 * @param {string} input
 */
function rmQuotation(input) {
  if (typeof input === 'string') {
    return input.replace(/(\")$/g,'')
  } else if (Array.isArray(input)) {
    return input.map(i=>i.replace(/(\")$/g,''))
  } else {
    throw new Error('Error on Remove caracteres, from Utils.')
  }
}
/**
 * Remove LineBreak and Quotation
 * @param {string} input
 */
function rmQuotationLineBreak(input) {
  if (typeof input === 'string') {
    return rmQuotation(rmLineBreak(input))
  } else if (Array.isArray(input)) {
    return input.map(i=>rmQuotation(rmLineBreak(i)))
  } else {
    throw new Error('Error on Remove caracteres, from Utils.')
  }
}
/**
 * Remove LineBreak and Quotation
 * @param {string} input
 */
function rmStrictQuotationLineBreak(input) {
  if (typeof input === 'string') {
    return input.replace(/(\"\n)$/g,'')
  } else if (Array.isArray(input)) {
    return input.map(i=>i.replace(/(\"\n)$/g,''))
  } else {
    throw new Error('Error on Remove caracteres, from Utils.')
  }
}

module.exports = {
  rmLineBreak,
  rmQuotation,
  rmQuotationLineBreak,
  rmStrictQuotationLineBreak
}