/**
 * Remove emptyLine
 * @param {string || Array} input
 */
function rmStartEmptyLine(input) {

  if (typeof input === 'string') {
    return input.replace(/(^\"\n\")/g,'')
  } else if (Array.isArray(input)) {
    return input.map(i=>i.replace(/(^\"\n\")/g,''))
  } else {
    throw new Error('Error on Remove caracteres, from Utils.')
  }
}
/**
 * Remove LineBreak
 * @param {string || Array} input
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
 * @param {string || Array} input
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
 * @param {string || Array} input
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
 * @param {string || Array} input
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

/**
 * Break lines and scape special caracters
 * @param {string} input
 * @returns {array}
 */
function splitInLinesByCaracters(fullText, charsPerLine = 79) {
  function endwhith(_text, _caractere='\\', recursiveTimes = 0) {
    if(_text.endsWith(_caractere)){
      const _textLength = _text.length
      return endwhith(_text.substr(0,_textLength-1), _caractere, recursiveTimes++)
    }else{
      return {_text, recursiveTimes}
    }
  }

  let thisLine
  let textBreaked = ''
  const arrayOfLines = []
  for (let caractere = 0; caractere < fullText.length; caractere+=charsPerLine) {
    textBreaked += '"'

    thisLine = fullText.substr(caractere, charsPerLine)
    const verifiedLine = endwhith(thisLine)
    if(verifiedLine.recursiveTimes){
      caractere -= verifiedLine.recursiveTimes
      arrayOfLines.push(verifiedLine._text)
    }else{
      arrayOfLines.push(thisLine)
    }
  }
  return arrayOfLines
}

module.exports = {
  rmStartEmptyLine,
  rmLineBreak,
  rmQuotation,
  rmQuotationLineBreak,
  rmStrictQuotationLineBreak,
  splitInLinesByCaracters
}