//Api Methods
// const POST = 'POST';
const GET = 'GET';
const HEADER = {
  'Content-Type': 'application/json',
};

const BASE_URL = 'https://api.jsonbin.io/b/';

const webService = {
  fetchFoodList: BASE_URL + '5f2c36626f8e4e3faf2cb42e',
};

const getCall = (Api, success, faliure) => {
  console.log(Api);
  return fetch(Api, {
    method: GET,
    headers: HEADER,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return success(responseJson);
    })
    .catch((error) => {
      console.log(error);
      return faliure(error);
    });
};

// const getAllApprovedFoodList = (id) => {
//   return fetch(api.profileDetail + id, {
//     method: GET,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + global.accessToken,
//     },
//   })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson;
//     })
//     .catch((error) => {
//       console.log(error);
//       return '';
//     });
// };

// Generator Functions Calling Api
// function* getAllApprovedFoodList(jsonObj) {
//   const response = yield fetch(api.fetchFoodList, {
//     method: POST,
//     body: jsonObj,
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + global.accessToken,
//     },
//   });
//   console.log(response);
//   const responseJson = yield response.status === 200
//     ? JSON.parse(response._bodyInit)
//     : [];
//   console.log(responseJson);
//   return responseJson;
// }

export default {
  webService,
  getCall,
};
