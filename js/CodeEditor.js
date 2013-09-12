var CodeEditor = function(iframe,iframe_wrapper,editor)
{
    this.ui_editor = editor;
    this.iframe = iframe;
    this.iframe_wrapper = iframe_wrapper;
    this.myCodeMirror = null;
    this.code_editor_wrapper = $('<div></div>');
    this.code_editor = $('<textarea>');
    this.code_editor_wrapper_attributes = {'height':'30%','width':'100%'};
    this.code_editor_wrapper.css(this.code_editor_wrapper_attributes);
    this.show_ui_editor = $('<button>Show editor</button>');
}
CodeEditor.prototype = {
    init : function()
    {
        console.log('I am going to hide the editor ');
        this.ui_editor.hide();
        this.show_ui_editor_option();
        this.create_code_editor();
    },
    show_ui_editor_option : function()
    {
        this.show_ui_editor.click($.proxy(function(){
            this.ui_editor.toggle();
        },this));
        this.code_editor_wrapper.append(this.show_ui_editor);
    },
    iframe_events : function()
    {
      console.log('I am in iframe events');      
    },
    getCharOffsetRelativeTo : function(container, node, offset) {
        var range = document.createRange();
        range.selectNodeContents(container);
        range.setEnd(node, offset);
        return range.toString().length;
    },
    create_code_editor : function()
    {
        var self = this;
        this.iframe.load(function()
                         {
                            self.code_editor_wrapper.append(self.code_editor);
                            self.code_editor = CodeMirror(function(elt) {
                              self.code_editor.get(0).parentNode.replaceChild(elt, self.code_editor.get(0));
                            }, {value: self.iframe.contents().find('body').html(),lineNumbers: true});
                             self.editor_events();
                             self.iframe_events();
                            $('body').append(self.code_editor_wrapper);
                         });
    },
    editor_events : function()
    {
        var self = this;
        this.code_editor.on('cursorActivity',function(code_editor){
            var line_no = code_editor.getCursor().line
            var line = code_editor.getLine(line_no);
            var my_html = $.parseHTML(line);
            var element = null;
            for(var i=0;i<my_html.length;i++)
            {
                if(my_html[i].nodeType == 3)
                {
                    console.log('I am a text node');
                }
                else
                {
                    console.log('I am a element');
                    element = my_html[i];
                    break;
                }
            }
            console.log('the element is ',element);
            self.iframe.contents().find('body').find('*').removeClass('glow');
            var iframe_elements = self.iframe.contents().find('body').find('*');
            console.log('the iframe element are ',iframe_elements);
            
            for(var i=0;i<iframe_elements.length;i++)
            {
                if(iframe_elements[i].isEqualNode(element))
                {
                    console.log("HOLY GRAIL >>>>>>>>>>>");
                    $(iframe_elements[i]).addClass('glow');
                    self.iframe.contents().find('body').scrollTop($(iframe_elements[i]).offset().top);
                }
            }
            console.log('the parsed html is ',my_html);
            //self.iframe.contents().find('body').
            console.log('the value of the event is ',code_editor.getCursor().line);
           //self.iframe.contents().find('body').html(code_editor.getValue());
        })
    }
}