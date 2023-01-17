const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile',

  headers : {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlMyMjExMjIiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjY4OTY3NzM3LCJleHAiOjE3NTUzNjc3Mzd9.16sTn-JcxGKy9COvN1QE3K9EHk2bEdtNMthbOyKedQVuvu4TNJAy5TWZqQuf0zA9BDml4kKWWjnwfaj21BExtw',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': '127.0.0.1',
    'X-ClientPublicIP': '192.168.0.181',
    'X-MACAddress': '0C-9A-3C-E2-1D-92',
    'X-PrivateKey': 's0xdbAze'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
