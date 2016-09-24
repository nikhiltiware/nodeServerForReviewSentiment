var express = require('express')
    , morgan = require('morgan')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , app = express()
    , port = process.env.PORT || 3000
    , router = express.Router();

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
 username: '8063a4e3-6e7f-460e-8234-bd8920dbf6ff',
 password: 'KdkZkPwKDnbN',
 version_date: '2016-05-19'
});

router.post('/reviews', function(req, res, next) {
    tone_analyzer.tone({ text: req.body.text},
 function(err, tone) {
   if (err)
     console.log(err);
   else
     res.send(tone);
});
    
});

app.use('/', router);

app.listen(port, '38.110.19.50');
console.log('App running on port', port);