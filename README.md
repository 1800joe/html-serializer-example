# prismic.io Example Website with a working HTML Serializer

This is a simple nodejs website example with a working HTML Serializer for prismic.io.

It uses the prismic.io API v2.

The HTML Serializer function is located in the **prismic-configuration.js** file. 

```
htmlSerializer: function (element, content, children) {
  switch(element.type) {

    // Add a class to paragraph elements
    case Elements.paragraph: 
      return '<p class="paragraph-class">' + children.join('') + '</p>';

    // Don't wrap images in a <p> tag
    case Elements.image: 
      return '<img src="' + element.url + '" alt="' + element.alt + '">';

    // Add a class to hyperlinks
    case Elements.hyperlink:
      var target = element.data.target ? 'target="' + element.data.target + '" rel="noopener"' : '';
      var linkUrl = PrismicDOM.Link.url(element.data, module.exports.linkResolver);
      return '<a class="some-link"' + target + ' href="' + linkUrl + '">' + content + '</a>';

    // Return null to stick with the default behavior
    default: 
      return null;
  }
}
```

It is then called in **homepage.pug**. Here is what it looks like.

```
// This example is using the pug templating system
div.container(data-wio-id=homepageContent.id)

  != PrismicDOM.RichText.asHtml(homepageContent.data['site-title'], ctx.linkResolver, ctx.htmlSerializer)
  img.site-image(src=homepageContent.data.image.url)
  != PrismicDOM.RichText.asHtml(homepageContent.data.text, ctx.linkResolver, ctx.htmlSerializer)
```

It is also called in **page.pug**. Here is an example.

```
// This example is using the pug templating system
div.container(data-wio-id=pageContent.id) 
  != PrismicDOM.RichText.asHtml(pageContent.data.title, ctx.linkResolver, ctx.htmlSerializer)
  != PrismicDOM.RichText.asHtml(pageContent.data.text, ctx.linkResolver, ctx.htmlSerializer)
```

## Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2017 Prismic.io (http://www.prismic.io).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
