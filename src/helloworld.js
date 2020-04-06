// const parseCookie = (cookie) => cookie.split(/; */).reduce((obj, str) => {
// 	if (str === "") return obj;
// 	const eq = str.indexOf('=');
// 	const key = eq > 0 ? str.slice(0, eq) : str;
// 	let val = eq > 0 ? str.slice(eq + 1) : null;
// 	if (val != null) try { val = decodeURIComponent(val); } catch(ex) { /* pass */ }
// 	obj[key] = val;
// 	return obj;
// }, {});

// module.exports.handler =  (event, ctx, done) => {

//   const { Records: [ { cf: { request = {} } = {} } = {} ] = []} = event
//   let uri = (request && request.uri) || ''
//   console.log('event: ', event,'\n\n\n' , 'context: ', ctx);
  
//   const headers = event.headers || request.headers
//   const cookies = parseCookie(headers.Cookie)

//   var browsers = {
//     Chrome: /chromium|chrome|crios/i,
//     Safari: /safari/i,
//     UC: /UCBrowser/i
//   }
  
//   var env = {
//     modern: /(HeadlessChrome((?:\/73\.0\.\d+)?|(?:\/73\.([1-9]|\d{2,})\.\d+)?|(?:\/(7[4-9]|[8-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(73\.0|73\.([1-9]|\d{2,})|(7[4-9]|[8-9]\d|\d{3,})\.\d+)(?:\.\d+)?)|(Firefox\/(71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/,
//     average: /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(10[_\.]0|10[_\.]([1-9]|\d{2,})|10[_\.]2|10[_\.]([3-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})[_\.]\d+|11[_\.]0|11[_\.]([1-9]|\d{2,})|11[_\.]2|11[_\.]([3-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})[_\.]\d+|12[_\.]0|12[_\.]([1-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(CFNetwork\/808\.(\d))|(CFNetwork\/8.* Darwin\/16\.5\.\d+)|(CFNetwork\/8.* Darwin\/16\.6\.\d+)|(CFNetwork\/8.* Darwin\/16\.7\.\d+)|(CFNetwork\/8.* Darwin\/16\.\d+)|(CFNetwork\/8.* Darwin\/17\.0\.\d+)|(CFNetwork\/8.* Darwin\/17\.2\.\d+)|(CFNetwork\/8.* Darwin\/17\.3\.\d+)|(CFNetwork\/8.* Darwin\/17\.\d+)|(Edge\/(17(?:\.0)?|17(?:\.([1-9]|\d{2,}))?|(1[8-9]|[2-9]\d|\d{3,})(?:\.\d+)?))|(HeadlessChrome((?:\/51\.0\.\d+)?|(?:\/51\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[2-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(51\.0|51\.([1-9]|\d{2,})|(5[2-9]|[6-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(11\.1|11\.([2-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)?.*Safari\/)|(Firefox\/(63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/,
//     legacy: /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(9[_\.]0|9[_\.]([1-9]|\d{2,})|9[_\.]2|9[_\.]([3-9]|\d{2,})|([1-9]\d|\d{3,})[_\.]\d+|10[_\.]0|10[_\.]([1-9]|\d{2,})|10[_\.]2|10[_\.]([3-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})[_\.]\d+|11[_\.]0|11[_\.]([1-9]|\d{2,})|11[_\.]2|11[_\.]([3-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})[_\.]\d+|12[_\.]0|12[_\.]([1-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(CFNetwork\/758\.(\d))|(CFNetwork\/808\.(\d))|(CFNetwork\/7.* Darwin\/15\.\d+)|(CFNetwork\/8.* Darwin\/16\.5\.\d+)|(CFNetwork\/8.* Darwin\/16\.6\.\d+)|(CFNetwork\/8.* Darwin\/16\.7\.\d+)|(CFNetwork\/8.* Darwin\/16\.\d+)|(CFNetwork\/8.* Darwin\/17\.0\.\d+)|(CFNetwork\/8.* Darwin\/17\.2\.\d+)|(CFNetwork\/8.* Darwin\/17\.3\.\d+)|(CFNetwork\/8.* Darwin\/17\.\d+)|(Opera\/.+Opera Mobi.+Version\/(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Opera\/(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+).+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Edge\/(16(?:\.0)?|16(?:\.([1-9]|\d{2,}))?|(1[7-9]|[2-9]\d|\d{3,})(?:\.\d+)?))|(HeadlessChrome((?:\/49\.0\.\d+)?|(?:\/49\.([1-9]|\d{2,})\.\d+)?|(?:\/([5-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/55\.0\.\d+)?|(?:\/55\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[6-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/57\.0\.\d+)?|(?:\/57\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[8-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/60\.0\.\d+)?|(?:\/60\.([1-9]|\d{2,})\.\d+)?|(?:\/(6[1-9]|[7-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/63\.0\.\d+)?|(?:\/63\.([1-9]|\d{2,})\.\d+)?|(?:\/(6[4-9]|[7-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(49\.0|49\.([1-9]|\d{2,})|([5-9]\d|\d{3,})\.\d+|55\.0|55\.([1-9]|\d{2,})|(5[6-9]|[6-9]\d|\d{3,})\.\d+|57\.0|57\.([1-9]|\d{2,})|(5[8-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(11\.1|11\.([2-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)?.*Safari\/)|(Trident\/7\.0)|(Firefox\/(52\.0|52\.([1-9]|\d{2,})|(5[3-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+|66\.0|66\.([1-9]|\d{2,})|(6[7-9]|[7-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(52\.0|52\.([1-9]|\d{2,})|(5[3-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+|66\.0|66\.([1-9]|\d{2,})|(6[7-9]|[7-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)|(([MS]?IE) (11\.0|11\.([1-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+))/
//   }
//   var mobileRegex = /Bada|ipad|ipod|windows phone|iphone|samsung|backberry|android|ios|mobile/i
//   var botRegex =
//     /^.*(\+https:\/\/developers.google.com\/\+\/web\/snippet\/|ad\smonitoring|adsbot|apex|applebot|archive.org_bot|baiduspider|bingbot|chromeheadless|cloudflare|cloudinary|crawler|curl|discordbot|duckduckbot|embedly|exabot|facebookexternalhit|facebot|flipboard|google|googlebot|gsa-crawler|gurujibot|guzzlehttp|heritrix|ia_archiver|insights|linkedinbot|ltx71|mediapartners|msnbot|odklbot|phantom\.js|phantomjs|pingdom|pinterest|python|rtlnieuws|skypeuripreview|slackbot|slurp|spbot|telegrambot|test\scertificate|testing|tiabot|tumblr |twitterbot|vkshare|web\sscraper|wget|yandexbot|whatsapp|orangebot|smtbot|qwantify|mj12bot|ahrefsbot|seznambot|panscient.com|duckduckgo-favicons-bot|uptimerobot|semrushbot).*$/

