import axios from 'axios';
import { BASE_URL } from 'env';

const API_URL = BASE_URL + 'api/';

//max, min or none
const LOG_LEVEL = 'max';

class Ajax {
   headers() {
      return {
         'Content-Type': 'application/json',
      };
   }

   get(uri) {
      //TODO: Improve with automatic query payload
      return this._fetch(uri, null, 'get');
   }

   post(uri, payload, files, onUploadProgress, formData) {
      return this._fetch(uri, payload, 'post', files, onUploadProgress, formData);
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

   _fetch(uri, payload, method, files, onUploadProgress, formData) {
      const promise = new Promise((resolve, reject) => {
         let data = new FormData();
         if (payload)
            Object.keys(payload).forEach((key) => {
               data.append(key, payload[key]);
            });

         if (files)
            Object.keys(files).forEach((key) => {
               data.append(key, files[key]);
            });

         if (formData) data = formData;
         const headers = this.headers();

         const url = API_URL + uri;
         this.logRequest(method, url, headers, payload);
         axios({ method, url, headers, data, onUploadProgress })
            .then((response) => {
               if (response?.data?.error) {
                  //TODO show error
               }
               this.logResponse(
                  method,
                  url,
                  headers,
                  payload,
                  JSON.stringify(response.data),
                  response.status
               );
               resolve(response.data);
            })
            .catch((error) => {
               try {
                  //TODO: show error
               } catch {}
               this.logResponse(method, url, headers, payload, error);
               reject(error);
            });
      });
      return promise;
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
