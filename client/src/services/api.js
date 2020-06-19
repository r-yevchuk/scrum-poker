import axios from 'axios';

class Api {
  constructor() {
      this.apiUrl = 'http://localhost:8080/api/';
  }

  post(endpoint, data) {
    return axios.post(this.getApiEndpoint(endpoint), data)
      .then((response) => {
        return { error: null, data: response.data, status: response.status };
      })
      .catch((error) => {
        return { error: error.response };
      });
  }

  get(endpoint) {
    return axios.get(this.getApiEndpoint(endpoint))
      .then((response) => {
        return { error: null, data: response.data, status: response.status};
      })
      .catch((error) => {
        return { error: error};
      });
  }

  getApiEndpoint(endpoint) {
    if (this.apiUrl.endsWith('/') && endpoint.startsWith('/')) {
      return `${this.apiUrl.slice(0, -1)}${endpoint}`;
    }
    if (!this.apiUrl.endsWith('/') && !endpoint.startsWith('/')) {
      return `${this.apiUrl}/${endpoint}`;
    }
    return `${this.apiUrl}${endpoint}`;
  }
}

export default new Api();
