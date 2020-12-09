import axios from "axios";
var urlPrefix = "http://seatingapi.azurewebsites.net/api/";

export async function get(subURL) {
  return axios
    .get(urlPrefix + subURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error " + error);
      return error;
    });
}

export async function post(subURL, data) {
  return axios
    .post(urlPrefix + subURL, data)
    .then((response) => {
      console.log(response, 'new')
      return response.data
    })
    .catch((error) => {
      console.log("error" + error);
      return error;
    });
}
// export async function get(payload) {
//   return axios
//     .get(urlPrefix + "/api/get", {
//       params: {},
//     })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("Error " + error);
//       return error;
//     });
// }
// export async function post(data) {
//   console.log("in create new message new convo");
//   return axios
//     .post(urlPrefix + "/api/", data)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("error" + error);
//       return error;
//     });
// }
export async function postQueryString(payload) {
  return axios
    .post(urlPrefix + "/api/", null, {
      params: {},
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}