//   // console.log(headers)
//   // console.log(request)
//   function getBrowser (r) {
//     var ua = r['User-Agent'] || (r['user-agent'] && r['user-agent'].value)
//     switch (true) {
//       case browsers.Chrome.test(ua):
//         return 'Chrome'
//       case browsers.Safari.test(ua):
//         return 'Safari'
//       case browsers.UC.test(ua):
//         return 'UCBrowser'
//       default:
//         return 'unknown'
//     }
//   }
//   const buckets = [0.1, 0.1, 0.1, 0.2, 0.5]
//   const bucketNames = ['a-10', 'b-10', 'c-10', 'd-20', 'e-50']
//   function getExperiment (r) {
//     var oldCookie = cookies.bucket ? Number(cookies.bucket) : undefined
//     if (oldCookie !== undefined && !isNaN(oldCookie)) {
//       return oldCookie
//     }
//     var val = Math.random()
//     var counter = 0
//     for (var i = 0; i < buckets.length; i++) {
//       var bucketval = buckets[i]
//       var valid = val >= counter && val < (bucketval + counter)
//       counter = counter + bucketval
//       if (valid) {
//         return i
//       }
//     }
//   }
  
//   function getEnv (r) {
//     var ua = r['User-Agent']
//     switch (true) {
//       case env.modern.test(ua):
//         return 'modern'
//       case env.average.test(ua):
//         return 'average'
//       case env.legacy.test(ua):
//         return 'legacy'
//       default:
//         return 'average'
//     }
//   }
//   function getMobile (r) {
//     var ua = r['User-Agent']
//     return mobileRegex.test(ua) ? 'mobile' : 'desktop'
//   }
//   function getBot (r) {
//     return botRegex.test(r['User-Agent'].toLowerCase()) ? 'bot' : 'user'
//   }
  
