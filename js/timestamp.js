var Kouinkouin = Kouinkouin || {};

Kouinkouin.Counter = (function() {
	var exports = {},
		diffTimestamp,
		domNode,
        urlService;

	exports.init = function(params){
		domNode = params.domNode;
        urlService = params.url;
		getJson();
		setInterval(getJson, 60 * 1000);
		setInterval(renewTimestamp, 1000);
	};

	function formatDate(days, hours, minutes, seconds) {
        var formattedDate = '';
        if (formattedDate != '' || days > 0) {
            formattedDate += days + ' ' + (days > 1 ? 'days' : 'day') + ', ';
        }
        if (formattedDate != '' || hours > 0) {
            formattedDate += hours + ' ' + (hours > 1 ? 'hours' : 'hour') + ', ';
        }
        if (formattedDate != '' || minutes > 0) {
            formattedDate += minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute') + ', ';
        }
        if (formattedDate != '' || seconds > 0) {
            formattedDate += seconds + ' ' + (seconds > 1 ? 'seconds' : 'second');
        }
        return formattedDate;
	}

	var daysBetween = function( timestamp ) {

		var seconds = Math.floor(timestamp % 60);
		timestamp = timestamp/60;
		var minutes = Math.floor(timestamp % 60);
		timestamp = timestamp/60;
		var hours = Math.floor(timestamp % 24);

		var days = Math.floor(timestamp/24);

		return formatDate(days, hours, minutes, seconds);
	};

	var resultJson = function(data){
		diffTimestamp = data.endOfSuffering - data.timestamp;
		fillIn(daysBetween(diffTimestamp));
	};

	var fillIn = function(data){
		domNode.innerHTML = data;
	};

	var getJson = function() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                resultJson(data);
            }
        };
        xmlhttp.open("GET", urlService, true);
        xmlhttp.send();
	};

	var renewTimestamp = function(){
		diffTimestamp--;
		fillIn(daysBetween(diffTimestamp))
	};

	return exports;
})();