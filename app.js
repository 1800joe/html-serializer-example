/**
 * Module dependencies.
 */
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const PrismicConfig = require('./prismic-configuration');
const app = require('./config');
const PORT = app.get('port');

app.listen(PORT, () => {
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver,
    htmlSerializer: PrismicConfig.htmlSerializer
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req,
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

/**
* Function to render the 404 page
*/
function render404(req, res, message) {
  return res.status(404).render('error', { message: message });
}


/**
* Query the site navigation with every route
*/
app.route('*').get((req, res, next) => {
  req.prismic.api.getSingle('navigation').then(function(navContent){
    
    // Define the navigation content
    res.locals.navContent = navContent;
    next();
  });
});


/**
* Preconfigured prismic preview
*/
app.get('/preview', function(req, res) {
  return Prismic.preview(req.prismic.api, PrismicConfig.linkResolver, req, res);
});


/**
* Homepage Route
*/
app.get('/', function(req, res) {
  
  // Query the homepage content
  req.prismic.api.getSingle('homepage').then(function(homepageContent) {
    
    // Render the 404 page if this uid is not found
    if(!homepageContent) {
      return render404(req, res, 'Could not find a homepage document in your content repository.');
    }
    
    // Render the homepage
    res.render('homepage', { homepageContent: homepageContent });
  });
});


/**
* Page Route
*/
app.get('/page/:uid', function(req, res) {
  
  // Define the UID from the url
  var uid = req.params.uid;
  
  // Query the page by its uid
  req.prismic.api.getByUID('page', uid).then(function(pageContent) {
    
    // Render the 404 page if this uid is not found
    if(!pageContent) {
      return render404(req, res);
    }
    
    // Render the page
    res.render('page', { pageContent: pageContent });
  });
});


/**
* Render 404 for any other route
*/
app.use('*', function(req, res) {
  return render404(req, res);
});
