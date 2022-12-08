import * as qs from 'qs';

type DataReqType = any;
type ConfigType = { headers?: Record<string, string>; timeout?: number };
interface HTTPMethod {
  <R>(url: string, data?: DataReqType, config?: ConfigType): Promise<R>;
}

const baseUrl = 'https://ya-praktikum.tech/api/v2';
export const staticUrl = `${baseUrl}/resources`;
const baseConfig = {
  headers: {
    Accept: 'application/json',
  },
};
export const contentHeaderJson = {
  'Content-Type': 'application/json',
};

const enum RequestMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

const baseRequest = <R>({
  method,
  url,
  data,
  config,
}: {
  method: RequestMethod;
  url: string;
  data?: DataReqType;
  config?: ConfigType;
}): Promise<R> => {
  const headers = { ...baseConfig.headers, ...config?.headers };

  return new Promise(function (resolve, reject) {
    if (!method) {
      reject('No method');
      return;
    }

    const xhr = new XMLHttpRequest();
    const isGet = method === RequestMethod.get;

    xhr.open(method, baseUrl + '/' + url);

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.responseType = 'json';
    xhr.withCredentials = true;
    xhr.timeout = config?.timeout ?? 5000;

    xhr.onload = () => {
      if ([200, 201].includes(xhr.status)) {
        return resolve((xhr.response ?? true) as R);
      }
      return reject({ response: xhr.response, status: xhr.status });
    };
    xhr.onabort = reject;
    xhr.onerror = reject;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
};

const api: Record<RequestMethod, HTTPMethod> = {
  get: (url, data, config) => {
    const queryUrl = data ? `${url}${qs.stringify(data, { addQueryPrefix: true })}` : url;

    return baseRequest({ method: RequestMethod.get, url: queryUrl, config });
  },

  post: (url, data, config) => baseRequest({ method: RequestMethod.post, url, data, config }),

  put: (url, data, config) => baseRequest({ method: RequestMethod.put, url, data, config }),

  delete: (url, data, config) => baseRequest({ method: RequestMethod.delete, url, data, config }),
};

export default api;
