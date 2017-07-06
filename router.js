var MOCK_DATA = {
	"id:": "111",
	"budget": "2000",
	"lodgingCost": "1000";
	"airfareCost": "300";
	"foodCost": "200";
	"carRentalCost": "0";
	"entertainmentCost": "100";
	"miscCost": "150";
	},
	{
	"id": "222",
	"budget": "1700",
	"lodgingCost": "900";
	"airfareCost": "400";
	"foodCost": "100";
	"carRentalCost": "50";
	"entertainmentCost": "150";
	"miscCost": "100";
	},
	{
	"id": "333",
	"budget": "5000",
	"lodgingCost": "2000";
	"airfareCost": "1400";
	"foodCost": "700";
	"carRentalCost": "250";
	"entertainmentCost": "550";
	"miscCost": "600";	
};

function getData(callback) {
	setTimeout(function(){ 
		callback(MOCK_DATA)
	}, 100);
}

function displayData(data) {
	for (index in data.MOCK_DATA) {
		$('body').append(
			'<p>' + data.MOCK_DATA[index].text + '<p>');
	}
}

function getAndDisplayData() {
	getData(displayData);
}

$(function() {
	getAndDisplayData();
})
