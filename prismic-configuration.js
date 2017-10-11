var PrismicDOM = require('prismic-dom');
var Elements = PrismicDOM.Elements;

module.exports = {

  apiEndpoint: 'https://serializer-example.prismic.io/api/v2',

  // -- Access token if the Master is not open
  // accessToken: 'xxxxxx',

  // OAuth
  // clientId: 'xxxxxx',
  // clientSecret: 'xxxxxx',

  // -- Links resolution rules
  // This function will be used to generate links to Prismic.io documents
  // As your project grows, you should update this function according to your routes
  linkResolver: function(doc) {
    if (doc.type == 'page') return '/page/' + doc.uid;
    return '/';
  },
  
  // -- HTML Serializer
  // This function will be used to chnage the way the html is loaded
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
};
