## Amazon Book Search SE OpenShift

This allows you to find books on amazon through their Product Advertising API. 
It is a simplified version of amazon-book-search (does not provide express middleware interface). 
This version does not humanize the results and returns them in original Amazon format. Works
well searching by ISBN as well as keywords. This version uses an older version of apac so that
it supports the openshift node.js version. Because of this it does not automatically throttle,
so you will have to do that manually if required.

### Install

     $ npm install amazon-book-search-se-openshift

### Requirements
    You will need an Amazon API key, secret and associate ID to use this service. For more information,
    look at the Amazon Product Advertising API documentation.

### Usage 

    var amazonBookSearchSE = require('amazon-book-search-se-openshift');
    var absse =  new amazonBookSearchSE({ awsKey: "YOUR KEY", awsSecret: "YOUR SECRET", assocId: "YOUR ASSOCIATE TAG" });

    // search by ISBN
    absse.search('9781413027570', function(error, result){
        if(error){
            console.log(error);
        } else {
            console.log(result);
        }
    });

    // search by title - first page of 10 results
    absse.search('catcher in the rye', function(error, result){
        if(error){
            console.log(error);
        } else {
            console.log(result);
        }
    }, 1);

    // search by title - second page of 10 results
    absse.search('catcher in the rye', function(error, result){
        if(error){
            console.log(error);
        } else {
            console.log(result);
        }
    }, 2);

There is a maximum of 10 pages returned by Amazon so only 100 products will be displayed.
