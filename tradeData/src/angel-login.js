const axios = require('axios');

const data = JSON.stringify({
    "clientcode":"S221122",
    "password":"Sus_2129_agc",
	  "totp":"494856"
});

var config = {
  method: 'post',
  url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',

  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserType': 'USER',
    'X-SourceID': 'WEB',
    'X-ClientLocalIP': '127.0.0.1',
    'X-ClientPublicIP': '192.168.0.181',
    'X-MACAddress': '0C-9A-3C-E2-1D-92',
    'X-PrivateKey': 's0xdbAze'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
