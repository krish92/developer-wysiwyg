var Menu = function(menu_wrapper)
{
    this.editor = null;
    this.menu_wrapper = menu_wrapper;
    this.codemirror = null;
    this.menu = $('<ul></ul>');
    this.menu_wrapper.append(this.menu);
    this.theme_option = $('<li><a>Themes</a></li>');
    this.theme_dropdown = $('<ul></ul>');
    this.themes = ['neat','night','solarized dark']
    this.new_option = $('<li><a>New</a><li>');
    this.show_editor = $('<li><a>Visual Editor</a></li>');
    this.new_dropdown = $('<ul></ul>');
    console.log('I am in menu ceater');
}
Menu.prototype = {
    init : function(codemirror,editor)
    {
        this.editor = editor;
        this.codemirror = codemirror;
        this.ApplyThemes();
        this.NewOption();
        this.showEditorOption();
        this.menu.menu({
        position: {at: "left bottom"}
        });
    },
    ApplyThemes : function()
    {
        var self = this;
        for(var i=0;i<this.themes.length;i++)
        {
            var temp_theme = $('<li></li>');
            temp_theme.text(this.themes[i]);
            temp_theme.click(function()
                             {
                                 self.codemirror.setOption('theme',$(this).text());
                             });
            this.theme_dropdown.append(temp_theme);
        }
        this.theme_option.append(this.theme_dropdown);
        this.menu.append(this.theme_option);
    },
    showEditorOption : function()
    {
        this.show_editor.click($.proxy(function()
                               {
                                   this.editor.toggle();
                               },this));
        this.menu.append(this.show_editor);
    },
    NewOption : function()
    {
        this.new_dropdown.append($('<li>askjdhakjshd</li>'));
        this.new_option.append(this.new_dropdown);
        this.menu.append(this.new_option);
    }
}