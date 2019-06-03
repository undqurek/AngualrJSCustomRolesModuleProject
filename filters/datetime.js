/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.filter( 'simpleTime', function()
    {
        return function( input )
        {
            var date = new Date( input );

            //TODO: zaimplementowac

            return date.toString();
        };
    } );
} )( window, window.angular );