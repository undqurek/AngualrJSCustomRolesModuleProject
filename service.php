<?php
/**
 * Created by PhpStorm.
 * User: ggorecki
 * Date: 2015-12-04
 * Time: 08:25
 */

session_start();


//echo "<pre>" . print_r($GLOBALS, true);



//header( 'Content-Type: json/application' );


switch( $_SERVER[ 'PATH_INFO' ] )
{
    case '/auth/check':

        if( isset( $_SESSION[ 'user' ] ) )
        {
            $logged = true;
            $user = $_SESSION[ 'user' ];
        }
        else
        {
            $logged = false;
            $user = null;
        }

        echo json_encode( [
            'logged' => $logged,
            'user' => $user
        ] );

        break;

    case '/auth/login':

        $json = file_get_contents( 'php://input' );
        $data = json_decode( $json );

        switch( $data->nick )
        {
            case 'admin':
                //TODO: check password

                $user = new stdClass();

                $user->id = 1;
                $user->nick = 'admin';
                $user->role = 'admin';

                $_SESSION[ 'user' ] = $user;

                echo json_encode( [
                    'result' => true,
                    'user' => $user
                ] );

                break;

            case 'user':
                //TODO: check password

                $user = new stdClass();

                $user->id = 2;
                $user->nick = 'user';
                $user->role = 'user';

                $_SESSION[ 'user' ] = $user;

                echo json_encode( [
                    'result' => true,
                    'user' => $user
                ] );

                break;

            default:
                echo json_encode( [ 'result' => false ] );
                break;
        }

        break;

    case '/auth/logout':
        unset( $_SESSION[ 'user' ] );

        echo json_encode( [ 'result' => true ] );
        break;

    case '/admin/upload':
        //TODO check permissions
        //TODO: logika odbierania pliku

        $result = true;
        $message = 'File uploaded!';
?>

        <html>
            <body>
                <script>

                var callback = function()
                {
                    // file upload server response
                    var response = {
                        result : <?= $result ?>,
                        message : '<?= $message ?>'
                    };

                    // or
                    //var response = {
                    //    result : false,
                    //    message : 'Incorrect file!'
                    //};

                    window.onsent( response );
                };

                function execute()
                {
                    setTimeout( function()
                    {
                        if( window.onsent )
                            callback();

                        else
                            execute();
                    }, 100 );
                }

                execute();

                </script>
            </body>
        <html>

<?php
        break;

    default:
        echo json_encode( [ 'result' => false ] );
        break;
}