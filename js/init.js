require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
        'dot': '../bower_components/jquery.dotdotdot/src/js/jquery.dotdotdot.min',

        'interact': 'interact',
        'request': 'request',
        'about': 'about'
    }
});

require(['interact', 'request', 'about'], function(interact, request, about){
    interact.init();
    request.init();
    about.init();
});