<!DOCTYPE html>
<html ng-app="metalsoft" ng-controller="MasterController as c" ng-init="c.restoreUser()">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content="...,...,..." />
    <meta name="description" content="..." />

    <title>Roles example</title>

    <link rel="shortcut icon" href="gfx/icon.png" />

    <link rel="stylesheet" href="css/default.css" />
	<link rel="stylesheet" href="css/root.css">

    <script type="text/javascript" src="libs/angularjs/angular.js"></script>
    <script type="text/javascript" src="libs/angularjs/angular-loader.js"></script>

    <script type="text/javascript" src="modules/dynamic-route.js"></script>

    <script type="text/javascript" src="metalsoft.module.js"></script>
    <script type="text/javascript" src="master.controller.js"></script>

    <!-- services -->
    <script type="text/javascript" src="services/locator.js"></script>
    <script type="text/javascript" src="services/authentication.js"></script>

    <!-- filters -->
    <script type="text/javascript" src="filters/datetime.js"></script>
    <script type="text/javascript" src="filters/capital-grouping.js"></script>
    <script type="text/javascript" src="filters/external-link.js"></script>

    <!-- directives -->
    <script type="text/javascript" src="directives/upload-form.js"></script>

    <!-- templates -->
    <script type="text/javascript" src="templates/header/admin.header.controller.js"></script>
    <script type="text/javascript" src="templates/header/user.header.controller.js"></script>
    <script type="text/javascript" src="templates/header/raw.header.controller.js"></script>
    <script type="text/javascript" src="templates/header/common.header.controller.js"></script>

    <!-- subpages -->
    <script type="text/javascript" src="subpages/home/home.controller.js"></script>
    <script type="text/javascript" src="subpages/news/admin.news.controller.js"></script>
    <script type="text/javascript" src="subpages/news/common.news.controller.js"></script>
    <script type="text/javascript" src="subpages/about/about.controller.js"></script>
    <script type="text/javascript" src="subpages/panel/admin.panel.controller.js"></script>
    <script type="text/javascript" src="subpages/panel/user.panel.controller.js"></script>

    <style type="text/css">

        div.javascript-message
        {
            position: fixed;
            left: 0; top: 0; right: 0;
            background: #ff6f60;
            height: 100px;
            font-family: 'Arial';
            font-size: 30px;
            color: red;
            text-align: center;
            line-height: 100px;
            overflow: hidden;
        }

    </style>

</head>
<body ng-cloak>
    <div ng-hide="true" class="javascript-message">
        JavaScript support is required for proper working of this page!
    </div>
    <div ng-include="'templates/header/' + c.userRole + '.header.view.htm'" class="header"></div>
    <div route-view ng-cloak class="body"></div>
</body>
</html>