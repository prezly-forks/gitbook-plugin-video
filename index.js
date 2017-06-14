// Based on my fiddle http://jsfiddle.net/xgrommx/577pn/5
function getEmbeddedPlayer(url, height, width){
    height = height || '100%';
    width = width || '100%';

    var output = '';
    var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
    var vimeoUrl = url.match(/^https?:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
    var wistiaUrl = url.match(/^https?:\/\/(www\.)?wistia\.com\/(medias\:)?(\w+).*$/);

    var style = "border: none;position: absolute;top: 0;left: 0;width: " + width + ";height: " + height;

    if( youtubeUrl ){
        output = '<iframe style="' + style + '" src="https://www.youtube.com/embed/'+youtubeUrl[1]+'?rel=0" frameborder="0" allowfullscreen>';
    }else if(vimeoUrl){
        output =  '<iframe style="' + style + '" src="https://player.vimeo.com/video/'+vimeoUrl[3]+'" frameborder="0"></iframe>';
    }else if (wistiaUrl) {
        output =  '<script src="https://fast.wistia.com/embed/medias/3mki34ur34.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:82.19% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_3mki34ur34 seo=false videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>';
    }else{
        output = '<p>No video url found - vimeo and youtube supported</p>';
    }
    return '<div style="position: relative;padding-bottom: 56.25%;padding-top: 25px;height: 0;">' + output + '</div>';
}

module.exports = {
    blocks: {
        video: {
            process: function(block) {
                return getEmbeddedPlayer(block.body);
            }
        }
    }
};
