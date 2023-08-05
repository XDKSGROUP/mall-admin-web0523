export default {
  isDev: process.env.NODE_ENV == "development",
  //请求Api基础网址
  baseApiUrl: process.env.BASE_API.replace(/\/$/, ""),
  apiHttps : /^https/.test(process.env.BASE_API),
}
