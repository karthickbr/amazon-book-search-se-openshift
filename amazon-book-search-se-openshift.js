// requires
var amazonSearchHelper = require('./lib/amazon-search-helper');

/********************************************************
 * Constructs a new amazon book search object.
 ********************************************************/
function amazonBookSearch(settings){
    if(!settings || !settings.awsKey || !settings.awsSecret || !settings.assocId){
        this.configured = false;
    } else {
        this.configured = true;
        // configure the amazon search helper
        this.amazonSearchHelper = new amazonSearchHelper(settings);
    }
}

/********************************************************
 * Search function that will call Amazon APAC API 
 * function via search helper.
 ********************************************************/
amazonBookSearch.prototype.search = function search(searchArguments, callback, page) {
    if(!this.configured){
      callback({ message: 'Service must be configured correctly before use.' }, null);
      return;
    }

    if(!searchArguments){
      callback({ message: 'Search arguments must be specified.' }, null);
      return;
    }
    
    // result handler callback
    this.resultHandler = function(error, result){
      if(error){
            return callback(error, null);
      };
      callback(null, result);
    };
    // call Amazon APAC API function via search helper
    this.amazonSearchHelper.query(searchArguments, this.resultHandler, page);
};

module.exports = amazonBookSearch;
