const _ = require('lodash');
function handleJSONResponse(json) {
    let body = json;
    const errors = json.errors;
    if (errors && _.isArray(errors)) {
        const errorsArr = _.reduce(errors,
            (result, err) => {
                result.push(err.msg);
                return result;
            }, []);
        body = { errors: errorsArr }
    }
    return body;
}

function handleResponse(res) {
    const status = res.status;
    return new Promise(function (resolve, _reject) {
        res.json()
            .then(json => {
                const body = handleJSONResponse(json);
                resolve(status, body);
            })
            .catch(err => {
                // there is no json body
                resolve(status, null)
            });
    })
}

function send(method, url, body) {
    // allowed methods: PUT, DELETE, POST
    // body is expected to be a json object
    console.log(method, url, body, typeof (body));
    return new Promise(function (resolve, _reject) {
        fetch(url,
            {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(handleResponse)
            .then((status, body) => {
                resolve(status, body);
            })
            .catch((err) => {
                resolve(503, "(Error Code 503): Unable to complete your send, please try again later. " + err);
            })
    })
}

module.exports = {
    send
}