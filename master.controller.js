/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    metalsoft.controller( 'MasterController', function( $rootScope, $scope, Route, Authentication )
    {
        var _ = this;

        // bindings

        _.userRole = 'common';

        // helper methods

        function updateRole()
        {
            _.userRole = Route.state;
        }

        // events

        var _e1 = $rootScope.$on( 'Authentication.logged', updateRole );
        var _e2 = $rootScope.$on( 'Authentication.lived', updateRole );

        $scope.$on( '$destroy', function()
        {
            _e1();
            _e2();
        });

        // public methods

        _.restoreUser = function()
        {
            Authentication.restore();
        };
    } );
} )( window, window.angular );