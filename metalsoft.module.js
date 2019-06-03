/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    window.metalsoft = angular.module( 'metalsoft', [ 'dynamicRoute'/*, 'ngMessages'*/ ] );

    metalsoft.config( function( $compileProvider, RouteProvider )
    {
        //$compileProvider.debugInfoEnabled( true );

        var commonPrefix = 'subpages/';

        RouteProvider.addRoute( '/home', {
            //states : {
            //    admin : commonPrefix + 'home/home.view.htm',
            //    user : commonPrefix + 'home/home.view.htm',
            //    raw : commonPrefix + 'home/home.view.htm'
            //},
            default : commonPrefix + 'home/home.view.htm'
            //dynamic : true
        } );
        RouteProvider.addRoute( '/news', {
            states : {
                admin : commonPrefix + 'news/admin.news.view.htm'
            },
            default : commonPrefix + 'news/common.news.view.htm'
        } );
        RouteProvider.addRoute( '/panel', {
            states : {
                admin : commonPrefix + 'panel/admin.panel.view.htm',
                user : commonPrefix + 'panel/user.panel.view.htm'
            },
            default : commonPrefix + 'permissions.view.htm'
        } );
        RouteProvider.addRoute( '/about', {
            default : commonPrefix + 'about/about.view.htm'
        } );

        RouteProvider.setDefault( '/home' );
    } );

    metalsoft.run( function( $rootScope, Route, Authentication )
    {
        //DANGER: state on event

        $rootScope.$on( 'Authentication.logged', setRoleState );
        $rootScope.$on( 'Authentication.lived', setRawState );

        function setRoleState( event, user )
        {
            Route.changeState( user.role );
        }

        function setRawState()
        {
            Route.changeState( 'raw' );
        }
    } );
} )( window, window.angular );