//   function getFilterKey (service, category) {
//     return ['paying_guest', 'commercial'].indexOf(category) >= 0 ? category : service
//   }
//   var urlMap = {
//     buy: '/in/buy/real-estate-',
//     rent: '/rent/property-for-rent-in-',
//     paying_guest: '/paying-guests/pgs-in-'
//   }
//   var keys = [
//     'utm_source', 'utm_term', 'utm_campaign', 'utm_medium', 'utm_content', 'mktg', 'fbclid', 'gclid'
//   ]
//   // function cleanArgs (args, hasArgs) {
//   //   if (!args) {
//   //     return ''
//   //   }
//   //   var str = args
//   //   keys.forEach(function (key) {
//   //     var match = str.match(new RegExp('(.*)(?:&|^)' + key + '=[^&]*(.*)'))
//   //     if (match) {
//   //       str = (match[1] || '') + (match[2] || '')
//   //     }
//   //   })
//   //   var match2 = str.match(/^&(.*)/)
//   //   if (match2) {
//   //     str = match2[1]
//   //   }
//   //   if (hasArgs) {
//   //     str = hasArgs + str
//   //   }
//   //   if (str.match(/^\?$/)) {
//   //     str = ''
//   //   }
//   //   return str
//   // }
  
//   function getCacheKey(r) {
//     let mobile = getMobile(r)
//     let bot = getBot(r)
//     // let query = cleanArgs(event.queryStringParameters, queryStringParameters)
//     let experiment = getExperiment(cookies.experiment && cookies.experiment.bucket)
//     if (uri == '/') {
//       let service = cookie.service || 'buy'
//       let category = cookie.category || 'residential'
//       let city =  cookie.cityUrl || 'new_delhi' // api calls
//       let product = getFilterKey(service, category)
//       uri = urlMap[product] + city
//     }
//     // uri = uri +query 
//     if (bot === 'bot') {
//       return 'bot-' + mobile + '-'
//     }
//     let env = getEnv(r)
//     let browser = getBrowser(r)
//     return 'user-' + mobile + '-' + env + '-' + bucketNames[experiment] + '-' + browser
//   }
//   let cacheKey = getCacheKey(headers)
//   console.log('cacheKey: ', cacheKey)
//   headers['x-cache-key'] = [{key: 'x-cache-key', value: cacheKey}]
//   if (request.uri) {
//     request.uri = uri
//   }
//   done(null, {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'done'
//     })
//   })

// }

// exports.handler = async (event, context, callback) => {
//     const request = event.Records[0].cf.request;
//     const response = event.Records[0].cf.response;
//     const headers = response.headers;
//     headers['x-test'] = [{key: 'x-test', value: 'test2'}];
//     callback(null, response);
//     // const headers = request.headers;
//     // if(headers['accept-encoding'] && headers['accept-encoding'][0].value.indexOf('br') > -1) {
//     //     console.log('added brotli header')
//     //     headers['x-compression'] = [{
//     //       key: 'X-Compression',
//     //       value: 'br'
//     //     }];
//     // }
//     // return request
// };


