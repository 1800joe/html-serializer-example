# prismic.io Example Website with a working HTML Serializer

This is a simple nodejs website example with a working HTML Serializer for prismic.io. 

The HTML Serializer function is located in the **prismic-configuration.js** file. 

```
htmlSerializer: function (element, content) {
  // Don't wrap images in a <p> tag
  if (element.type == 'image') {
    return '<img src="' + element.url + '" alt="' + element.alt + '">';
  }
  // Add a class to hyperlinks & have them open in a new tab
  if (element.type == 'hyperlink') {
    return '<a class="some-link" href="' + element.url + '" target="_blank">' + content + '</a>';
  }
  // Return null to stick with the default behavior
  return null;
}
```

It is then called in **homepage.pug**. Here is what it looks like.

```
// This example is using the pug templating system
div.container(data-wio-id=homepageContent.id)
  
  - var homepageTitle = homepageContent.getStructuredText('homepage.site-title')
  != homepageTitle ? homepageTitle.asHtml(ctx.linkResolver, ctx.htmlSerializer) : ""

  - var image = homepageContent.getImage('homepage.image')
  - var imageUrl = image ? image.url : ""
  img.site-image(src=imageUrl)

  - var homepageText = homepageContent.getStructuredText('homepage.text')
  != homepageText ? homepageText.asHtml(ctx.linkResolver, ctx.htmlSerializer) : ""
```

It is also called in **page.pug**. Here is an example.

```
// This example is using the pug templating system
div.container(data-wio-id=pageContent.id)
  - var pageTitle = pageContent.getStructuredText('page.title')
  != pageTitle ? pageTitle.asHtml(ctx.linkResolver, ctx.htmlSerializer) : ""

  - var pageText = pageContent.getStructuredText('page.text')
  != pageText ? pageText.asHtml(ctx.linkResolver, ctx.htmlSerializer) : ""
```

## Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2016 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
