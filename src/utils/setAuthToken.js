import React from "react";
import apiClient from "./api-client";

//axios의 헤더에 토큰을 추가한다.
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete apiClient.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
