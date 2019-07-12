const http = require('http');
const path = require('path');
const urlM = require('url');

function request(requestOptions, data){
    return new Promise(function(resolve,reject){
        const request = http.request(requestOptions,(res)=>{
            let body = '';
            res.setEncoding('utf8');
            res.on('data',(d)=>{
                body +=d;
            })
            res.on('end',()=>{
                try {
                    if(res.statusCode === 200 || res.statusCode == 201 || res.statusCode == 202){
                        res.body = JSON.parse(body);
                        resolve(res);
                    }
                    else{
                        let error = new Error(`The server responded with status code: ${res.statusCode}`);
                        error.body = body;
                        reject(error);
                    }
                } catch (error) {
                    res.body = body;
                    console.log(error);
                    reject(error,res);
                }
            });
        });
        request.on('error',(error)=>{
            reject(error);
        });
        request.write(data);
        request.end();
    });
}


function post(url,data){
    const requestOptions = parseOptions(url,"POST");
    data = JSON.stringify(data);
    requestOptions.headers = getHeaders(data);
    return request(requestOptions,data);
}


function put(url,data){
    const requestOptions = parseOptions(url,"PUT");
    data = JSON.stringify(data);
    requestOptions.headers = getHeaders(data);
    return request(requestOptions,data);
}

function remove(url,data){
    const requestOptions = parseOptions(url,"DELETE");
    data = JSON.stringify(data);
    requestOptions.headers = getHeaders(data);
    return request(requestOptions,data);
}


function getHeaders(data){
    const headers = {
        'Content-Type':'application/json',
        'Content-Length':data.length,
    }
    return headers;
}

function parseOptions(url,method){
    const hostname = urlM.parse(url).hostname;
   const port = (urlM.parse(url).port === null ? getPortFromProtocol(urlM.parse(url).protocol):urlM.parse(url).port  );
    const path = urlM.parse(url).pathname;
    
    let requestOptions = {
        hostname:hostname,
        port:port,
        method:method,
        path:path,
    }
    return requestOptions;
}

function getPortFromProtocol(protocol){
    if(protocol === "https")
        return 443;
    else
        return 80;
}
function get(url){
    let body = '';
    const getRequestPromise = new Promise((resolve,reject)=>{
        const httpRequest = http.get(url,(response)=>{
            response.on('data',(data)=>{
                body +=data;
            });
            response.on('end',()=>{
                if(response.statusCode == 200){
                    response.body = JSON.parse(body);
                   resolve(response);
                }
                else{
                    let error = new Error(`The server responded with the status code: ${response.statusCode}`);
                    error.data = body;
                    reject(error);
                }
            });
        });
        httpRequest.on('error',(error)=>{
           reject(error);
        });    
    });
    return getRequestPromise;
}

module.exports.get = get;
module.exports.post = post;
module.exports.remove = remove;