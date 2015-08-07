var Kouinkouin = Kouinkouin || {};

Kouinkouin.Counter = (function() {
    var exports = {},
        diffTimestamp,
        domNode,
        urlService,
        formatFunction;

    exports.init = function(params){
        domNode = params.domNode;
        urlService = params.url;
        getJson();
        setInterval(getJson, 60 * 1000);
        setInterval(renewTimestamp, 1000);
        formatFunction = formatFunctions[Math.floor(Math.random() * formatFunctions.length)];
    };

    function formatDate(days, hours, minutes, seconds) {
        var formattedDate = '';
        formattedDate += displayItem('day', days, true);
        formattedDate += displayItem('hour', hours, true);
        formattedDate += displayItem('minute', minutes, true);
        formattedDate += displayItem('second', seconds, false);
        return formattedDate;
    }

    var displayItem = function(itemToDisplay, value, separatorAvailable){
        if (! value) {
            return '';
        }
        var toDisplay = value + ' ' + itemToDisplay + addPluralForm(value);

        if (separatorAvailable){
            toDisplay += ', ';
        }

        return toDisplay;
    };

    var addPluralForm = function(value){
        return (value > 1) ? 's': '';
    };

    var daysBetween = function( timestamp ) {

        var seconds = Math.floor(timestamp % 60);
        timestamp = timestamp/60;
        var minutes = Math.floor(timestamp % 60);
        timestamp = timestamp/60;
        var hours = Math.floor(timestamp % 24);

        var days = Math.floor(timestamp/24);

        return formatDate(days, hours, minutes, seconds);
    };

    var formatFunctions = [
        function (timestamp) {
            return countEpisodes(timestamp, 55 * 60, 'Inspector Derrick');
        },
        function (timestamp) {
            return countEpisodes(timestamp, 5 * 60, 'the Barbapapa');
        },
        daysBetween
    ];

    var countEpisodes = function( timestamp, episodeDuration, movieName) {
        var episodesNumber = Math.floor(timestamp / episodeDuration);
        var formattedDate = daysBetween(timestamp % episodeDuration);

        return episodesNumber + ' ' + (episodesNumber > 1 ? 'episodes' : 'episode') + ' of ' + movieName
            + (formattedDate == '' ? '' : '<br /> and ' + formattedDate);
    };

    var resultJson = function(data){
        diffTimestamp = data.endOfSuffering - data.timestamp;
        display();
    };

    var display = function(){
        if (diffTimestamp <= 0){
            fillIn('It is left');
            return;
        }
        fillIn(formatFunction(diffTimestamp));
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
        display();
    };

    return exports;
})();