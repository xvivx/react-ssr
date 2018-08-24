
const serial = (params) => {
    let str = '';
    Object.keys(params).forEach((key) => {
        str += `${ key }=${ params[key] }&`;
    });
    return str.slice(0, -1);
};

export const Fetch = function () {
    const defaultOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    
    return function Fetch (url, params, options) {
        const request = Object.assign({}, defaultOptions, options);

        if(request.method === 'POST') {
            request.body = JSON.stringify(params);
        } else {
            url += '?' + serial(params);
        }

        return fetch(url, request).then(res => res.json());
    }
}();