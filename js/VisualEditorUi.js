var VisualEditorUI = function(iframe,iframe_wrapper)
{
    this.iframe_wrapper = iframe_wrapper;
    this.iframe = iframe;
    this.current_elements = [];
    this.class_text = null;
    this.style_script = $('<style></style>');
    this.wrapper_padding= $('<table></table>');
    this.padding_left = $('<input></input>');
    this.padding_right = $('<input></input>');
    this.padding_top = $('<input></input>');
    this.padding_bottom = $('<input></input>');
    this.wrapper_margin= $('<table></table>');
    this.margin_left = $('<input></input>');
    this.margin_right = $('<input></input>');
    this.margin_top = $('<input></input>');
    this.margin_bottom = $('<input></input>');
    this.border_radius_wrapper = $('<div></div>');
    this.border_top_left_radius = $('<input type="radio" name="border-radius" value="border-top-left-radius">');
    this.border_top_right_radius = $('<input type="radio" name="border-radius" value="border-top-right-radius">');  
    this.border_bottom_left_radius = $('<input type="radio" name="border-radius" value="border-bottom-left-radius">');
    this.border_bottom_right_radius = $('<input type="radio" name="border-radius" value="border-bottom-right-radius">');
    this.important_style_check = $('<input type="checkbox">');
    this.important_style_wrapper = $('<div></div>');
    this.border_all_radius = $('<input type="radio" name="border-radius" value="border-radius">');
    this.border_radius = $('<input></input>');
    this.border_wrapper = $('<div></div>');
    this.border_left = $('<input type="radio" name="border" value="border-left">');
    this.border_right = $('<input type="radio" name="border" value="border-right">');  
    this.border_bottom= $('<input type="radio" name="border" value="border-bottom">');
    this.border_top = $('<input type="radio" name="border" value="border-top">');
    this.border_all = $('<input type="radio" name="border" value="border">');
    this.border_width = $('<input type="text" placeholder="boder-width">');
    this.border_color = $('<input type="text" placeholder="border-color">');
    this.border_type = $('<input type="text" placeholder="border-type">'); 
    this.class_wrapper = $('<div></div>');
    this.style = {};
    this.class_input = $('<input type="text" placeholder="class name">'); 
    this.selector_input = $('<input type="text" placeholder="selector">'); 
    this.apply_style = $('<button>Add Style</button>');
    this.editor = $('<div></div>');
    this.background_color = $('<input></input>');
    this.background_color_wrapper = $('<div></div>');
    this.mobile_view = $('<button>mobile</button>');
    this.desktop_view = $('<button>desktop</button>');
    this.editor_attributes = {'width':'20%','height':'100%'};
    this.editor_styles = {'right':'0%','top':'0%','overflow':'scroll','color':'white'};
}
VisualEditorUI.prototype = {
    init : function()
    {
        this.editor.addClass('visual_editor');
        this.editor.attr(this.editor_attributes);
        this.editor.css(this.editor_styles);
        $('body').append(this.editor);
        this.iframe_events();
        this.create_toolbar();
        this.iframe_wrapper.resizable(
            {
                alsoResize: this.iframe,
                handles: "e, w" 
            });
        this.editor.resizable();
        return this.editor;
    },
    iframe_events : function()
    {
        var self = this;
        this.iframe.load(function()
                         {
                            self.iframe.contents().find('head').append(self.style_script);
                            self.iframe.contents().find("body"). click(function(event){
                                event.stopPropagation();
                                self.removeStyleCurrentElements(self.current_elements);
                                self.cleanEditor();
                                self.current_elements = [];
                                self.style = {};
                                self.current_elements[0] = $(this);
                                self.highlightCurrentElements(self.current_elements);
                            });
                            self.iframe.contents().find("body").find('*').click(function(event){
                                event.stopPropagation();
                                self.cleanEditor();
                                self.removeStyleCurrentElements(self.current_elements);
                                self.current_elements = [];
                                self.style = {};
                                self.current_elements[0] = $(this);
                                self.highlightCurrentElements(self.current_elements);
                            });
                             self.iframe.contents().find("body").find('*').dblclick(function(event){
                                event.stopPropagation();
                                self.iframe.contents().find("body").find('*').attr('contenteditable','false');
                                $(this).attr('contenteditable','true'); 
                             });
                         });
    },
    highlightCurrentElements : function(current_elements)
    {
        this.iframe.contents().find("body").find('*').removeClass('highlight');
        for(var i=0;i<current_elements.length;i++)
        {
            current_elements[i].toggleClass('highlight');
        }
    },
    cleanEditor : function()
    {
        this.editor.find(':text').val('');
    },
    removeStyleCurrentElements : function(current_elements)
    {
        for (var key in this.style) 
        {
            if (this.style.hasOwnProperty(key))
                {
                    this.style[key] = '';
                }
        }
        for(var i=0;i<current_elements.length;i++)
        {
            current_elements[i].css(this.style);
        }            
    },
    addClassCurrentElements : function(current_elements,class_name)
    {
        for(var i=0;i<current_elements.length;i++)
        {
            current_elements[i].addClass(class_name);
        }        
    },
    createClassFromStyle : function()
    {
        var text = '.'+this.class_input.val()+'{';
        for (var key in this.style) 
        {
            if (this.style.hasOwnProperty(key))
                {
                    text = text + key+':'+this.style[key]+';'
                }
        }
        text = text + '}';
        return text;
        
    },
    create_toolbar : function()
    {
        this.create_views();
        this.class_input_option();
        this.important_option();
        this.create_padding_option();
        this.create_margin_option();
        this.background_color_option();
        this.border_option();
        this.border_radius_option();
    },
    important_option : function()
    {
        this.important_style_wrapper.append(this.important_style_check);
        this.important_style_wrapper.append('<label>Important</label>');
        this.editor.append(this.important_style_wrapper)
    },
    class_input_option : function()
    {
        var self = this;
        this.selector_input.keyup(function()
                               {
                                    //self.cleanEditor();
                                    //self.removeStyleCurrentElements(self.current_elements);
                                    var selector = $(this).val();
                                    var current_selection = [];
                                    try
                                    {
                                        current_selection = self.iframe.contents().find('body').find(selector);
                                    }
                                    catch(err)
                                    {
                                        console.log('there was an exception');
                                    }
                                    for(var i=0;i<current_selection.length;i++)
                                    {
                                        current_selection[i] = $(current_selection[i]);
                                    }
                                    self.current_elements = current_selection;
                                    self.highlightCurrentElements(self.current_elements);
                               });
        this.apply_style.click(function()
                               {  
                                  var text = self.createClassFromStyle();
                                  text = self.style_script.text() + text;
                                  self.style_script.text(text);
                                  console.log('the value of thne st is '+self.style_script.parent().tagName);
                                  self.addClassCurrentElements(self.current_elements,self.class_input.val());
                                  self.removeStyleCurrentElements(self.current_elements);
                                  console.log('I am going to apply style '+text); 
                               });
        this.class_wrapper.append(this.class_input);  
        this.class_wrapper.append(this.selector_input);
        this.class_wrapper.append(this.apply_style);
        this.editor.append(this.class_wrapper);
    },
    border_option : function()
    {
        this.border_wrapper.append(this.border_top);
        this.border_wrapper.append('<label>top-border</label');
        this.border_wrapper.append(this.border_right);
        this.border_wrapper.append('<label>right-border</label>');
        this.border_wrapper.append(this.border_left);
        this.border_wrapper.append('<label>left-border<label>');
        this.border_wrapper.append(this.border_bottom);
        this.border_wrapper.append('<label>bottom-border<label>');
        this.border_wrapper.append(this.border_all);
        this.border_wrapper.append('<label>all-border<label>');
        var self = this;
        this.border_width.keypress(function()
                                  {
                                      self.style[$('input[name=border]:checked').val()] = $(this).val();
                                      for(var i = 0;i<self.current_elements.length;i++)
                                      {
                                          self.current_elements[i].css(self.style);
                                      }
                                      
                                  });
        this.border_wrapper.append(this.border_width);
        this.border_color.keypress(function()
                                  {
                                      self.style[$('input[name=border]:checked').val()+'-color'] = $(this).val();
                                      var property = $('input[name=border]:checked').val()+'-color'
                                      for(var i = 0;i<self.current_elements.length;i++)
                                      {
                                           self.current_elements[i].css(self.style);
                                      }
                                  });
        this.border_wrapper.append(this.border_color);
        this.border_type.keypress(function()
                                  {
                                      self.style[$('input[name=border]:checked').val()+'-style'] = $(this).val();
                                      var property = $('input[name=border]:checked').val()+'-style'
                                      for(var i = 0;i<self.current_elements.length;i++)
                                      {
                                           self.current_elements[i].css(self.style);
                                      }
                                  });
        this.border_wrapper.append(this.border_type);
        this.editor.append(this.border_wrapper);
    },
    border_radius_option : function()
    {
        this.border_radius_wrapper.append(this.border_top_left_radius);
        this.border_radius_wrapper.append('<label>top-left-border-radius</label');
        this.border_radius_wrapper.append(this.border_top_right_radius);
        this.border_radius_wrapper.append('<label>top-right-border-radius</label>');
        this.border_radius_wrapper.append(this.border_bottom_left_radius);
        this.border_radius_wrapper.append('<label>bottom-left-border-radius<label>');
        this.border_radius_wrapper.append(this.border_bottom_right_radius);
        this.border_radius_wrapper.append('<label>bottom-right-border-radius<label>');
        this.border_radius_wrapper.append(this.border_all_radius);
        this.border_radius_wrapper.append('<label>all-border-radius<label>');
        this.border_radius.attr('placeholder','Enter border radius');
        var self = this;
        this.border_radius.keypress(function()
                                  {
                                      self.style[$('input[name=border-radius]:checked').val()] = $(this).val();
                                      for(var i = 0;i<self.current_elements.length;i++)
                                      {
                                           self.current_elements[i].css(self.style);
                                      }
                                      
                                  });
        this.border_radius_wrapper.append(this.border_radius);
        this.editor.append(this.border_radius_wrapper);
    },
    background_color_option : function()
    {
        this.background_color.attr('placeholder','background-color');
        var self = this;
        this.background_color.keyup(function()
                                   {
                                       var important = '';
                                       if(self.important_style_check.is(':checked'))
                                       {
                                           important = ' important!'
                                       }
                                       self.style['background-color'] = $(this).val()+important;
                                       for(var i = 0;i<self.current_elements.length;i++)
                                      {
                                           self.current_elements[i].css(self.style);
                                      }
                                       
                                   });
        this.background_color_wrapper.append($('<label>Background colour</label>'))
        this.background_color_wrapper.append(this.background_color);
        this.editor.append(this.background_color_wrapper);
    },
    create_views : function()
    {
        this.mobile_view.click($.proxy(function(){
            this.iframe.attr({'height':'100%','width':'30%'});
        },this));
        this.editor.append(this.mobile_view);
        this.desktop_view.click($.proxy(function(){
            this.iframe.attr({'height':'100%','width':'80%'});
        },this));
        this.editor.append(this.desktop_view);
    },
    create_padding_option : function()
    {
        var top = this.create_common_elements('table-row');
        var top_element = this.create_common_elements('table-column');
        top_element.append(this.padding_top);
        var self = this;
        this.padding_top.change(function(){
            self.style['padding-top'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        top.append(top_element);
        this.wrapper_padding.append(top);
        var center = this.create_common_elements('table-row');
        var center_element_left = this.create_common_elements('table-column');
        center_element_left.append(this.padding_left);
        this.padding_left.attr('placeholder','padding-left');
        this.padding_right.attr('placeholder','padding-right');
        this.padding_top.attr('placeholder','padding-top');
        this.padding_bottom.attr('placeholder','padding-bottom');
        this.padding_left.change(function(){
            self.style['padding-left'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        var center_element_right = this.create_common_elements('table-column');
        center_element_right.append(this.padding_right);
        this.padding_right.change(function(){
            self.style['padding-right'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        center.append(center_element_left);
        center.append(center_element_right);
        this.wrapper_padding.append(center);
        var bottom = this.create_common_elements('table-row');
        var bottom_element = this.create_common_elements('table-column');
        this.padding_bottom.change(function(){
            self.style['padding-bottom'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        bottom_element.append(this.padding_bottom);
        bottom.append(bottom_element);
        this.wrapper_padding.append(bottom);
        this.editor.append(this.wrapper_padding);
    },
    create_margin_option : function()
    {
        var top = this.create_common_elements('table-row');
        var top_element = this.create_common_elements('table-column');
        top_element.append(this.margin_top);
        var self = this;
        this.margin_top.change(function(){
            self.style['margin-top'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        top.append(top_element);
        this.wrapper_margin.append(top);
        var center = this.create_common_elements('table-row');
        var center_element_left = this.create_common_elements('table-column');
        center_element_left.append(this.margin_left);
        this.margin_left.attr('placeholder','margin-left');
        this.margin_right.attr('placeholder','margin-right');
        this.margin_top.attr('placeholder','margin-top');
        this.margin_bottom.attr('placeholder','margin-bottom');
        this.margin_left.change(function(){
            self.style['margin-left'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        var center_element_right = this.create_common_elements('table-column');
        center_element_right.append(this.margin_right);
        this.margin_right.change(function(){
            self.style['margin-right'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        center.append(center_element_left);
        center.append(center_element_right);
        this.wrapper_margin.append(center);
        var bottom = this.create_common_elements('table-row');
        var bottom_element = this.create_common_elements('table-column');
        this.margin_bottom.change(function(){
            self.style['margin-bottom'] = $(this).val();
            for(var i = 0;i<self.current_elements.length;i++)
            {
                self.current_elements[i].css(self.style);
            }
        });
        bottom_element.append(this.margin_bottom);
        bottom.append(bottom_element);
        this.wrapper_margin.append(bottom);
        this.editor.append(this.wrapper_margin);
    },
    create_common_elements : function(option)   
    {
        if(option == 'table-row')
        {
            return $('<tr></tr>');
        }
        if(option == 'table-column')
        {
            return $('<td></td>');
        }
    }
}