/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'RawHeaderController', function( $rootScope, $scope, Authentication )
    {
        var _ = this;

        // bindings

        _.user = {
            nick : 'admin',
            password : 'admin'
        };

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

        _.loginUser = function()
        {
            Authentication.login( _.user, function()
            {
                alert( 'Login operation error!' );
            } );
        };
    } );
} )( window, window.angular );