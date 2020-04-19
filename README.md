# poJson
This Module transform a file .po into .json following the poJson pathern.
It also transform .po to .html.
If you want to transform **.JSON to .PO**, **.PO to .JSON**, **.PO to .HTML**, **.HTML to .PO** or even **HTML to poJson pathern**, this module can help you.

----

#### why?
This project was made to create a software for a translation open community, and a file pathern well used to open-source projects translation is .po, seeking other tools to help the translation (other softwares, sites, packages and integrations) we created this module and stablished the poJson pathern.

#### what we want?
This module pretends to provide:
- easily handling translation files
- easily transform data to many type of files

Currently **this module does not support .po plural form**.
noted as:
```po
msgid_plural "%d files removed"
msgstr[0] ""
msgstr[1] ""
```
This module will not suport files that contains this .po feature.

Below are an easy table to know the types of files that this module supports

## Features Implemented:

| From this | To this   | Implemented |
|-----------|:---------:|------------:|
| file.po   | file.json |  Yes     |
| file.json | file.po   |  Yes     |
| file.html | file.json |  Yes    |
| file.json | file.html |  Yes      |
| file.json | file.csv |  No      |
| file.csv | file.json |  No      |

## .po support coverage:

| From this       | Implemented |
|-----------      |------------:|
| comments        |  Yes     |
| msgid           |  Yes     |
| msgstr          |  Yes     |
| msgstr[]        |  No      |
| msgid_plural    |  No      |

# poJson pathern
the poJson pather is simple:
```js
{
  header:["","",...] // all line of headers need to be in simple strings
  body:[
    {
      id:[""], // array of string. the msgid in .po file
      str: [""], // array of string. the msgstr in .po file
      comment: "" // string. the comments in .po file
      /**
       * If the Json file is transformed from HTML, the
       * comment will contain only HTML informations
    }
  ]
}
```

# Usage:
We provide a PoJson Object.

## creating PoJson Object
here is a summary of how to create this Object:
```js
const PoJson = require('PoJson') // require the module. (Obivious)
let poJson

// Here a exmaple how to get your object from po file string.
const poFile = '...YOUR PO FILE STRING'
poJson = PoJson.fromPo(poFile)// this function returns PoJson Object

// Here a exmaple how to get your object from HTML file string.
const htmlFile = '...YOUR HTML FILE STRING'
poJson = PoJson.fromHtml(htmlFile)// this function returns PoJson Object

// Here is an example to get the PoJson Object by default class calling
// the constructor will recieve the body list on first param and header in second.
const bodyExample = [{id:"",str:"",comment:""}]
const headerExample = [""]
poJson = new PoJson(bodyExample, headerExample) // HEADER IS NOT REQUIRED!
// if you do not inform header it will create a default header

// You can also inform a stringfied poJson only
const stringfied = JSON.stringfy({ header:headerExample, body:bodyExample })
poJson = new PoJson(stringfied) // it will create the exact same file, even if you do not
// inform a header, it will create it automatically too.
```
As you can see above, you can directly transform html, po, json parsed or not to a PoJson Object.

## Using PoJson Object
here is a summary of how to create this Object:
```js
// As the last example code, we will use the variable poJson here tooo

const json = poJson.json // this will return your poJson as simple Json (without methods)

const str = poJson.string // this will return your poJson stringfied

const po = poJson.po // this will return your poJson as po file string

const html = poJson.html// this will return HTML with original content of your poJson

const translatedHtml = poJson.translatedHtml // this will return HTML with translated content


// if your file have empty lines and you want to remove you can use this
const newPoJosn = poJson.removeEmpty // it will return the exact same obj without this empty lines.
// it will not change your original object, will only return a similar without empty.

// and you can also concatenate this functions.
const jsonWithoutEmpty = poJson.removeEmpty.json
const stringWithoutEmpty = poJson.removeEmpty.string
const poWithoutEmpty = poJson.removeEmpty.po
const htmlWithoutEmpty = poJson.removeEmpty.html
```


## HTML to poJson details:
You need to provide a parameter with this aspects:
- html **string**.
- single html node object.
- the childs need to have the text to each msgid

Each child node will be a msgid, then, this examples will ilustrate the behavior with css selector:
#### Simple childs
```html
<article>
  <p>texto1</p>
  <p>texto2</p>
</article >
```
this html structure above will return an object like below:
```js
{
  haeder: [...],
  body: [
    {id:'texto1', str:'', comment:'##HTML: <p undefined>{{#c}}</p>'},
    {id:'texto2', str:'', comment:'##HTML: <p undefined>{{#c}}</p>'}
    ]
}
```

#### Complex childs

this is an other example to understand the behavior with more HTML childs:
```html
<article>
  <p>texto1 <span>span text</span></p>
  <p>texto2</p>
</article >
```
this html structure above will return an object like below:
```js
{
  haeder: [...],
  body: [
    {id:'texto1 span text', str:'', comment:'##HTML: <p undefined>{{#c}}</p>'},
    {id:'texto2', str:'', comment:'##HTML: <p undefined>{{#c}}</p>'}
    ]
}
```
As you can see in this example, the function will simplify your html structure.
Then, if you transform this json into a html, the element span will be no more in your html structure.
This file translation behave like this to reduce html to an object that match the simple structure of a .po file.

## This module does not help you to handle .po?
This is a open source module, **you can improve it** and **add features that could help this translation purpose**.

### How to contribute?
you can simply help us with documentation.
This is very important, if no one understand how to use, no one will. And there is a simple way that you can help, not only this project, but even every one that will use.

However, if you want to add a feature, remove a bug, change some behavior or only comment over something important, feel free to open a issue and even a Pull Request.
Your welcome. :D