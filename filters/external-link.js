/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    metalsoft.filter( 'externalLink', function()
    {
        'use strict';

        var protocolRegex = /^http(s?):\/\//g;

        return function( input )
        {
            if( input == null )
                return null;

            if( input.search( protocolRegex ) > -1 )
                return input;

            return 'http://' + input;
        };
    } );
} )( window, window.angular );