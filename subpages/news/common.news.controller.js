/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'CommonNewsController', function( $rootScope, $scope, Route, Authentication )
    {
        var _ = this;

        // bindings

        _.novelties = [
            {
                id : 1,
                title : 'title 1',
                body : 'body 1',
                created : new Date().getTime()
            },
            {
                id : 2,
                title : 'title 2',
                body : 'body 2',
                created : new Date().getTime()
            },
            {
                id : 3,
                title : 'title 3',
                body : 'body 3',
                created : new Date().getTime()
            },
            {
                id : 4,
                title : 'title 4',
                body : 'body 4',
                created : new Date().getTime()
            }
        ];

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

        // source code here
        // ...
        // ...
    } );
} )( window, window.angular );