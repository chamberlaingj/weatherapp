var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var onSuccess = function(position) {
        console.log('Latitude: '    + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    },

};


$(document).ready(function(){
    $('#citysubmit').click(function(e){
        e.preventDefault();
        var xmlhttp = new XMLHttpRequest();
        var city = $('#cityname').val();
        var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=7035cdcaa428c344423f0e7d19e4b0b7";
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                getCity(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function getCity(arr) {
            console.log(arr);
            $("#content").html("");
            $("#content").append("<h3>Forecast for " + arr.city.name + "</h3><hr>");
            var i = 0;
            while (i < 5) {
                $("#content").append('<strong>Day ' + (i+1) + '<strong><br>');
                $("#content").append('<img src="http://openweathermap.org/img/w/' + arr.list[i].weather[0].icon + '.png" />');
                var fahr = 1.8 * (arr.list[i].main.temp - 273) + 32;
                $("#content").append(Math.round(fahr) + " &#8457;");
                $("#content").append('<hr>');
                console.log(arr.list[i].weather[0].icon);
                console.log(arr.list[i].main.temp);
                i++;
            }
        }
    });

    $('#gpssubmit').click(function(e){
        e.preventDefault();

        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var ifSuccess = function(position) {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude +  "&appid=7035cdcaa428c344423f0e7d19e4b0b7";
            
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var myArr = JSON.parse(xmlhttp.responseText);
                    getGPS(myArr);
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();

            function getGPS(arr) {
                console.log(url);
                console.log(arr);
                $("#content").html("");
                $("#content").append("<h3>Forecast for " + arr.city.name + "</h3><hr>");
                var i = 0;
                while (i < 5) {
                    $("#content").append('<strong>Day ' + (i+1) + '<strong><br>');
                    $("#content").append('<img src="http://openweathermap.org/img/w/' + arr.list[i].weather[0].icon + '.png" />');
                    var fahr = 1.8 * (arr.list[i].main.temp - 273) + 32;
                    $("#content").append(Math.round(fahr) + " &#8457;");
                    $("#content").append('<hr>');
                    console.log(arr.list[i].weather[0].icon);
                    console.log(arr.list[i].main.temp);
                    i++;
                }
            }
        };

        // onError Callback receives a PositionError object
        //
        function ifError(error) {
            console.log('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(ifSuccess, ifError);
    });

});
