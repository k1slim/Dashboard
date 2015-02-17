require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',

        'interact': 'interact',
        'about': 'about'
    }
});

require(['interact','about'], function(interact,about){
    interact.init();
    about.init();
});
