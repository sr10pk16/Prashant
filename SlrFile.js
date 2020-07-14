(function () {
	
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
		
		tableau.log("Connector is working fine.");

		var cols = [
					{
					id: "ISO3",
					alias: "ISO3",
					dataType: tableau.dataTypeEnum.string
				}, {
					id: "Name",
					alias: "Country",
					dataType: tableau.dataTypeEnum.string
				}, {
					id: "Year",
					alias: "Year",
					dataType: tableau.dataTypeEnum.int
				}, {
					id: "id",
					alias: "id",
					dataType: tableau.dataTypeEnum.string
				}];
   
	   var tableSchema = {
			id: "SolrFeed",
			alias: "Data from Solr",
			columns: cols
		};

		schemaCallback([tableSchema]);
		
};

    myConnector.getData = function (table, doneCallback) {


	$.getJSON("http://localhost:8983/solr/new_core/select?q=*%3A*&format=jsonp&jsonp=?", function(resp) {
        resp.set('Access-Control-Allow-Origin', '*');

		var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {

            tableData.push({ 
                "ISO3": feat[i].docs.ISO3,
                "Name": feat[i].docs.Name,
                "Year": feat[i].docs.Year,
                "id": feat[i].docs.id							
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
	
	
    };

    tableau.registerConnector(myConnector);

	$(document).ready(function () {
		$("#submitButton").click(function () {
			tableau.connectionName = "Click to get Solr Data";
			tableau.submit();
		});
	});
	
	})();