import AsyncStorage from '@react-native-community/async-storage';

import MemCache from '../utils/memCache';

const API_URL = 'https://small-project-api.herokuapp.com/';

//max, min or none
const LOG_LEVEL = 'max';

const TEN_MINUTES = 1000 * 60 * 10;

class Ajax {
   headers() {
      return {
         'Content-Type': 'application/json',
         'x-access-token': MemCache.jwt,
      };
   }

   get(uri) {
      return this._fetch(uri, null, 'get');
   }

   post(uri, payload) {
      return this._fetch(uri, payload, 'post');
   }

   delete(uri, payload) {
      return this._fetch(uri, payload, 'delete');
   }

   patch(uri, payload) {
      return this._fetch(uri, payload, 'patch');
   }

   put(uri, payload) {
      return this._fetch(uri, payload, 'put');
   }

   _fetch(uri, payload, method) {
      const promise = new Promise((resolve, reject) => {
         // const data = new FormData();
         // if (payload)
         //    Object.keys(payload).forEach((key) => {
         //       data.append(key, payload[key]);
         //    });

         const headers = this.headers();

         const url = API_URL + uri;
         this.logRequest(method, url, headers, payload);

         const requestTime = new Date().getTime();
         if (!MemCache.token_timestamp || requestTime - MemCache.token_timestamp >= TEN_MINUTES) {
            MemCache.token_timestamp = requestTime;
            this.post('access-tokens/refresh', {
               refresh_token: MemCache.refresh_token,
            })
               .then((jwtData) => {
                  AsyncStorage.setItem('jwt', jwtData.jwt);
                  MemCache.jwt = jwtData.jwt;
                  headers['x-access-token'] = jwtData.jwt;
                  this.executeRequest(method, url, headers, payload, resolve, reject);
               })
               .catch(() => {});
         } else {
            this.executeRequest(method, url, headers, payload, resolve, reject);
         }
      });
      return promise;
   }

   executeRequest(method, url, headers, payload, resolve, reject) {
      let options = {
         method,
         headers,
      };

      if (method !== 'get') {
         options = { ...options, body: JSON.stringify(payload) };
      }

      fetch(url, options).then((resp) => {
         resp
            .text()
            .then((res) => {
               this.logResponse(method, url, headers, payload, res, '');
               try {
                  const response = JSON.parse(res);
                  if (response?.reason) {
                     reject(response.reason);
                     MemCache.alert.alertWithType('error', 'Authorization Error', response.reason);
                  } else {
                     resolve(response);
                  }
               } catch (_) {
                  resolve(res);
               }
            })
            .catch((error) => {
               MemCache.alert.alertWithType('error', 'Error', error);
               this.logResponse(method, url, headers, payload, error);
               reject(error);
            });
      });
   }

   static getParams(payload, request) {
      return payload
         ? '\n' + (request ? '>>>>>' : '<<<<<') + ' Body Param: ' + JSON.stringify(payload)
         : '';
   }

   logRequest(method, url, headers, payload = '') {
      if (LOG_LEVEL === 'max' || LOG_LEVEL === 'min')
         console.log(
            '>>>>>>>>>>>>>>>>\n' +
               '>>>>> Headers: ' +
               JSON.stringify(headers) +
               '\n' +
               '>>>>> ' +
               method +
               ' ' +
               url +
               Ajax.getParams(payload, true) +
               '\n' +
               '>>>>>>>>>>>>>>>>'
         );
   }

   logResponse(method, url, headers, payload = '', response) {
      if (LOG_LEVEL === 'max' || LOG_LEVEL === 'min')
         console.log(
            '<<<<<<<<<<<<<<<<\n' +
               '<<<<< Headers: ' +
               JSON.stringify(headers) +
               '\n' +
               '<<<<< ' +
               method +
               ' ' +
               url +
               Ajax.getParams(payload, false) +
               '\n' +
               (LOG_LEVEL === 'max' ? '<<<<< ' + response + '\n' : '') +
               '<<<<<<<<<<<<<<<<'
         );
   }
}

export default new Ajax();
