    var CodeEditor = function(iframe,iframe_wrapper,editor,menu,page,holder)
{
    this.holder = holder;
    this.page = page;
    this.menu = menu;
    this.ui_editor = editor;
    this.iframe = iframe;
    this.iframe_wrapper = iframe_wrapper;
    this.myCodeMirror = null;
    this.code_editor_wrapper = $('<div></div>');
    this.code_editor = $('<textarea>');
    this.editor_change = false;
    this.change_obj = null;
    this.changed_iframe_element = null;
}
CodeEditor.prototype = {
    init : function()
    {
        this.create_code_editor();
    },
    iframe_events : function()
    {
        var self = this;
        this.iframe.contents().find('body').find('*').click(function(event)
                                                            {
                                                                event.stopPropagation();
                                                                var temp = $('<div></div>');
                                                                var clone = $(this).clone(true,true);
                                                                clone.removeClass('highlight');
                                                                temp.append(clone,{line:0,ch:0},true);
                                                                var find_results = self.code_editor.getSearchCursor(temp.html());
                                                            });
    },
    getCharOffsetRelativeTo : function(container, node, offset) {
        var range = document.createRange();
        range.selectNodeContents(container);
        range.setEnd(node, offset);
        return range.toString().length;
    },
    getCodeEditor : function()
    {
        return this.code_editor;
    },
    getCodeEditorWrapper : function()
    {
        return this.code_editor_wrapper;
    },
    create_code_editor : function()
    {
        var self = this;
        self.code_editor_wrapper.append(self.code_editor);
        this.holder.append(self.code_editor_wrapper);
        self.code_editor = CodeMirror(function(elt) {
          self.code_editor.get(0).parentNode.replaceChild(elt, self.code_editor.get(0));
        }, {value: this.page,
            lineNumbers: true,
            styleActiveLine: true,
            mode: "htmlmixed",
            smartIndent: true,
            gutters: ["CodeMirror-lint-markers"]});
         self.menu.init(self.code_editor,self.ui_editor);
         console.log('the number of lines in the editor is '+self.code_editor.lineCount());
         for(var i=1;i<=self.code_editor.lineCount();i++)
         {
             self.code_editor.indentLine({line:i});
         }
         self.editor_events();
//         self.iframe_events();
    },
    find_iframe_element : function(code_editor,changeObj,type)
    {
        var self = this;
         var line_no = code_editor.getCursor().line
            var line = code_editor.getLine(line_no);
            var my_html = $.parseHTML(line);
            var element = null;
            if(my_html != null)
            {
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
                var iframe_elements = self.iframe.contents().find('body').find('*');
                console.log('the iframe element are ',iframe_elements);

                for(var i=0;i<iframe_elements.length;i++)
                {
                    if(iframe_elements[i].isEqualNode(element))
                    {
                        console.log("HOLY GRAIL >>>>>>>>>>> "+this.editor_change);
                        if(type == 'beforeChange')
                        {
                            this.changed_iframe_element = $(iframe_elements[i]);
                        }
                        else
                        {
                            self.iframe.contents().find('body').scrollTop($(iframe_elements[i]).offset().top);
                        }
                    }
                }
                console.log('the parsed html is ',my_html);
                //self.iframe.contents().find('body').
                console.log('the value of the event is ',code_editor.getCursor().line);
            }
           //self.iframe.contents().find('body').html(code_editor.getValue());
    },
    editor_events : function()
    {
        var self = this;
        this.code_editor.on('dblclick',$.proxy(function(code_editor){
            this.find_iframe_element(code_editor,null,'dblclick');

        },this))
        this.code_editor.on('beforeChange',$.proxy(function(code_editor,changeObj){
            console.log('The change object is ',changeObj);
            this.change_obj = changeObj;
            this.editor_change = true;
            this.find_iframe_element(code_editor,changeObj,'beforeChange');
        },this));
        this.code_editor.on("change",$.proxy(function(code_editor,changeObj){
            var line_no = code_editor.getCursor().line
            var line = code_editor.getLine(line_no);
            var my_html = $.parseHTML(line);
            var element = null;
            if(my_html != null)
            {
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
                this.changed_iframe_element.replaceWith($(element));
            }
        },this));

    }
}
