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
| file.po   | file.json | [x] Yes     |
| file.json | file.po   | [x] Yes     |
| file.html | file.json | [ ] Soon    |
| file.json | file.html | [ ] No      |

## .po support coverage:

| From this       | Implemented |
|-----------      |------------:|
| comments        | [x] Yes     |
| msgid           | [x] Yes     |
| msgstr          | [x] Yes     |
| msgstr[]        | [ ] No      |
| msgid_plural    | [ ] No      |