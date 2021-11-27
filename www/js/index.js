/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
var typeConnexion;

(function() {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
        //checkConnection();
    };

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