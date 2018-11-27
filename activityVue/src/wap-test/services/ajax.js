import Vue from "vue";
import axios from "axios";
import Qs from "qs";
// import { Loading } from "element-ui";
// import  { LoadingPlugin } from 'vux'

let [isTest, href] = [null, window.document.location.href];
if (
  href.indexOf("192.168") > -1 ||
  href.indexOf("localhost") > -1 ||
  href.indexOf("test") > -1
) {
  isTest = true;
} else {
  isTest = false;
}

const url = isTest ? "//test.m.cheyuu.com/": "//m.cheyuu.com/";
window.url = url;
let ajax = function(option) {
  let { url, method, headers = null, data, success } = option;
  let config = {
    url,
    method
  };
  if (headers) {
    Object.assign(config, { headers });
  }
  method.toLowerCase() === "get" ? Object.assign(config, { params: data })
    : Object.assign(config, { data });
  if (method.toLowerCase() === "post") {
    config.data = Qs.stringify(config.data);
  }
  let promise = axios(config);
  // if (success && typeof success === "function") {
  //   promise.then(res => success(res));
  // }
  promise.then(res => success(res))
         .catch(error => {
           Vue.$vux.loading.hide()
          //  console.log(333,JSON.stringify(error))
         });
  return promise;
};
window.initAjax = initAjax;
let initAjax = method => {
  return ({ api, data, isLoading = true }, baseUrl) => {
  // return ({ api, data }, baseUrl) => {
    let innerUrl;
    let headers = localStorage.getItem("auth_token")
      ? { auth_token: localStorage.getItem("auth_token") }
      : null;
    if (baseUrl !== undefined) {
      innerUrl = baseUrl;
    } else {
      innerUrl = url;
    }
    if (isLoading) {
      Vue.$vux.loading.show({
        text: 'Loading'
      })
    }
    return ajax({
      url: innerUrl + api,
      method,
      headers,
      data,
      success: () => {
        Vue.$vux.loading.hide()
        console.log(response.headers);
      },
      error: () => {
        // Vue.$vux.loading.hide()
      }
    });
  };
};
export default initAjax;
