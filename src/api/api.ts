import * as qs from 'qs';

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

const baseRequest = <R>({ method, url, ...config }: { method: RequestMethod; url: string }): Promise<R> => {
  const { headers = baseConfig.headers, data } = config as typeof baseConfig & { data: any };

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

    xhr.timeout = 5000;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else {
      xhr.send(data);
    }
  });
};

const requests = {
  get: <R>(url: string, data?: object, cfg?: any) => {
    const queryUrl = data ? `${url}${qs.stringify(data, { addQueryPrefix: true })}` : url;

    return baseRequest<R>({ method: RequestMethod.get, url: queryUrl, ...cfg });
  },

  post: <R>(url: string, data?: any, cfg?: any) => baseRequest<R>({ method: RequestMethod.post, url, data, ...cfg }),

  put: <R>(url: string, data?: any, cfg?: any) => baseRequest<R>({ method: RequestMethod.put, url, data, ...cfg }),

  delete: <R>(url: string, cfg?: any) => baseRequest<R>({ method: RequestMethod.delete, url, ...cfg }),
};

export default requests;
