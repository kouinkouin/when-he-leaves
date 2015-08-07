var Kouinkouin = Kouinkouin || {};

Kouinkouin.Counter = (function() {
    var exports = {},
        diffTimestamp,
        domNode,
        urlService,
        display;

    exports.init = function(params){
        domNode = params.domNode;
        urlService = params.url;
        getJson();
        setInterval(getJson, 60 * 1000);
        setInterval(renewTimestamp, 1000);
        display = displays[Math.floor(Math.random() * displays.length)];
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

    var displays = [
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
        fillIn(display(diffTimestamp));
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
        fillIn(display(diffTimestamp))
    };

    return exports;
})();