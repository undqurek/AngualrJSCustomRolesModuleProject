/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    function createFrame( name )
    {
        var frame = angular.element( '<iframe>' );

        frame.css( {
            display : 'none'
        } );

        frame.attr( 'src', '' );
        frame.attr( 'name', name );

        return frame;
    }

    function createForm( name, action )
    {
        var form = angular.element( '<form>' );

        form.attr( 'action', action );
        form.attr( 'target', name );
        form.attr( 'method', 'post' );
        form.attr( 'enctype', 'multipart/form-data' );
        form.addClass("upload-form");

        return form;
    }

    /**
     * ct-upload-form
     * Default uses post method with multipart/form-data enctype.
     *
     *
     * Expected server response is:
     *
     * <html>
     * <body>
     * <script>
     *
     * var callback = function()
     * {
     *     // file upload server response
     *     var response = {
     *         result : true,
     *         message : 'File uploaded!'
     *     };
     *
     *     // or
     *     //var response = {
     *     //    result : false,
     *     //    message : 'Incorrect file!'
     *     //};
     *
     *     window.onsent( response );
     * };
     *
     * function execute()
     * {
     *     setTimeout( function()
     *     {
     *         if( window.onsent )
     *             callback();
     *
     *         else
     *             execute();
     *
     *     }, 100 );
     * }
     *
     * execute();
     *
     * </script>
     * </body>
     * <html>
     *
     *
     * Expected sending form:
     *
     * <upload-form action="{{ controller.uploadUrl }}" onsuccess="controller.reloadList( $message )" onerror="controller.showError( $message )">
     *     <input type="file" name="file" />
     *     <input type="submit" value="Upload file" />
     * </upload-form>
     *
     */
    metalsoft.directive( 'uploadForm', function( $parse )
    {
        function parseEvent( event )
        {
            if( event )
                return $parse( event );

            return null;
        }

        return {
            restrict : 'E',
            link : function ( scope, element, attributes )
            {
                if( attributes.action == null )
                    throw new Error( 'Action attribute is not defined.' );

                var onsuccess = parseEvent( attributes.onsuccess );
                var onerror = parseEvent( attributes.onerror );

                var ready = false;
                var name = 'unique-name-(' + Math.random() + ')';

                var frame = createFrame( name );
                var form = createForm( name, attributes.action );

                frame.on( 'load', callSuccess );
                frame.on( 'error', callError );

                form.append( element.contents() );

                element.append( frame );
                element.append( form );

                function analyzeResult( response )
                {
                    var locals = {
                        $message : response.message
                    };

                    if( response.result )
                    {
                        angular.forEach( form, function( value )
                        {
                            value.reset();
                        } );

                        if( onsuccess )
                        {
                            scope.$apply( function()
                            {
                                onsuccess( scope, locals );
                            } );
                        }
                    }
                    else
                    {
                        if( onerror )
                        {
                            scope.$apply( function()
                            {
                                onerror( scope, locals );
                            } );
                        }
                    }
                }

                function callSuccess()
                {
                    if( ready )
                    {
                        var content = frame.prop( 'contentWindow' );

                        try
                        {
                            content.onsent = analyzeResult;
                        }
                        catch( ex )
                        {
                            var locals = {
                                $message : 'Server connection error.'
                            };

                            if( onerror )
                            {
                                scope.$apply( function()
                                {
                                    onerror( scope, locals );
                                } );
                            }
                        }
                    }
                    else
                        ready = true;
                }

                function callError()
                {
                    var locals = {
                        $message : 'Request url error.'
                    };

                    if( onerror )
                    {
                        scope.$apply( function()
                        {
                            onerror( scope, locals );
                        } );
                    }
                }
            }
        };
    } );
} )( window, window.angular );