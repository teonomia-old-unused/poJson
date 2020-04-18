# poJson
This project was made to help a translation community.
It pretends to provide:
- easily handling translation files
- easily transform data to many type of files

Currently **this module does not support plural form**.
noted as:
```po
msgid_plural "%d files removed"
msgstr[0] ""
msgstr[1] ""
```
This module will not suport files that contains this .po feature
Below are easy table to know the types of files that this module supports

## features Implemented:

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

## Json pathern
the poJson pather is simple:
```js
{
  header:[] // all line of headers need to be in simple strings
  body:[
    {
      id:[""], // array of string. the msgid in .po file
      str: [""], // array of string. the msgstr in .po file
      comment: "" // string. the comments in .po file
      /**
       * If the Json file is transformed from HTML, the comment will contain only HTML informations
    }
  ]
}
```

# Usage:
you need only require this module and use it as showed below:
```js
poJson.po2poJson('<Your File String>') // Transform .po to .json
poJson.poJson2po('<Your File String>') // Transform .json to .po
poJson.html2poJson('<Your File String>') // transform .html to .json
poJson.poJson2html('<Your File String>') // transform .json to html
```