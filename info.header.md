By this time, the info from where it was retireved,the author, the colaborators... will be mantained in the first line of poJson body.
To know if this ispresent on the file that you are handling you can call ```myPoJson.generateInfo().i.haveHeader```

# .POJSON
```js
pojson = {
  header:[{...}, {...}, ...],
  body: [{
    id: { 
      title: "Title of the article to be translated",
      slug: "tile-of-the-article-to-be-translated",
      "seo-title": "Improved Title",
      "seo-slug": "improved-title",
      "source-name": "Chalcedon Foundation",
      "source-article-url": "http://chalcedon.edu/",
      tags:
        "rushdoony, r.j.rushdoony, chalcedon, thenonomy, reformed faith, rushdoony asudhausdhau shdaus hdaus hdaus hdaush d, r.j.rushdoony, chalcedon, thenonomy, reformed faith",
      contributor: "noOne|noEmail@no.com",
      translated: "TRUE" },
    str: {},
    comment: '##HEADER: HEADER'
  },
  {...}, ...],
  _info:{
    totalLines: 10, // total number of lines in this file
    translatedLines: 5, // Total number of lines translated 
    percentageTranslated: 50, // Percentage of translated lines in the file
    haveHeader: true // Boolean, if there is a header the in body
  }
}
```
# .PO
```po
msgid ""
msgstr ""
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"X-Generator: poJson 0.5.4\n"
"Project-Id-Version: \n"
"Language: pt-br\n"
"POT-Creation-Date: \n"
"PO-Revision-Date: \n"
"Last-Translator: \n"
"Language-Team: \n"

##HEADER: HEADER
msgid "title: Title of the article to be translated\n"
"slug: tile-of-the-article-to-be-translated\n"
"seo-title: Improved Title\n"
"seo-slug: improved-title\n"
"source-name: Chalcedon Foundation\n"
"source-article-url: http://chalcedon.edu/\n"
"tags: rushdoony, r.j.rushdoony, chalcedon, thenonomy, reformed faith\n"
"contributor: Alvaro Separovich|alvasepro@gmail.com\n"
"contributor: noOne|noEmail@no.com\n"
"translated: TRUE\n"
""
msgstr "Titulo do artigo que foi traduzido"
...

##HTML: <p >{{#c}}</p>
msgid "text in english"
msgstr "texto em portugues"
```