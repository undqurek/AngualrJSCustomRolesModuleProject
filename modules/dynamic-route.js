/**

Author: Grzegorz Górecki
Mail: undqurek@gmail.com

*/

( function( window, angular, undefined )
{
    'use strict';

    var module = angular.module( 'dynamicRoute', [ 'ng' ] );
    var createError = angular.$$minErr( 'dynamicRoute' );

    var locker = { };
    var routes = [ ];

    var currentState = null;
    var currentPath = null;
    var currentRoute = null;
    var currentParams = { };

    var defaultPath = '';
    var defaultRoute = null;
    var defaultParams = { };

    var pathRegex = /^(?:\/[^/?]+)+/g; // ex. for '/some/path/to?id=5' passes only for '/some/path/to'

    var escapeRegex = /([.+*?\\/|()\[\]{}^$])/g; // ex. for '/s??o.me/pa{th/to' finds: '?', '?', '.', '{', etc.
    var escapeReplacement = '\\$1';

    var paramsRegex = /(:[a-zA-Z][0-9a-zA-Z]*)/g; // ex. for '/some/:path/to' finds: ':path', etc.
    var paramsReplacement = '([^/]+)';

    var views = new Array();
    var action = null;

    function createRoute( prefix )
    {
        var params = [ ];

        var product = prefix.replace( escapeRegex, escapeReplacement );
        var pattern = product.replace( paramsRegex, analyze );

        function analyze( name )
        {
            params.push( name.substr( 1 ) );

            return paramsReplacement;
        }

        var result = {
            regex : new RegExp( '^' + pattern + '$' ),
            params : params
        };

        return result;
    }

    function transferParams()
    {
        for( var el in defaultParams )
            delete defaultParams[ el ];

        for( var el in defaultParams )
            currentParams[ el ] = defaultParams[ el ];
    }

    function analyzePath( route, params, path )
    {
        var result = route.regex.exec( path );

        if ( result == null )
            return false;

        for( var el in params )
            delete params[ el ];

        var names = route.params;

        for( var j = 0; j < names.length; ++j )
            params[ names[ j ] ] = result[ j + 1 ];

        return true;
    }

    function concludePath()
    {
        var states = currentRoute.states;

        if( states )
            return states[ currentState ] || currentRoute.default;

        return currentRoute.default;
    }

    module.provider( 'Route', function()
    {
        var _ = this;

        /**
         * Adds route to provider.
         *
         * states - describes different possible templates for the states
         * default - if no one state passes then default template is selected
         * dynamic - if is true then all changes of available parameters after '?' don't reload subpage
         *
         * // http://localhost/index.php#/home
         * RouteProvider.addRoute( '/home', {
         *    states : {
         *        admin : 'templates/admin/home/home.view.htm',
         *        moderator : 'templates/moderator/home/home.view.htm',
         *        user : 'templates/user/home/home.view.htm',
         *        guest : 'templates/guest/home/home.view.htm'
         *    },
         *    default : 'templates/common/home/home.view.htm',
         *    dynamic : true
         * } );
         *
         * // http://localhost/index.php#/chat?userNick=guest
         * RouteProvider.addRoute( '/chat', {
         *    states : {
         *        admin : 'templates/admin/chat/chat.view.htm',
         *        moderator : 'templates/moderator/chat/chat.view.htm',
         *        user : 'templates/user/chat/chat.view.htm',
         *        guest : 'templates/guest/chat/chat.view.htm'
         *    },
         *    default : 'templates/common/chat/chat.view.htm'
         * } );
         *
         * // http://localhost/index.php#/profile/3
         * RouteProvider.addRoute( '/profile/:userId', {
         *    states : {
         *        user : 'templates/user/profile/profile.view.htm'
         *    },
         *    default : 'templates/common/permission-denied.view.htm'
         * } );
         *
         * @param path path rule
         * @param config configuration for rule
         */
        _.addRoute = function( path, config )
        {
            var matches = path.match( pathRegex );

            if( matches == null || matches.length == 0 )
                throw createError( 1, 'Incorrect path format.' );

            var route = createRoute( matches[ 0 ] );

            if( locker[ route.regex ] )
                throw createError( 2, 'Route duplicated for \'' + path + '\' path.' );

            locker[ route.regex ] = true;

            route.states = config.states;
            route.dynamic = config.dynamic;
            route.default = config.default;

            routes.push( route );
        };

        /**
         * Sets default route.
         * If no one route passes than this route is selected.
         *
         * ex.
         * for home is: RouteProvider.setDefault( '/home' );
         *
         * @param path default route
         */
        _.setDefault = function( path )
        {
            for( var i = 0; i < routes.length; ++i )
            {
                var route = routes[ i ];

                if( analyzePath( route, defaultParams, path ) )
                {
                    defaultPath = path;
                    defaultRoute = route;

                    return;
                }
            }

            throw createError( 3, 'Unknown route.' );
        };

        /**
         * Sets default state.
         *
         * ex. 'admin', 'moderator', 'user', 'guest' or null for empty
         *
         * @param state default state
         */
        _.setState = function( state )
        {
            currentState = state;
        };

        _.$get = function( $rootScope, $location, $templateRequest, $compile, RouteParams ) // $sce
        {
            var executor = new OrderedExecutor();

            $rootScope.$on( '$locationChangeStart', updateChanges );

            function bindView( html )
            {
                action = function( ob )
                {
                    var element = ob.element;

                    var parentScope = ob.parentScope;
                    var currentScope = ob.currentScope;

                    element.empty();

                    if( currentScope )
                        currentScope.$destroy();

                    currentScope = ob.currentScope = parentScope.$new();

                    var link = $compile( html );
                    var handle = link( currentScope );

                    element.append( handle );
                };

                for( var i = 0; i < views.length; ++i )
                    action( views[ i ] );
            }

            function reloadView()
            {
                var mark = executor.push();
                var template = $templateRequest( concludePath() );

                template.then( function( html )
                {
                    mark( html, bindView );
                });
            }

            function updateChanges()
            {
                var path = $location.path();

                if( currentPath == path )
                {
                    if( currentRoute && currentRoute.dynamic )
                        return;

                    reloadView();
                }
                else
                {
                    if( path == '' || path == defaultPath )
                    {
                        transferParams();

                        currentPath = path;
                        currentRoute = defaultRoute;

                        reloadView();

                        return;
                    }

                    for( var i = 0; i < routes.length; ++i )
                    {
                        var route = routes[ i ];

                        if( analyzePath( route, currentParams, path ) )
                        {
                            currentPath = path;
                            currentRoute = route;

                            reloadView();

                            return;
                        }
                    }

                    $location.path( defaultPath );
                }
            }

            var result =
            {
                /**
                 * Gets current state.
                 *
                 * @returns current state
                 */
                get state()
                {
                    return currentState;
                },

                /**
                 * Changes state and template according to states inside configuration of routes.
                 *
                 * @param state new state
                 */
                changeState : function (state)
                {
                    currentState = state;

                    if ( currentRoute )
                        reloadView();
                }
            };

            return result;
        };
    } );

    module.factory( 'RouteParams', function()
    {
        return currentParams;
    } );

    module.directive( 'routeView', function() // $anchorScroll, $animate
    {
        return {
            restrict : 'ECA',
            priority : 1001,
            link : function ( scope, element, attributes )
            {
                var ob = {
                    parentScope : scope,
                    currentScope : null,
                    element : element//,
                    //controller : controller
                };

                views.push( ob );

                scope.$on( '$destroy', function()
                {
                    views.remove( ob )
                } );

                if( action )
                    action( ob );
            }
        };
    } );

    function OrderedExecutor()
    {
        var _tasks = [ ];

        this.push = function()
        {
            var task = {
                ready : false
            };

            _tasks.push( task );

            return function( tag, callback )
            {
                task.ready = true;
                task.tag = tag;

                execute( callback );
            };
        };

        function execute( callback )
        {
            while( _tasks.length > 0 )
            {
                var el = _tasks[ 0 ];

                if( el.ready )
                {
                    callback( el.tag );
                    _tasks.splice( 0, 1 );
                }
                else
                    break;
            }
        }
    }
} )( window, window.angular );