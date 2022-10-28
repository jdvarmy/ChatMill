import * as qs from 'qs';

type DataReqType = any;
type ConfigType = { headers?: Record<string, string>; timeout?: number };

const baseConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
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

    xhr.open(method, url);

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = function () {
      resolve(xhr as R);
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = config?.timeout ?? 5000;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
};

const requests = {
  get: <R>(url: string, data?: DataReqType, cfg?: ConfigType) => {
    const queryUrl = data ? `${url}${qs.stringify(data, { addQueryPrefix: true })}` : url;

    return baseRequest<R>({ method: RequestMethod.get, url: queryUrl, ...cfg });
  },

  post: <R>(url: string, data?: DataReqType, cfg?: ConfigType) =>
    baseRequest<R>({ method: RequestMethod.post, url, data, ...cfg }),

  put: <R>(url: string, data?: DataReqType, cfg?: ConfigType) =>
    baseRequest<R>({ method: RequestMethod.put, url, data, ...cfg }),

  delete: <R>(url: string, cfg?: ConfigType) => baseRequest<R>({ method: RequestMethod.delete, url, ...cfg }),
};

export default requests;
