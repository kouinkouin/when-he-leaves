var Kouinkouin = Kouinkouin || {};

Kouinkouin.Counter = (function($) {
	var exports = {};
	var diffTimestamp;

	exports.init = function(){
		getJson();
		setInterval(getJson, 60 * 1000);
		setInterval(renewTimestamp, 1000);
	};

	function formatDate(days, hours, minutes, seconds) {
		return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
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
		$('#fillme').text(data);
	};

	var getJson = function() {
		$.getJSON('timestamp.php', {}, resultJson);
	};

	var renewTimestamp = function(){
		diffTimestamp--;
		fillIn(daysBetween(diffTimestamp))
	};

	return exports;
})(jQuery);

$(document).ready(function(){
	Kouinkouin.Counter.init();
});