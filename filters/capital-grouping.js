/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.filter( 'capitalGrouping', function()
    {
        'use strict';

        function compare( groups, array )
        {
            for( var el in groups )
            {
                var items = groups[ el ];

                for( var i = 0; i < items.length; ++i )
                {
                    var item = items[ i ];

                    if( item != array[ item.$$index ] )
                        return false;
                }
            }

            return true;
        }

        return function( array, parameter )
        {
            if( array == null )
                return null;

            var groups = array.$$groups;

            if( groups && array.$$count == array.length )
            {
                if( compare( groups, array ) )
                    return groups;
            }

            groups = { };

            for( var i = 0; i < array.length; ++i )
            {
                var item = array[ i ];
                var value = item[ parameter ];

                if( value == null || value.length == 0 )
                    continue;

                item.$$index = i;

                var letter = value[ 0 ].toUpperCase();
                var group = groups[ letter ];

                if( group == null )
                    group = groups[ letter ] = [ ];

                group.push( item );
            }

            array.$$count = array.length;
            array.$$groups = groups;

            return groups;
        };
    } );
} )( window, window.angular );