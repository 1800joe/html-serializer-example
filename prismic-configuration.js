module.exports = {

  apiEndpoint: 'https://your-repo-name.prismic.io/api/v2',

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
};
