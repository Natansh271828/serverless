const AWS = require('aws-sdk');


// define target API as service
const service = new AWS.Service({
 
    endpoint: 'https://jsonplaceholder.typicode.com/todos',
 
    convertResponseTypes: false,
 
    apiConfig: {
      metadata: {
          protocol: 'rest-json',
      },
      operations: {
        getData: {
          http: {
               method: 'GET',
               requestUri: '/1'
             },
          input: {
             type: 'structure',
             required: [ ]
           }
         }
      }
    }
});

service.isGlobalEndpoint = true;


  function getServiceData (done) {
    console.log('CAME HERE 1');
    service.getData({}, (err, data) => {
        console.log('CAME HERE')
            if (err) {
                console.error(':>> operation error:', err);
                done(null, {
                  msg: 'error'
                })
            }
            console.log('data:', data);
            done(null, {
              msg: 'end'
            })
        });
  }

const https = require('https')

const options = {
  hostname: 'https://jsonplaceholder.typicode.com/todos/1',
};



exports.handler = (event, x, done) => {
  const cfRequest = event.Records[0].cf.request;
  console.log('\n AWS SDK: ')
  console.log('INSIDE LAMBDA', JSON.stringify(https));
  // const url = new URL('https://jsonplaceholder.typicode.com/todos/1')
  const url =  `https://regions.housing.com/api/v1/location/mylocation?ip=${ip}`;

// const options = {
//   hostname: url,
//   timeout: 2000,
//   method: 'GET'
// }

let request = https.request(options, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body);
    done(null, {
      msg: 'done'
    });
  });
});

request.on('timeout', () => {
  console.log('TIMED OUT')
})
request.on('error', (e) => {
  console.error(e);
});
request.end();
  
  // getServiceData(done)
  // Return original request if no uri match
}
