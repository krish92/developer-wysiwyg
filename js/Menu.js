var Menu = function(menu_wrapper,holder)
{
    this.preview_editor_wrapper = null;
    this.holder = holder;
    this.iframe_wrapper = null;
    this.code_editor_wrapper = null;
    this.file_panel_wrapper = null;;
    this.editor = null;
    this.menu_wrapper = menu_wrapper;
    this.codemirror = null;
    this.menu_wrapper.append(this.menu);
    this.layout_option = $('<a>Layout</a>');
    this.theme_option = $('<div>Themes</div>');
    this.theme_dropdown = $('<div></div>');
    this.theme_wrapper = $('<div></div>');
    this.themes = ['neat','night','solarized dark','monokai','eclipse']
    this.new_option = $('<a>New</a>');
    this.show_editor = $('<a>Visual Editor</a>');
    this.show_file_panel = $('<a>File Panel</a>');
    this.show_preview = $('<a>Preview</a>');
    this.new_dropdown = $('<ul></ul>');
    this.iframe = null;
    this.preview_iframe = null;
    console.log('I am in menu ceater');
}
Menu.prototype = {
    init : function(codemirror,editor)
    {
        this.editor = editor;
        this.codemirror = codemirror;
        this.ApplyThemes();
//        this.NewOption();
        this.showEditorOption();
//        this.showFilePanelOption();
        this.menu_wrapper.addClass('ui  menu');
        this.menu_wrapper.find('.ui.dropdown').dropdown();
    },
    previewWrapper : function(preview)
    {
        this.preview_editor_wrapper = preview;
        this.iframe = this.iframe_wrapper.find('iframe');
        this.preview_iframe = this.preview_editor_wrapper.find('iframe');
    },
    iframeWrapper : function(iframe_wrapper)
    {
        this.iframe_wrapper = iframe_wrapper;
        this.previewOption();
    },
    layout : function(code_editor_wrapper)
    {
        this.code_editor_wrapper = code_editor_wrapper;
        this.layout_option.click($.proxy(function()
                                 {
                                    var css_attribute = {'width':'40%','height':'80%','display':'inline-block'};
                                     this.iframe_wrapper.css(css_attribute);
                                     this.code_editor_wrapper.css(css_attribute);
                                 },this));
        this.layout_option.addClass('item');
        this.menu_wrapper.append(this.layout_option);
    },
    previewOption : function()
    {
        this.show_preview.addClass('item');
        this.show_preview.click($.proxy(function(){
            this.code_editor_wrapper.toggle();
            this.iframe_wrapper.toggle();
            console.log('the avlue of the iframe html >>>>>>>>> ',$('#original_iframe').contents().find("html").html());
            var iFrameDoc = this.preview_iframe[0].contentDocument ||this.preview_iframe[0].contentWindow.document;
            iFrameDoc.write($('#original_iframe').contents().find("html").html());
            iFrameDoc.close();
            this.preview_editor_wrapper.toggle();
        },this));
        this.menu_wrapper.append(this.show_preview);

    },
    addFilePanelWrapper : function(file_panel_wrapper)
    {
        this.file_panel_wrapper = file_panel_wrapper;
    },
    showFilePanelOption : function()
    {
        this.show_file_panel.click($.proxy(function(){
            this.file_panel_wrapper.toggle();
        },this));
        this.menu_wrapper.append(this.show_file_panel);
    },
    ApplyThemes : function()
    {
        var self = this;
        this.theme_option.addClass('ui dropdown item');
        for(var i=0;i<this.themes.length;i++)
        {
            var temp_theme = $('<a></a>');
            temp_theme.text(this.themes[i]);
            temp_theme.addClass('item');
            temp_theme.click(function()
                             {
                                 self.codemirror.setOption('theme',$(this).text());
                             });
            this.theme_dropdown.append(temp_theme);
        }
        this.theme_dropdown.addClass('menu');
        this.theme_option.append(this.theme_dropdown);
        this.menu_wrapper.append(this.theme_option);
    },
    showEditorOption : function()
    {
        this.show_editor.click($.proxy(function()
                               {
                                   this.editor.sidebar('toggle');
                               },this));
        this.show_editor.addClass('item');
        this.menu_wrapper.append(this.show_editor);
    },
    NewOption : function()
    {
        this.new_dropdown.append($('<li>askjdhakjshd</li>'));
        this.new_option.append(this.new_dropdown);
        this.menu_wrapper.append(this.new_option);
    }
}
