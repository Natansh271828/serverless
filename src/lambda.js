const https = require('https')
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
const parseCookie = (cookie) => cookie.split(/; */).reduce((obj, str) => {
  if (str === '') return obj
  const eq = str.indexOf('=')
  const key = eq > 0 ? str.slice(0, eq) : str
  let val = eq > 0 ? str.slice(eq + 1) : null
  if (val != null) try { val = decodeURIComponent(val) } catch (ex) { /* pass */ }
  obj[key] = val
  return obj
}, {})
function getEnv (ua) {
  switch (true) {
    case env.modern.test(ua):
      return 'm'
    case env.average.test(ua):
      return 'a'
    case env.legacy.test(ua):
      return 'l'
    default:
      return 'a'
  }
}
function getMobile (ua) {
  return mobileRegex.test(ua) ? 'mobile' : 'desktop'
}
function getBot (ua) {
  return botRegex.test(ua.toLowerCase()) ? 'bot' : 'user'
}
const buckets = [0.1, 0.1, 0.1, 0.2, 0.5]
const bucketNames = ['a-10', 'b-10', 'c-10', 'd-20', 'e-50']
function getExperiment (cookies) {
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

function cleanArgs (args, hasArgs) {
  if (!args) {
    return ''
  }
  var str = args
  keys.forEach(function (key) {
    var match = str.match(new RegExp('(.*)(?:&|^)' + key + '=[^&]*(.*)'))
    if (match) {
      str = (match[1] || '') + (match[2] || '')
    }
  })
  var match2 = str.match(/^&(.*)/)
  if (match2) {
    str = match2[1]
  }
  if (hasArgs) {
    str = hasArgs + str
  }
  if (str.match(/^\?$/)) {
    str = ''
  }
  return str
}

async function getCacheKey ({uri, ua, cookies, ip, request}) {
  let mobile = getMobile(ua)
  let bot = getBot(ua)
  let query = cleanArgs(request.querystring, request.querystring)
  let experiment = getExperiment(cookies)
  if (['/rent', '/', '/in/buy'].indexOf(uri) >= 0) {
    let service = cookies.service || 'buy'
    let category = cookies.category || 'residential'
    let city = cookies.cityUrl || await getCityName(ip) || 'new_delhi' // api calls
    let product = getFilterKey(service, category)
    uri = urlMap[product] + city
  }
  request.uri = uri + query
  if (bot === 'bot') {
    return 'bot-' + mobile + '-'
  }
  let env = getEnv(ua)
  return { cacheKey: 'user-' + mobile + '-' + env + '-' + bucketNames[experiment], uri }
}

const getCityName = (ip) => {
  const url = `https://regions.housing.com/api/v1/location/mylocation?ip=${ip}`;

  const cityPromise = new Promise((resolve) => {
    let request = https.request(url, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        const { city: { url_name: name } = {}} = body
        resolve(name)
      });
    });
    request.on('timeout', () => {
      resolve()
    })
    request.on('error', (e) => {
      resolve()
    });
    request.end();
  })

  return cityPromise

}

exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    const clientIp = event.Records[0].cf.clientIp;
    const headers = request.headers;
    let ua = 'test'
    let cookie = 'test=1'
    try {
      cookie = parseCookie(['cookie'][0].value)
      ua = headers['user-agent'][0].value;
    } catch (e) {}
    const cookies = parseCookie(cookie)
    const experiment = getExperiment(cookies)
    const {cacheKey, uri} = await getCacheKey({ uri: request.uri, ua, cookies, ip: clientIp, request})
    headers['x-uri'] = [{key: 'x-uri', value: uri}];
    headers['x-cacheKey'] = [{key: 'x-cacheKey', value: cacheKey }];
    callback(null, request);
};



// function getBrowser (r) {
//   var ua = r['User-Agent'] || (r['user-agent'] && r['user-agent'].value)
//   switch (true) {
//     case browsers.Chrome.test(ua):
//       return 'Chrome'
//     case browsers.Safari.test(ua):
//       return 'Safari'
//     case browsers.UC.test(ua):
//       return 'UCBrowser'
//     default:
//       return 'unknown'
//   }
// }


// exports.handler = (event, ctx, done) => {
//   const request = event.Records[0].cf.request;
//   // let uri = (request && request.uri) || '';
//   done(null, {
//     statusCode: 200,
//     body: {
//         status: '200',
//         body: 'test1',
//     }
//   });
//   // const headers = event.headers || request.headers
//   // const cookies = parseCookie(headers.Cookie)

//   // let { cacheKey, uri: newUri } = getCacheKey(headers, cookies, uri)
//   // console.log('cacheKey: ', cacheKey)
//   // headers['x-cache-key'] = [{ key: 'x-cache-key', value: cacheKey }]
//   // if (newUri) {
//   //   request.uri = newUri
//   // }
//   // done(null, {
//   //   statusCode: 200,
//   //   body: JSON.stringify({
//   //     message: event,
//   //     cacheKey,
//   //     newUri
//   //   })
//   // })
// }