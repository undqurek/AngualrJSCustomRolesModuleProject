/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'AdminPanelController', function( $rootScope, $scope, Locator )
    {
        var _ = this;

        // bindings

        _.uploadUrl = Locator.getPath( 'backend' ) + 'admin/upload';

        //code...

        // helper methods

        // source code here
        // ...
        // ...

        // events

        // source code here
        // ...
        // ...

        // public methods

        _.reloadList = function( message )
        {
            alert( 'Reload: ' + JSON.stringify( message ) );
        };

        _.showError = function()
        {
            alert( 'Error: ' + JSON.stringify( message ) );
        };
    } );
} )( window, window.angular );