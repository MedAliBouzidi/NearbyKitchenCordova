(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
        //checkConnection();
    }

    function checkConnection() {
        var connectiontype = navigator.connection.type;

        var status = {};
        status[Connection.UNKNOWN] = 'Unknown connection';
        status[Connection.ETHERNET] = 'Ethernet connection';
        status[Connection.WIFI] = 'WiFi connection';
        status[Connection.CELL_2G] = 'Cell 2G connection';
        status[Connection.CELL_3G] = 'Cell 3G connection';
        status[Connection.CELL_4G] = 'Cell 4G connection';
        status[Connection.CELL] = 'Cell generic connection';
        status[Connection.NONE] = 'No network connection';

        alert('Connection type: ' + status[connectiontype]);
    }

    function onOnline() {
        $("#infos").html("Connexion établie de type : " + connectiontype);
    }

    function onOffline() {
        $("#infos").html("Vérifier votre connexion !");
    }

})();

/* TODO:
  return onLine variable when device is online and the same when device is offline
  use that variable to limit user control in the app
*/