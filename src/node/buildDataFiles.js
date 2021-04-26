const axios = require("axios");
const constants = require("./constants");
let cookie;

const instance = axios.create({
  headers: constants.headers,
  cookie: cookie ? cookie : "",
});

const getCookies = async () => {
  try {
    const response = await instance.get(constants.nseBaseURL);
    cookie = response.headers["set-cookie"].join(";");
    axios
      .get(constants.nseDataURL, {
        withCredentials: true,
        headers: {
          ...constants.headers,
          cookie: cookie,
        },
      })
      .then((res) => {
        console.log(res.data);
        cookie = res.headers["set-cookie"].join(";");
      });
  } catch (error) {
    //console.log("Error666666666666666666666", error);
    if (error.response.status === 403) {
      console.log("getCookies =========> error.status === 403");
      await getCookies();
    } else {
      console.log("getCookies =========> error", error);
    }
  }
};

getCookies();
