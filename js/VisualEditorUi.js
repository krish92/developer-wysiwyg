var VisualEditorUI = function(iframe,iframe_wrapper,media_size_options)
{
    this.current_elements_wrappers = [];
    this.temp_styles_script = $('#temp_styles_script');
    this.animation_wrapper = $('<div></div>');
    this.animation_timer = $('<div></div>');
    this.animation_time_input = $('<input type="text" placeholder="animation time">');
    this.animation_add_animation_time_button = $('<button>ok</button>');
    this.animation_cancel_animation_time_button = $('<button>cancel</button>');
    this.animation_ok_button = $('<button>Ok</button>');
    this.animation_cancel_button = $('<button>Cancel</button>');
    this.animation_style = {};
    this.animation_style.time_frame = [];
    this.media_size_options = media_size_options;
    this.iframe_wrapper = iframe_wrapper;
    this.iframe = iframe;
    this.current_elements = [];
    this.class_text = null;
    this.style_script = $('<style></style>');
    this.wrapper_padding= $('<table class="padding_wrapper"></table>');
    this.padding_left = $('<input  type="text"></input>');
    this.padding_right = $('<input  type="text"></input>');
    this.padding_top = $('<input  type="text" class="move-right"></input>');
    this.padding_bottom = $('<input  type="text" class="move-right"></input>');
    this.wrapper_margin= $('<table class="margin_wrapper"></table>');
    this.margin_left = $('<input  type="text"></input>');
    this.margin_right = $('<input  type="text"></input>');
    this.margin_top = $('<input  type="text"  class="move-right"></input>');
    this.margin_bottom = $('<input  type="text" class="move-right"></input>');
    this.border_radius_wrapper = $('<div class="border_radius_wrapper"></div>');
    this.border_top_left_radius = $('<input type="radio" name="border-radius" value="border-top-left-radius">');
    this.border_top_right_radius = $('<input type="radio" name="border-radius" value="border-top-right-radius">');  
    this.border_bottom_left_radius = $('<input type="radio" name="border-radius" value="border-bottom-left-radius">');
    this.border_bottom_right_radius = $('<input type="radio" name="border-radius" value="border-bottom-right-radius">');
    this.important_style_check = $('<input type="checkbox">');
    this.important_style_wrapper = $('<div class="important_style_wrapper"></div>');
    this.border_all_radius = $('<input type="radio" name="border-radius" value="border-radius">');
    this.border_radius = $('<input  type="text"></input>');
    this.border_wrapper = $('<div class="border_wrapper"></div>');
    this.border_width = $('<input type="text" placeholder="width">');
    this.border_color = $('<input type="text" placeholder="color">');
    this.border_type = $('<input type="text" placeholder="type">'); 
    this.font_wrapper = $('<div class="font_wrapper"></div>');
    this.font_color = $('<input type="text" placeholder="font-color">');
    this.font_size = $('<input type="text" placeholder="font-size">');
    this.font_weight = $('<select name="font-weight"></select>');
    this.border_left = $('<input type="radio" name="border" value="border-left">');
    this.border_right = $('<input type="radio" name="border" value="border-right">');  
    this.border_bottom= $('<input type="radio" name="border" value="border-bottom">');
    this.border_top = $('<input type="radio" name="border" value="border-top">');
    this.border_all = $('<input type="radio" name="border" value="border">');
    this.font_weight_normal = $('<option value="normal">Normal</option>');
    this.font_weight_bold = $('<option value="bold">Bold</option>');
    this.font_weight_bolder = $('<option value="bolder">Bolder</option>');
    this.font_weight_lighter = $('<option value="lighter">Lighter</option>');
    this.position_wrapper = $('<div class="position_wrapper"></div>');
    this.position_select = $('<select name="position"></select>');
    this.position_static = $('<option value="static">Static</option>');
    this.position_absolute = $('<option value="absolute">Absolute</option>');
    this.position_fixed = $('<option value="fixed">Fixed</option>');
    this.position_relative = $('<option value="relative">relative</option>');
    this.zIndex_wrapper = $('<div class="zindex_wrapper"></div>');
    this.zIndex_input = $('<input type="text" placeholder="z-Index">');
    this.cursor_wrapper = $('<div class="cursor_wrapper"></div>');
    this.cursor_select = $('<select name="position"></select>');
    this.cursor_default = $('<option value="default">Default</option>');
    this.cursor_crosshair = $('<option value="crosshair">Crosshair</option>');
    this.cursor_help = $('<option value="help">Help</option>');
    this.cursor_move = $('<option value="move">Move</option>');
    this.cursor_pointer = $('<option value="pointer">Pointer</option>');
    this.cursor_text = $('<option value="text">Text</option>');
    this.opacity_wrapper = $('<div class="opacity_wrapper"></div>');
    this.opacity_input = $('<input type="text" placeholder="opacity">');
    this.overflow_select = $('<select name="overflow"></select>');
    this.overflow_wrapper = $('<div class="overflow_wrapper"></div>');
    this.overflow_visible = $('<option value="visible">Visible</option>');
    this.overflow_hidden = $('<option value="hidden">Hidden</option>');
    this.overflow_scroll = $('<option value="scroll">Scroll</option>');
    this.overflow_auto = $('<option value="auto">Auto</option>');
    this.height_width_wrapper = $('<div class="height_width_wrapper"></div>');
    this.height_input = $('<input type="text" placeholder="height">');
    this.width_input = $('<input type="text" placeholder="width">');
    this.display_select = $('<select name="display"></select>');
    this.display_wrapper = $('<div class="display_wrapper"></div>');
    this.display_inline = $('<option value="inline">Inline</option>');
    this.display_block = $('<option value="block">Block</option>');
    this.display_none = $('<option value="none">None</option>');
    this.line_height = $('<input type="text" placeholder = "Line Height">');
    this.line_height_wrapper = $('<div class="line_height_wrapper"></div>');
    this.class_wrapper = $('<div class="class_wrapper"></div>');
    this.simple_div_wrapper = $('<div></div>');
    this.style = {};
    this.class_input = $('<input type="text" placeholder="class name">'); 
    this.selector_input = $('<input type="text" placeholder="selector">'); 
    this.apply_style = $('<button>Add Style</button>');
    this.editor = $('<div></div>');
    this.background_color = $('<input  type="text"></input>');
    this.background_color_wrapper = $('<div class="background_color_wrapper"></div>');
    this.mobile_view = $('<button>mobile</button>');
    this.desktop_view = $('<button>desktop</button>');
    this.editor_attributes = {'width':'20%','height':'100%'};
    this.editor_styles = {'right':'0%','top':'0%','overflow':'scroll'};
    this.offset_x = null;
    this.offset_y = null;
    this.event_target = null;
    this.add_element_wrapper = $('<div></div>');
    this.add_button = $('<button>Button</button>');
    this.add_heading = $('<button>H1</button>');
}
VisualEditorUI.prototype = {
    init : function()
    {
        $('body').append(this.editor);
        this.iframe_events();
        this.create_toolbar();
        this.iframe_wrapper.resizable(
            {
                alsoResize: this.iframe,
                handles: "e, w" 
            });
        this.editor.resizable();
        this.editor.find('[type=text]').addClass('ui mini input');
        this.editor.find( "[type=checkbox]" ).addClass('ui radio checkbox');
        this.editor.find('button').addClass('mini ui green button');
        this.editor.addClass('ui vertical demo sidebar menu');
        return this.editor;
    },
    iframe_events : function()
    {
        var self = this;
        self.iframe.contents().find('head').append(self.style_script);
        self.iframe.contents().find("body"). click(function(event){
            event.stopPropagation();
            self.removeStyleCurrentElements(self.current_elements);
            self.cleanEditor();
            self.current_elements = [];
            self.style = {};
            self.current_elements[0] = $(this);
            self.highlightCurrentElements(self.current_elements);
            self.event_target = $(this);
            console.log('I am in setting target');
            self.offset_x = event.pageX;
            self.offset_y = event.pagey;
        });
        self.iframe.contents().find("body").on('click','*',function(event){
            event.stopPropagation();
            self.cleanEditor();
            self.removeStyleCurrentElements(self.current_elements);
            self.current_elements = [];
            self.style = {};
            self.current_elements[0] = $(this);
            self.highlightCurrentElements(self.current_elements);
            self.event_target = $(this);
            console.log('I am in setting target');
            self.offset_x = event.pageX;
            self.offset_y = event.pagey
        });
        self.iframe.contents().find("body").find('*').on('dblclick','*',function(event)
                                                               {
                                                                 event.stopPropagation();
                                                      console.log('I am in dbclick>>>>>>>>>>>>>');            self.iframe.contents().find("body").find('*').attr('contenteditable','false');
                                                                   self.iframe.contents().find("body").attr('contenteditable','false');
                                                                   $(this).attr('contenteditable','true');
                                                                   console.log('The va.kue is '+$(this).attr('contenteditable'));
                                                               });

        self.iframe.contents().find("body").on('dblclick','*',function(event)
                                                               {
                                                                 event.stopPropagation();
                                                                console.log('I am in dbclick>>>>>>>>>>>>>');    self.iframe.contents().find("body").find('*').attr('contenteditable','false');
                                                                   $(this).attr('contenteditable','true');
                                                               });


    },
    highlightCurrentElements : function(current_elements)
    {
        this.iframe.contents().find("body").find('*').removeClass('highlight');
        for(var i=0;i<current_elements.length;i++)
        {
//           current_elements[i].fadeOut(200).fadeIn(200);
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
    add_class_animation : function()
    {    
        for(var i=0;i<this.current_elements.length;i++)
        {
            this.current_elements[i].addClass(this.animation_style.classname);
        }    
    },
    createClassFromStyle : function()
    {
        var text = '@media (';
        for(var i=0;i<this.media_size_options.length;i++)
        {
            if((this.iframe.width() <= this.media_size_options[i]['max-width']) && (this.iframe.width() > this.media_size_options[i]['min-width']) )
            {
                console.log('I have been attained');
                text = text +'max-width : '+this.media_size_options[i]['max-width']+'px) and (min-width : '+this.media_size_options[i]['min-width']+'px) {';
            }
        }
        text = text + '.'+this.class_input.val()+'{';
        for (var key in this.style) 
        {
            if (this.style.hasOwnProperty(key))
                {
                    text = text + key+':'+this.style[key]+';'
                }
        }
        text = text + '}';
        text = text + '}';
        console.log('the value of the media is >>>>>>>>'+text);
        return text;
        
    },
    create_toolbar : function()
    {
        //this.create_views();
        this.class_input_option();
        this.important_option();
        this.add_element_option();
        //this.animation_option();
        this.create_padding_option();
        this.create_margin_option();
        this.background_color_option();
        this.border_option();
        //this.create_border_option();
        this.border_radius_option();
        this.font_option();
        this.position_option();
        this.zIndex_option();
        this.opacity_option();
        this.cursor_option();
        this.overflow_option();
        this.height_width_option();
        this.display_option();
        this.line_height_option();
    },
    important_option : function()
    {
        this.important_style_wrapper.append(this.important_style_check);
        this.important_style_wrapper.addClass('item');
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
                                   console.log('style script is '+text);
                                  self.style_script.text(text);
                                  console.log('the value of thne st is ',self.style_script);
                                  self.addClassCurrentElements(self.current_elements,self.class_input.val());
                                  self.removeStyleCurrentElements(self.current_elements);
                                  console.log('I am going to apply style '+text); 
                               });
        this.class_wrapper.append('<label>Class Name</label>');
        this.class_wrapper.append(this.class_input);
        this.class_wrapper.append('<label>Selector Name</label>');  
        this.class_wrapper.append(this.selector_input);
        this.class_wrapper.append(this.apply_style);
        this.class_wrapper.addClass('item');
        this.editor.append(this.class_wrapper);
    },
    border_option : function()
    {   
        this.border_wrapper.prepend("<label class='border_header'>Border</label>");
        this.border_wrapper.append(this.border_top);
        this.border_wrapper.append('<label>top-border</label><br>');
        this.border_wrapper.append(this.border_right);
        this.border_wrapper.append('<label>right-border</label><br>');
        this.border_wrapper.append(this.border_left);
        this.border_wrapper.append('<label>left-border</label><br>');
        this.border_wrapper.append(this.border_bottom);
        this.border_wrapper.append('<label>bottom-border</label><br>');
        this.border_wrapper.append(this.border_all);
        this.border_wrapper.append('<label>all-border</label><br>');
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
        this.border_wrapper.addClass('item');
        this.editor.append(this.border_wrapper);
    },
    border_radius_option : function()
    {
        this.border_radius_wrapper.append("<label class='header'>Border Radius</label>");
        this.border_radius_wrapper.append(this.border_top_left_radius);
        this.border_radius_wrapper.append('<label>top-left-border-radius</label><br>');
        this.border_radius_wrapper.append(this.border_top_right_radius);
        this.border_radius_wrapper.append('<label>top-right-border-radius</label><br>');
        this.border_radius_wrapper.append(this.border_bottom_left_radius);
        this.border_radius_wrapper.append('<label>bottom-left-border-radius</label><br>');
        this.border_radius_wrapper.append(this.border_bottom_right_radius);
        this.border_radius_wrapper.append('<label>bottom-right-border-radius</label><br>');
        this.border_radius_wrapper.append(this.border_all_radius);
        this.border_radius_wrapper.append('<label>all-border-radius</label><br>');
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
        this.border_radius_wrapper.addClass('item');
        this.border_radius_wrapper.append(this.border_radius);
        this.editor.append(this.border_radius_wrapper);
    },
    animation_option : function()
    {
        this.animation_timer.slider({
          range: "max",
          min: 0,
          max: 100,
          value: 1
        });
        this.animation_wrapper.append(this.animation_timer);
        this.animation_wrapper.append(this.animation_time_input);
        this.animation_ok_button.click($.proxy(function(){
            if(this.animation_time_input.val() == '')
            {
               this.cleanEditor();
            }
            else
            {
                this.animation_style.classname = this.class_input.val();
                this.animation_style.time = this.animation_time_input.val();
                this.add_class_animation();
                console.log('the value of the css is ',this.animation_style);  
            }    
        },this));
        this.animation_add_animation_time_button.click($.proxy(function()
                                       {
                                            var style_object = {};
                                            style_object.percentage = this.animation_timer.slider('value');
                                            style_object.style = JSON.parse(JSON.stringify(this.style));
                                            this.animation_style.time_frame[this.animation_style.time_frame.length] = style_object;  
                                       },this));
        this.animation_wrapper.append(this.animation_add_animation_time_button);
        this.animation_wrapper.append(this.animation_cancel_animation_time_button);
        this.animation_wrapper.append(this.animation_ok_button);
        this.animation_wrapper.append(this.animation_cancel_button);
        this.editor.append(this.animation_wrapper);
    },
    background_color_option : function()
    {
        this.background_color.attr('placeholder','BG Color');
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
        this.background_color_wrapper.addClass('item');
        this.background_color_wrapper.append($('<label>Background colour</label>'))
        this.background_color_wrapper.append(this.background_color);
        this.editor.append(this.background_color_wrapper);
    },
    font_option : function()
    {   this.font_wrapper.append('<br /><label>font-size</label>');
        this.font_wrapper.append(this.font_size);
        this.font_wrapper.append('<br /><label>font-color</label>');
        this.font_wrapper.append(this.font_color);
        this.font_wrapper.append('<br /><label>font-weight</label>');
        this.font_weight.append(this.font_weight_normal); 
        this.font_weight.append(this.font_weight_bold);
        this.font_weight.append(this.font_weight_bolder);
        this.font_weight.append(this.font_weight_lighter);
        this.font_wrapper.append(this.font_weight);
        var self = this;
        this.font_size.keyup(function()
                             {
                                    self.style['fontSize'] = $(this).val();
                                    for(var i = 0;i<self.current_elements.length;i++)
                                    {
                                           self.current_elements[i].css(self.style);
                                    }
                             });
        this.font_color.keyup(function()
                             {
                                    self.style['color'] = $(this).val();
                                    for(var i = 0;i<self.current_elements.length;i++)
                                    {
                                           self.current_elements[i].css(self.style);
                                    }
                             });
        this.font_weight.change(function()
                                {
                                    self.style['fontWeight'] = $(this).val();
                                    for(var i = 0;i<self.current_elements.length;i++)
                                    {
                                           self.current_elements[i].css(self.style);
                                    }
                                    
                                });
        this.font_wrapper.addClass('item');
        this.editor.append(this.font_wrapper);
        
    },
    position_option : function(){
        this.position_wrapper.append('<label>Position</label>');
        this.position_select.append(this.position_static);
        this.position_select.append(this.position_relative);
        this.position_select.append(this.position_fixed);
        this.position_select.append(this.position_absolute);
        this.position_wrapper.append(this.position_select);
        var self = this;
        this.position_select.change(function()
                        {
                            self.style['position'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                            
                        });
        this.position_wrapper.addClass('item');
        this.editor.append(this.position_wrapper);
    },    
    zIndex_option : function(){
        this.zIndex_wrapper.append('<label>zIndex</label>');
        this.zIndex_wrapper.append(this.zIndex_input);
        var self = this;
        this.zIndex_input.keyup(function()
                        {
                            self.style['z-Index'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                            
                        });
        this.zIndex_wrapper.addClass('item');
        this.editor.append(this.zIndex_wrapper);
        
    },
    opacity_option : function(){
        this.opacity_wrapper.append('<label>Opacity</label>');
        this.opacity_wrapper.append(this.opacity_input);
        var self = this;
        this.opacity_input.keyup(function()
                        {
                            self.style['opacity'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                            
                        });
        this.opacity_wrapper.addClass('item');
        this.editor.append(this.opacity_wrapper);
    },
    line_height_option : function(){
        this.line_height_wrapper.append('<label>Line Height</label>');
        this.line_height_wrapper.append(this.line_height);
        var self = this;
        this.line_height.keyup(function()
                {
                    self.style['lineHeight'] = $(this).val();
                    for(var i = 0;i<self.current_elements.length;i++)
                    {
                           self.current_elements[i].css(self.style);
                    }
                    
                });
        this.line_height_wrapper.addClass('item');
        this.editor.append(this.line_height_wrapper);
        
    },
    add_element_option : function(){
        this.add_element_wrapper.append('<label>Add Element</label>');
        this.add_element_wrapper.append(this.add_button);
        this.add_element_wrapper.append(this.add_heading);
        var self = this;
        this.add_button.click($.proxy(function()
                {
                    var temp = $('<button>Button</button>');
                    console.log('the value of the current target is ',self.event_target);
                    this.event_target.append(temp);
                    temp.offset({ top: this.offset_y, left: this.offset_x });
                    temp.dblclick(function(event)
                                                               {
                                                                 event.stopPropagation();
                                                      console.log('I am in dbclick>>>>>>>>>>>>>');            self.iframe.contents().find("body").find('*').attr('contenteditable','false');
                                                                   self.iframe.contents().find("body").attr('contenteditable','false');
                                                                   $(this).attr('contenteditable','true');
                                                                   console.log('The va.kue is '+$(this).attr('contenteditable'));
                                                               });

                },this));
        this.add_heading.click($.proxy(function()
                {
                    var temp = $('<h1>Heading</h1>');
                    console.log('the value of the current target is ',self.event_target);
                    this.event_target.append(temp);
                    temp.offset({ top: this.offset_y, left: this.offset_x });
                    temp.dblclick(function(event)
                                                               {
                                                                 event.stopPropagation();
                                                      console.log('I am in dbclick>>>>>>>>>>>>>');            self.iframe.contents().find("body").find('*').attr('contenteditable','false');
                                                                   self.iframe.contents().find("body").attr('contenteditable','false');
                                                                   $(this).attr('contenteditable','true');
                                                                   console.log('The va.kue is '+$(this).attr('contenteditable'));
                                                               });

                },this));
        this.add_element_wrapper.addClass('item');
        this.editor.append(this.add_element_wrapper);

    },
    height_width_option : function(){
        this.height_width_wrapper.append('<label>Height</label>');
        this.height_width_wrapper.append(this.height_input);
        this.height_width_wrapper.append('<label>Width</label>');
        this.height_width_wrapper.append(this.width_input);
        var self = this;
        this.height_input.keyup(function()
                     {
                            self.style['height'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                     });
        this.width_input.keyup(function()
                     {
                            self.style['width'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                     });
        this.height_width_wrapper.addClass('item');
        this.editor.append(this.height_width_wrapper);
        
    },
    display_option : function(){
        this.display_wrapper.append('<label>Display</label>');
        this.display_select.append(this.display_inline);
        this.display_select.append(this.display_block);
        this.display_select.append(this.display_none);
        this.display_wrapper.append(this.display_select);
        var self = this;
        this.display_select.change(function()
                        {
                            self.style['display'] = $(this).val();
                            for(var i = 0;i<self.current_elements.length;i++)
                            {
                                   self.current_elements[i].css(self.style);
                            }
                        });
        this.display_wrapper.addClass('item');
        this.editor.append(this.display_wrapper);
        
    },
    overflow_option : function(){
        this.overflow_wrapper.append('<label>Overflow</label>');
        this.overflow_select.append(this.overflow_visible);
        this.overflow_select.append(this.overflow_hidden);
        this.overflow_select.append(this.overflow_scroll);
        this.overflow_select.append(this.overflow_auto);
        this.overflow_wrapper.append(this.overflow_select);
        var self = this;
        this.overflow_select.change(function()
                                {
                                    self.style['overflow'] = $(this).val();
                                    for(var i = 0;i<self.current_elements.length;i++)
                                    {
                                           self.current_elements[i].css(self.style);
                                    }
                                });
        this.overflow_wrapper.addClass('item');
        this.editor.append(this.overflow_wrapper);
    },
    cursor_option : function(){
        this.cursor_wrapper.append('<label>Cursor</label>');
        this.cursor_select.append(this.cursor_default);
        this.cursor_select.append(this.cursor_crosshair);
        this.cursor_select.append(this.cursor_help);
        this.cursor_select.append(this.cursor_move);
        this.cursor_select.append(this.cursor_pointer);
        this.cursor_select.append(this.cursor_text);
        this.cursor_wrapper.append(this.cursor_select);
        var self = this;
        this.cursor_select.change(function()
                                {
                                    self.style['cursor'] = $(this).val();
                                    for(var i = 0;i<self.current_elements.length;i++)
                                    {
                                           self.current_elements[i].css(self.style);
                                    }
                                });
        this.cursor_wrapper.addClass('item');
        this.editor.append(this.cursor_wrapper);  
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
        top.prepend($("<td />"));
        top.append(top_element);
        this.wrapper_padding.append(top);
        var center = this.create_common_elements('table-row');
        var center_element_left = this.create_common_elements('table-column');
        center_element_left.append(this.padding_left);
        this.wrapper_padding.prepend('<label>Padding</label>');
        this.padding_left.attr('placeholder','Left');
        this.padding_right.attr('placeholder','Right');
        this.padding_top.attr('placeholder','Top');
        this.padding_bottom.attr('placeholder','Bot.');
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
        center.append($("<td />"));
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
        bottom.prepend($("<td />"));
        bottom_element.append(this.padding_bottom);
        bottom.append(bottom_element);
        this.wrapper_padding.append(bottom);
        this.wrapper_padding.addClass('item');
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
        top.prepend($("<td />"));
        top.append(top_element);
        this.wrapper_margin.append(top);
        var center = this.create_common_elements('table-row');
        var center_element_left = this.create_common_elements('table-column');
        center_element_left.append(this.margin_left);
        this.wrapper_margin.prepend('<label>Margin</label>');
        this.margin_left.attr('placeholder','Left');
        this.margin_right.attr('placeholder','Right');
        this.margin_top.attr('placeholder','Top');
        this.margin_bottom.attr('placeholder','Bot.');
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
        center.append($("<td />"));
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
        bottom.prepend($("<td />"));
        bottom_element.append(this.margin_bottom);
        bottom.append(bottom_element);
        this.wrapper_margin.append(bottom);
        this.wrapper_margin.addClass('item');
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
