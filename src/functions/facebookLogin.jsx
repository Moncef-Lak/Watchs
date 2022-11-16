import axios from "axios";

export default function loginWithFacebook(access_token) {
  const myObj = new FormData();
  myObj.append("api_password", process.env.REACT_APP_API_PASSWORD);
  myObj.append("access_token", access_token);
  try {
    axios
      .post(process.env.REACT_APP_BASE_API_URL + "api/socialLogin", myObj, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        // if (data.data.status) {
        // }
        // else {
        // }
      });
  } catch (error) {
    console.log(error);
  }

  console.log(access_token);
}
