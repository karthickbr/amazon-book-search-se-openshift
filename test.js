var amazonBookSearchSEOpenShift = require('./amazon-book-search-se-openshift');
var absse =  new amazonBookSearchSEOpenShift({ awsKey: "KEY", awsSecret: "SECRET", assocId: "ASSOCID" });

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