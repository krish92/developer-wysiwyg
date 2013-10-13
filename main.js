/*
 * Auto-generated content from the Brackets New Project extension.
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global $, window, document */

// Simple jQuery event handler

$(document).ready(function () {
    "use strict";
    var editor = new Editor($('#edit'));
    editor.init({
        air : false,
        toolbar : false,
        textarea : false,
        mode : 'edit',
        toolbar_options : [{'text':'Bold','action':'bold'},
                          {'text':'i','action':'italic'},
                          {'text':'_','action':'underline'}],
        wrapper_css : {'width':'400px','height':'400px','overflow':'auto'}
    });
    $('#scroll').click(function()
                       {
                           console.log('I am about to be clicked');
                            var editor = new Editor(null);
                            editor.init({
                                air : false,
                                toolbar : false,
                                textarea : false,
                                mode : 'visual'
                            });
                       });
    });
