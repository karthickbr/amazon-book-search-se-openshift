var apacOperationHelper = require('apac').OperationHelper;

function amazonSearchHelper(settings){
  this.apiClient = new apacOperationHelper({
    awsId: settings.awsKey,
    awsSecret: settings.awsSecret,
    assocId: settings.assocId,
    xml2jsOptions: { explicitArray: true }
  });
};

/**
 * [ Function to call Amazon API, provided by amazon]
 * @param  {[type]}   query    [search query]
 * @param  {Function} callback [callback in the form function(error, results){}]
 * @param  {Int}      page     [page number to retrieve]
 */
amazonSearchHelper.prototype.query = function query(searchArguments, callback, page){
    var query = {
        'SearchIndex': 'Books',
        'Keywords': searchArguments,
        'ResponseGroup': 'ItemAttributes,Images'
    }

    if(page !== undefined && page !== null){
        query.ItemPage = page;
    }
    
    var actionResponse = function actionResponse(responseResult){
        var output = {};
        if(page !== undefined && page !== null){
            output.currentPage = page;
        }
        
        if(!responseResult.ItemSearchResponse && responseResult.ItemSearchErrorResponse){
            return callback(new Error(responseResult.ItemSearchErrorResponse.Error[0]), null);
        }
        if(!responseResult.ItemSearchResponse.Items[0].Request[0].IsValid[0]){
            return callback(new Error(responseResult.ItemSearchResponse.Items[0].Request[0].Errors[0].Error[0].Message[0]), null);
        }
        
        var results = responseResult.ItemSearchResponse.Items[0].Item;
        var totalResults = responseResult.ItemSearchResponse.Items[0].TotalResults[0];
        var totalPages = responseResult.ItemSearchResponse.Items[0].TotalPages[0];
        
        if(!results){
            output = { totalResults:0, totalPages:0, currentPage:0, results:[] };
            return callback(null, output);
        }
        output = { totalResults: totalResults, totalPages: totalPages, currentPage: page || 1, results: results};
        callback(null, output);
    };
    
    var executeResult = null;
    var promise = null;
    this.apiClient.execute('ItemSearch', query, function(response) {
            actionResponse(response);
    });
};

module.exports = amazonSearchHelper;
