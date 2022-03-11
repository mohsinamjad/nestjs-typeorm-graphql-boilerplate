import axios, { AxiosInstance } from 'axios';
import { clone, isEmpty, isObject, isString } from 'lodash';

axios.defaults.baseURL = process.env.baseURL || '';
axios.defaults.timeout = 5000;

const stripTailingSlash = (url) => {
  return url.replace(/\/+$/g, '');
};

export default class Http {
  client: AxiosInstance;
  token: string;
  constructor({ baseUrl, apiUrl, timeout, token }) {
    this.client = axios.create({
      baseURL: stripTailingSlash(baseUrl) + stripTailingSlash(apiUrl),
      timeout,
    });
    this.token = token;
    this.client.interceptors.request.use(this.embedToken.bind(this));
    this.client.interceptors.response.use((response) => response);
  }

  embedToken(config) {
    config.headers.common['Authorization'] = this.token
      ? `${this.token}`
      : null;

    return config;
  }

  get(id = null, params = null) {
    if (!id) {
      throw new Error('Id is required parameter');
    }

    const path = id.toString();
    const options = params ? { params } : {};
    return this.client.get(path, options);
  }

  resolvePath(path, query, scope = null) {
    if (!isEmpty(query) && isObject(query)) {
      path += `?filter=${JSON.stringify(query)}`;
    }

    return path;
  }

  find(query, scope = null) {
    return this.client.get(this.resolvePath('list', query, scope));
  }

  create(param = null, data) {
    if (isObject(param)) {
      data = clone(param);
      param = null;
    } else if (!isObject(data)) {
      data = {};
    }

    return this.client.post(param, data);
  }

  update(id, data) {
    return this.client.put(id.toString(), data);
  }

  patch(id, data) {
    return this.client.patch(id.toString(), data);
  }

  destroy(id) {
    return this.client.delete(id.toString());
  }

  count(query) {
    return this.client.get(this.resolvePath('count', query));
  }

  upload(data) {
    return this.client.post(`upload`, data);
  }
}
