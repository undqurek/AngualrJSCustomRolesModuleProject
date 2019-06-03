/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.factory( 'Locator', function()
    {
        var _path = {
            frontend : '',
            backend : 'service.php/'
        };

        var result = {
            getPath : function( name )
            {
                return _path[ name ];
            }
        };

        return result;
    } );
} )( window, window.angular );