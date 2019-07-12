# Server side http client
Requester is a server side http client, used to make api calls from your own or third party api's.
Requester is a **easy**, **lightweight**, **minimal** http client with **0 dependencies**.
you can use it in NodeJs applications.

# @robelberhe/requester

![npm (scoped)](https://img.shields.io/npm/v/v1.svg?label=http-requester&logo=requester)

(https://github.com/RobiBerhe/server-side-http-client)

## installation
```
npm install @robelberhe/requster
```

## Examples (http get requests)
here is an example which show how to send an http get request using **requester**

``` js
const requester = require('@robelberhe/requester');

requester.get("http://yoursite.com/api/endpoint")
          .then((res)=>{
              console.log("Data Retrieved...");
              console.log(res.body);
          }).catch((error)=>{
              console.log("There seems to be some problem accessing the resource");
              console.log(error.message);
              // you can also get whatever the server may have sent instead by accessing error.data.
              // console.log(error.data);
          });
```
## Examples (http post requests)
``` js
requester.post("http://yoursite.com/endpoint",{userID:1})
.then((res)=>{
   console.log(`status code: ${res.statusCode}`);
   console.log("Data : ");
   console.log(res.body);
}).catch((error)=>{
    console.log(error);
    // or error.data.
});




