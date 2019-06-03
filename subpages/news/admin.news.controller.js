/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'AdminNewsController', function( $rootScope, $scope, Route, Authentication )
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

        _.editNovelty = function( id )
        {
            alert( 'editNovelty (id: ' + id + ')' );
        };

        _.removeNovelty = function( id )
        {
            alert( 'removeNovelty (id: ' + id + ')' );

            for( var i = 0; i < _.novelties.length; ++i )
            {
                if( _.novelties[ i].id == id )
                    _.novelties.splice( i, 1 );
            }
        };

    } );
} )( window, window.angular );