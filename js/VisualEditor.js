var VisualEditor = function () {
    this.editor_wrapper = $('<div></div>');
    this.editor_wrapper_atributes = {'width':'100%','height':'100%'};
    this.editor_wrapper.css(this.editor_wrapper_atributes);
    this.file_panel = null;
    this.file_panel_wrapper = null;
    this.menu_wrapper = $('<div></div>');
    this.menu = null;
    this.iframe = $('<iframe></iframe>');
    this.iframe_attributes = {
        'width': '100%',
        'height': '100%'
    };
    this.iframe_wrapper_attributes = {
        'width': '100%',
        'height': '90%',
        'border': '1px solid black'
    };
    this.iframe_wrapper = $('<div></div>');
    this.overall_iframe_wrapper = $('<div></div>');
    this.overall_iframe_wrapper_attributes = {
        'width': '100%',
        'height': '50%',
        'border-bottom': '1px solid black',
        'display': 'inline-block'
    };
    this.overall_iframe_wrapper.css(this.overall_iframe_wrapper_attributes);
    this.editor = null;
    this.iframe_wrapper.css(this.iframe_wrapper_attributes);
    this.add_media_size = $('<span style="background-color:#2ba6cb; color:white;">+</span>');
    this.media_size = $('<div></div>');
    this.media_size_attributes = {
        'height': '5%',
        'width': '100%',
        'background-color': 'green'
    };
    this.media_size_options = [];
    this.code_editor = null;
    this.code_editor_wrapper = null;
    this.codemirror = null;
    this.media_size.css(this.media_size_attributes);
}
VisualEditor.prototype = {
    init: function () {
        $('body').html('');
        $('body').append(this.editor_wrapper);
        this.create_menu();
        this.create_wrappers();
    },
    create_menu: function () {
        this.editor_wrapper.append(this.menu_wrapper);
        this.menu = new Menu(this.menu_wrapper,this.editor_wrapper);
    },
    add_media_size_option: function () {
        this.add_media_size.click($.proxy(function () {
            var media_new_rule = $('<div></div>');
            var media_new_rule_attributes = {
                'background-color': 'yellow',
                'height': '100%',
                'width': this.iframe.css('width'),
                'border': '1px solid white'
            };
            media_new_rule.css(media_new_rule_attributes);
            this.media_size_options[this.media_size_options.length - 1]['min-width'] = this.iframe.width();
            this.media_size_options[this.media_size_options.length] = {
                'max-width': this.iframe.width(),
                'min-width': 0
            };
            this.media_size.prepend(media_new_rule);
        }, this));
        this.overall_iframe_wrapper.prepend(this.add_media_size);
    },
    create_wrappers: function () {
        var url = 'file:///Users/krishnanvenkat/Desktop/4th%20ex/wsywigeditor/medium/bracket/test.html';
        var self = this;
        $.ajax({
            url: document.location.origin+'/test.html',
            success : function(page)
            {
                var html ='<html>';
                var head = page.match(/<head[^>]*>[\s\S]*<\/head>/gi)[0];
                head = head.replace('<head>','');
                head = head.replace('</head>','');
                head = self.cleanScripts(head,'head');
                html = html+head;
                var body = page.match(/<body[^>]*>[\s\S]*<\/body>/gi)[0];
                body = body.replace('<body>','');
                body = body.replace('</body>','');
                body = self.cleanScripts(body,'body');
                html = html+body+'</html>'
                self.initialise_iframe(html);
            },
            error : function()
            {
                console.log('There was an error');
            }
        });

    },
    cleanScripts : function(html,type)
    {
        var remover = $('<div></div>').html(html);
        html = '';
        var self = this;
        var script_count =0;
        var total_count = remover.find('script').length;
        remover.find('script').each(function()
                                    {
                                        if($(this).attr('src').length>0)
                                        {
                                            var pat = /^https?:\/\//i;
                                            var element = $(this);
                                            if (!pat.test($(this).attr('src')))
                                            {
                                                console.log('we have a relative path');
                                                $.ajax({
                                                    url: document.location.origin+'/'+element.attr('src'),
                                                    success : function(script)
                                                    {
                                                        console.log('We are in success >>>>>>>>>>>>>>>>>>>');
                                                        element.removeAttr('src');
                                                        element.html(script);
                                                    },
                                                    error : function()
                                                    {
                                                        console.log('There was an error');
                                                    },
                                                    async : false
                                                });
                                            }
                                        }
                                    });
           console.log('the value of the head is '+remover.html());
        if(type=='head')
        {
            html = '<head>'+'<script id="temp_styles_script"></script>'+remover.html()+'</head>';
        }
        else
        {
            html = '<body>'+remover.html()+'</body>';
        }
        return html;

    },
    initialise_iframe : function(my_iframe)
    {
        this.iframe.attr(this.iframe_attributes);
        this.editor_wrapper.append(this.iframe);
        this.iframe.wrap(this.iframe_wrapper);
        this.iframe_wrapper = this.iframe.parent();
        this.iframe_wrapper.wrap(this.overall_iframe_wrapper);
        this.iframe_wrapper.css('width', '100%');
        this.overall_iframe_wrapper = this.iframe_wrapper.parent();
        this.overall_iframe_wrapper.prepend(this.media_size);
        this.iframe_wrapper.css('display', 'inline-block');
        var max = this.iframe.width();
        this.media_size_options[0] = {
            'max-width': max,
            'min-width': 0
        };
        this.add_media_size_option();
        var iFrameDoc = this.iframe[0].contentDocument ||this.iframe[0].contentWindow.document;
        iFrameDoc.write(my_iframe);
        iFrameDoc.close();
        this.ui = new VisualEditorUI(this.iframe, this.iframe_wrapper, this.media_size_options);
        this.editor = this.ui.init();
        this.editor.css({
            'position': 'fixed',
            'left': '80%',
            'background-color': '#444',
            'z-index': '100'
        });
        this.editor.draggable();
        this.code_editor = new CodeEditor(this.iframe, this.iframe_wrapper, this.editor, this.menu,my_iframe,this.editor_wrapper);
        this.file_panel = new FilePanel(this.editor, this.iframe);
        this.file_panel_wrapper = this.file_panel.init();
        this.menu.addFilePanelWrapper(this.file_panel_wrapper);
        this.code_editor.init();
        this.code_editor_wrapper = this.code_editor.getCodeEditorWrapper();
        this.menu.layout(this.code_editor_wrapper,this.overall_iframe_wrapper);
        this.codemirror = this.code_editor.getCodeEditor();
        console.log('the codeeditor is ',this.codemirror);
    }
}
