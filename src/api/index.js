import Axios from '../httpClient/request.js'

const post = (url, params, config) =>
  Axios.post(url, params, config)

const get = (url, params, config) =>
  Axios.post(url, { params }, config)

export { post, get }