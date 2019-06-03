/**
 * Created by ggorecki on 2015-12-04.
 */

( function( window, angular, undefined )
{
    'use strict';

    // events:
    // + Authentication.logged
    // + Authentication.lived

    metalsoft.provider( 'Authentication', function()
    {
        var _ = this;

        var _user = null;
        var _progress = false;

        var _properties = {
            isLogged : {
                get : function()
                {
                    return _user != null;
                }
            },
            nick : {
                get : function()
                {
                    if ( _user == null )
                        return null;

                    return _user.nick;
                }
            },
            role : {
                get : function()
                {
                    if ( _user == null )
                        return 'common';

                    return _user.role;
                }
            }
        };

        Object.defineProperties( _, _properties );

        _.$get = function( $rootScope, $http, Locator )
        {
            var result = {
                get email()
                {
                    if ( _user == null )
                        return null;

                    return _user.email;
                },
                /**
                 * Restores user which has session on server. It should be executed immediately after page is loaded.
                 *
                 * @param onerror
                 * @return {boolean}
                 */
                restore : function( onerror )
                {
                    if( _progress || _user )
                        return false;

                    _progress = true;

                    var url = Locator.getPath( 'backend' ) + 'auth/check';
                    var ajax = $http.get( url );

                    ajax.success( function( data )
                    {
                        _progress = false;

                        if( data.logged )
                        {
                            _user = data.user;

                            var user = {
                                id : _user.id,
                                nick : _user.nick,
                                email : _user.email,
                                role : _user.role
                            };

                            $rootScope.$emit( 'Authentication.logged', user );
                        }
                        else
                        {
                            onerror && onerror( data.message, data.errors );
                            $rootScope.$emit( 'Authentication.lived' );
                        }

                        //onerror && onerror( data.message );
                    });
                    ajax.error( function( data )
                    {
                        _progress = false;

                        onerror && onerror( data && data.message || "Check operation error!" );
                    });

                    return true;
                },
                /**
                 * Registers new user.
                 *
                 * @param user
                 * @param conf
                 * @return {boolean}
                 */
                register : function( user, conf )
                {
                    if( _progress || _user )
                        return false;

                    _progress = true;

                    if( conf )
                    {
                        var onsuccess = conf.onsuccess;
                        var onerror = conf.onerror;
                    }

                    var url = Locator.getPath( 'backend' ) + 'auth/register';
                    var ajax = $http.post( url, user );

                    ajax.success( function( data )
                    {
                        _progress = false;

                        if( data.result )
                        {
                            _user = {
                                id : data.userId,
                                nick : user.nick,
                                email : user.email,
                                role : data.userRole
                            };

                            user = {
                                id : _user.id,
                                nick : _user.nick,
                                email : _user.email,
                                role : _user.role
                            };

                            onsuccess && onsuccess();
                            $rootScope.$emit( 'Authentication.logged', user );
                        }
                        else
                            onerror && onerror(data.message, data.errors);
                    });
                    ajax.error( function( data )
                    {
                        _progress = false;

                        onerror && onerror( data && data.message || "Register operation error!" );
                    });
                },
                /**
                 * Logins user by nick or emails.
                 *
                 * @param user
                 * @param onerror
                 * @return {boolean}
                 */
                login : function( user, onerror )
                {
                    if( _progress || _user )
                        return false;

                    _progress = true;

                    var url = Locator.getPath( 'backend' ) + 'auth/login';
                    var ajax = $http.post( url, user );

                    ajax.success( function( data )
                    {
                        _progress = false;

                        if( data.result )
                        {
                            _user = data.user;

                            user = {
                                id : _user.id,
                                nick : _user.nick,
                                email : _user.nick,
                                role : _user.role
                            };

                            $rootScope.$emit( 'Authentication.logged', user );
                        }
                        else
                            onerror && onerror( data.message );
                    });
                    ajax.error( function( data )
                    {
                        _progress = false;

                        onerror && onerror( data && data.message || "Login operation error!" );
                    });
                },
                /**
                 * Logouts current user.
                 *
                 * @param onerror
                 * @return {boolean}
                 */
                logout : function( onerror )
                {
                    if( _progress || _user == null )
                        return false;

                    _progress = true;

                    var url = Locator.getPath( 'backend' ) + 'auth/logout';
                    var ajax = $http.get( url );

                    ajax.success( function( data )
                    {
                        _progress = false;

                        if( data.result )
                        {
                            _user = null;

                            $rootScope.$emit( 'Authentication.lived' );
                        }
                        else
                            onerror && onerror( data.message );
                    });
                    ajax.error( function( data )
                    {
                        _progress = false;

                        onerror && onerror( data && data.message || "Logout operation error!" );
                    });

                    return true;
                },
                /**
                 * Remaind user by identifier which is nick or email.
                 *
                 * @param identifier
                 * @param conf
                 * @return {boolean}
                 */
                remaind : function( identifier, conf )
                {
                    if( _progress || _user )
                        return false;

                    _progress = true;

                    if( conf )
                    {
                        var onsuccess = conf.onsuccess;
                        var onerror = conf.onerror;
                    }

                    var url = Locator.getPath( 'backend' ) + 'auth/logout?identifier' + encodeURIComponent( identifier );
                    var ajax = $http.get( url );

                    ajax.success( function( data )
                    {
                        _progress = false;

                        if( data.result )
                            onsuccess && onsuccess();

                        else
                            onerror && onerror( data.message );
                    });
                    ajax.error( function( data )
                    {
                        _progress = false;

                        onerror && onerror( data && data.message || "Remaind operation error!" );
                    });

                    return true;
                }
            };

            Object.defineProperties( result, _properties );

            return result;
        };
    } );
} )( window, window.angular );