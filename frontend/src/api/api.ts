
import axios from "axios"
import { Component } from "react";


export default class Map4API {

  private baseURL: string

  constructor(url: string = 'http://localhost:30001') {
    this.baseURL = url;
  }

  getBaseURL() {
    return this.baseURL;
  }

  setBaseURL(val: string) {
    this.baseURL = val;
  }

  async get({
    url = "",
    params = {},
  }) {
    // return axios.get(this.baseURL + url);
    return axios(
      {
        url: url,
        method: 'get',
        baseURL: this.baseURL,
        params: params,
      }
    );
  }

  async post({
    url = "",
    data = {},
    headers = { 'Content-Type': 'application/json' },
    params = {},
    formData = new FormData(),
    responseType = "json",
  }) {
    console.log("post data is : ", data);
    return axios(
      {
        url: url,
        method: 'post',
        baseURL: this.baseURL,
        // headers: {'X-Requested-With': 'XMLHttpRequest',
        //   'Content-Type': 'application/json'},
        headers: headers,
        params: params,
        data: data,
        //formData: formData,
        timeout: 0, // default is `0` (no timeout)
        //responseType: responseType,
        //responseEncoding: 'utf8',
        maxContentLength: 2000, // default, bytes
      }
    );
  }

  async postComponent(cmp: Component, uid: string, appId: string, pageId: string, cmpId: string) {
    const res = await this.post({
      url: `/components/${uid}/${appId}/${pageId}/${cmpId}`,
    });
    return res
  }
}