var VisualEditor = function()
{
    this.iframe = $('<iframe></iframe>');
    this.iframe_attributes = {'width':'80%','height':'100%','display':'inline-block'};
    this.ui = new VisualEditorUI(this.iframe);
}
VisualEditor.prototype = {
    init : function()
    {
        var url = document.URL;
        this.iframe.attr('src',url);
        this.iframe.attr(this.iframe_attributes);
        $('body').html('');
        $('body').append(this.iframe);
        this.ui.init();
    }
}