const AWS = require('aws-sdk')

const parseCookie = (cookie) => cookie && cookie.split(/; */).reduce((obj, str) => {
  if (str === '') return obj
  const eq = str.indexOf('=')
  const key = eq > 0 ? str.slice(0, eq) : str
  let val = eq > 0 ? str.slice(eq + 1) : null
  if (val != null) try { val = decodeURIComponent(val) } catch (ex) { /* pass */ }
  obj[key] = val
  return obj
}, {})
var browsers = {
  Chrome: /chromium|chrome|crios/i,
  Safari: /safari/i,
  UC: /UCBrowser/i
}

var env = {
  modern: /(HeadlessChrome((?:\/73\.0\.\d+)?|(?:\/73\.([1-9]|\d{2,})\.\d+)?|(?:\/(7[4-9]|[8-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(73\.0|73\.([1-9]|\d{2,})|(7[4-9]|[8-9]\d|\d{3,})\.\d+)(?:\.\d+)?)|(Firefox\/(71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(71\.0|71\.([1-9]|\d{2,})|(7[2-9]|[8-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/,
  average: /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(10[_\.]0|10[_\.]([1-9]|\d{2,})|10[_\.]2|10[_\.]([3-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})[_\.]\d+|11[_\.]0|11[_\.]([1-9]|\d{2,})|11[_\.]2|11[_\.]([3-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})[_\.]\d+|12[_\.]0|12[_\.]([1-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(CFNetwork\/808\.(\d))|(CFNetwork\/8.* Darwin\/16\.5\.\d+)|(CFNetwork\/8.* Darwin\/16\.6\.\d+)|(CFNetwork\/8.* Darwin\/16\.7\.\d+)|(CFNetwork\/8.* Darwin\/16\.\d+)|(CFNetwork\/8.* Darwin\/17\.0\.\d+)|(CFNetwork\/8.* Darwin\/17\.2\.\d+)|(CFNetwork\/8.* Darwin\/17\.3\.\d+)|(CFNetwork\/8.* Darwin\/17\.\d+)|(Edge\/(17(?:\.0)?|17(?:\.([1-9]|\d{2,}))?|(1[8-9]|[2-9]\d|\d{3,})(?:\.\d+)?))|(HeadlessChrome((?:\/51\.0\.\d+)?|(?:\/51\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[2-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(51\.0|51\.([1-9]|\d{2,})|(5[2-9]|[6-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(11\.1|11\.([2-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)?.*Safari\/)|(Firefox\/(63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)/,
  legacy: /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(9[_\.]0|9[_\.]([1-9]|\d{2,})|9[_\.]2|9[_\.]([3-9]|\d{2,})|([1-9]\d|\d{3,})[_\.]\d+|10[_\.]0|10[_\.]([1-9]|\d{2,})|10[_\.]2|10[_\.]([3-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})[_\.]\d+|11[_\.]0|11[_\.]([1-9]|\d{2,})|11[_\.]2|11[_\.]([3-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})[_\.]\d+|12[_\.]0|12[_\.]([1-9]|\d{2,})|12[_\.]4|12[_\.]([5-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})[_\.]\d+|13[_\.]0|13[_\.]([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})[_\.]\d+)(?:[_\.]\d+)?)|(CFNetwork\/758\.(\d))|(CFNetwork\/808\.(\d))|(CFNetwork\/7.* Darwin\/15\.\d+)|(CFNetwork\/8.* Darwin\/16\.5\.\d+)|(CFNetwork\/8.* Darwin\/16\.6\.\d+)|(CFNetwork\/8.* Darwin\/16\.7\.\d+)|(CFNetwork\/8.* Darwin\/16\.\d+)|(CFNetwork\/8.* Darwin\/17\.0\.\d+)|(CFNetwork\/8.* Darwin\/17\.2\.\d+)|(CFNetwork\/8.* Darwin\/17\.3\.\d+)|(CFNetwork\/8.* Darwin\/17\.\d+)|(Opera\/.+Opera Mobi.+Version\/(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Opera\/(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+).+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)(10\.0|10\.([1-9]|\d{2,})|(1[1-9]|[2-9]\d|\d{3,})\.\d+|11\.1|11\.([2-9]|\d{2,})|11\.5|11\.([6-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|46\.0|46\.([1-9]|\d{2,})|(4[7-9]|[5-9]\d|\d{3,})\.\d+))|(Edge\/(16(?:\.0)?|16(?:\.([1-9]|\d{2,}))?|(1[7-9]|[2-9]\d|\d{3,})(?:\.\d+)?))|(HeadlessChrome((?:\/49\.0\.\d+)?|(?:\/49\.([1-9]|\d{2,})\.\d+)?|(?:\/([5-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/55\.0\.\d+)?|(?:\/55\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[6-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/57\.0\.\d+)?|(?:\/57\.([1-9]|\d{2,})\.\d+)?|(?:\/(5[8-9]|[6-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/60\.0\.\d+)?|(?:\/60\.([1-9]|\d{2,})\.\d+)?|(?:\/(6[1-9]|[7-9]\d|\d{3,})\.\d+\.\d+)?|(?:\/63\.0\.\d+)?|(?:\/63\.([1-9]|\d{2,})\.\d+)?|(?:\/(6[4-9]|[7-9]\d|\d{3,})\.\d+\.\d+)?))|((Chromium|Chrome)\/(49\.0|49\.([1-9]|\d{2,})|([5-9]\d|\d{3,})\.\d+|55\.0|55\.([1-9]|\d{2,})|(5[6-9]|[6-9]\d|\d{3,})\.\d+|57\.0|57\.([1-9]|\d{2,})|(5[8-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+)(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(11\.1|11\.([2-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+|12\.0|12\.([1-9]|\d{2,})|(1[3-9]|[2-9]\d|\d{3,})\.\d+|13\.0|13\.([1-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)(?:\.\d+)?.*Safari\/)|(Trident\/7\.0)|(Firefox\/(52\.0|52\.([1-9]|\d{2,})|(5[3-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+|66\.0|66\.([1-9]|\d{2,})|(6[7-9]|[7-9]\d|\d{3,})\.\d+)\.\d+)|(Firefox\/(52\.0|52\.([1-9]|\d{2,})|(5[3-9]|[6-9]\d|\d{3,})\.\d+|60\.0|60\.([1-9]|\d{2,})|(6[1-9]|[7-9]\d|\d{3,})\.\d+|63\.0|63\.([1-9]|\d{2,})|(6[4-9]|[7-9]\d|\d{3,})\.\d+|66\.0|66\.([1-9]|\d{2,})|(6[7-9]|[7-9]\d|\d{3,})\.\d+)(pre|[ab]\d+[a-z]*)?)|(([MS]?IE) (11\.0|11\.([1-9]|\d{2,})|(1[2-9]|[2-9]\d|\d{3,})\.\d+))/
}
var mobileRegex = /Bada|ipad|ipod|windows phone|iphone|samsung|backberry|android|ios|mobile/i
var botRegex =
  /^.*(\+https:\/\/developers.google.com\/\+\/web\/snippet\/|ad\smonitoring|adsbot|apex|applebot|archive.org_bot|baiduspider|bingbot|chromeheadless|cloudflare|cloudinary|crawler|curl|discordbot|duckduckbot|embedly|exabot|facebookexternalhit|facebot|flipboard|google|googlebot|gsa-crawler|gurujibot|guzzlehttp|heritrix|ia_archiver|insights|linkedinbot|ltx71|mediapartners|msnbot|odklbot|phantom\.js|phantomjs|pingdom|pinterest|python|rtlnieuws|skypeuripreview|slackbot|slurp|spbot|telegrambot|test\scertificate|testing|tiabot|tumblr |twitterbot|vkshare|web\sscraper|wget|yandexbot|whatsapp|orangebot|smtbot|qwantify|mj12bot|ahrefsbot|seznambot|panscient.com|duckduckgo-favicons-bot|uptimerobot|semrushbot).*$/

function getBrowser (r) {
  var ua = r['User-Agent'] || (r['user-agent'] && r['user-agent'].value)
  switch (true) {
    case browsers.Chrome.test(ua):
      return 'Chrome'
    case browsers.Safari.test(ua):
      return 'Safari'
    case browsers.UC.test(ua):
      return 'UCBrowser'
    default:
      return 'unknown'
  }
}
const buckets = [0.1, 0.1, 0.1, 0.2, 0.5]
const bucketNames = ['a-10', 'b-10', 'c-10', 'd-20', 'e-50']
function getExperiment (r, cookies) {
  var oldCookie = cookies.bucket ? Number(cookies.bucket) : undefined
  if (oldCookie !== undefined && !isNaN(oldCookie)) {
    return oldCookie
  }
  var val = Math.random()
  var counter = 0
  for (var i = 0; i < buckets.length; i++) {
    var bucketval = buckets[i]
    var valid = val >= counter && val < (bucketval + counter)
    counter = counter + bucketval
    if (valid) {
      return i
    }
  }
}

function getEnv (r) {
  var ua = r['User-Agent']
  switch (true) {
    case env.modern.test(ua):
      return 'modern'
    case env.average.test(ua):
      return 'average'
    case env.legacy.test(ua):
      return 'legacy'
    default:
      return 'average'
  }
}
function getMobile (r) {
  var ua = r['User-Agent']
  return mobileRegex.test(ua) ? 'mobile' : 'desktop'
}
function getBot (r) {
  return botRegex.test(r['User-Agent'].toLowerCase()) ? 'bot' : 'user'
}

function getFilterKey (service, category) {
  return ['paying_guest', 'commercial'].indexOf(category) >= 0 ? category : service
}
var urlMap = {
  buy: '/in/buy/real-estate-',
  rent: '/rent/property-for-rent-in-',
  paying_guest: '/paying-guests/pgs-in-'
}
var keys = [
  'utm_source', 'utm_term', 'utm_campaign', 'utm_medium', 'utm_content', 'mktg', 'fbclid', 'gclid'
]
function getCacheKey (r, cookies, uri) {
  let mobile = getMobile(r)
  let bot = getBot(r)
  // let query = cleanArgs(event.queryStringParameters, queryStringParameters)
  let experiment = getExperiment(cookies.experiment && cookies.experiment.bucket, cookies)
  if (uri === '/') {
    let service = cookies.service || 'buy'
    let category = cookies.category || 'residential'
    let city = cookies.cityUrl || 'new_delhi' // api calls
    let product = getFilterKey(service, category)
    uri = urlMap[product] + city
  }
  // uri = uri +query
  if (bot === 'bot') {
    return 'bot-' + mobile + '-'
  }
  let env = getEnv(r)
  let browser = getBrowser(r)
  return { cacheKey: 'user-' + mobile + '-' + env + '-' + bucketNames[experiment] + '-' + browser, uri }
}
exports.handler = (event, ctx, done) => {
  const { Records: [ { cf: { request = {} } = {} } = {} ] = [] } = event
  let uri = (request && request.uri) || ''
  console.log('event: ', event, '\n\n\n', 'context: ', ctx)

  const headers = event.headers || request.headers
  const cookies = parseCookie(headers.Cookie) || {}

  let { cacheKey, uri: newUri } = getCacheKey(headers, cookies, uri)
  console.log('cacheKey: ', cacheKey)
  headers['x-cache-key'] = [{ key: 'x-cache-key', value: cacheKey }]
  if (newUri) {
    request.uri = newUri
  }
  done(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: event,
      cacheKey,
      newUri
    })
  })
}