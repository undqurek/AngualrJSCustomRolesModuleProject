/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'AdminHeaderController', function( $rootScope, $scope, Authentication )
    {
        var _ = this;

        // bindings

        // source code here
        // ...
        // ...

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

        _.logoutUser = function()
        {
            Authentication.logout( function()
            {
                alert( 'Logout operation error!' );
            } );
        };
    } );
} )( window, window.angular );