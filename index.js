// Based on my fiddle http://jsfiddle.net/xgrommx/577pn/5
function getEmbeddedPlayer(url, height, width){
    height = height || '100%';
    width = width || '100%';

    var output = '';
    var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
    var vimeoUrl = url.match(/^https?:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
    var wistiaUrl = url.match(/^https?:\/\/(?:(\w+)\.)?wistia\.com\/(medias\/)?(\w+)$/);



    var style = "border: none;position: absolute;top: 0;left: 0;width: " + width + ";height: " + height;

    if( youtubeUrl ){
        output = '<iframe style="' + style + '" src="https://www.youtube.com/embed/'+youtubeUrl[1]+'?rel=0" frameborder="0" allowfullscreen>';
    }else if(vimeoUrl){
        output =  '<iframe style="' + style + '" src="https://player.vimeo.com/video/'+vimeoUrl[3]+'" frameborder="0"></iframe>';
    }else if (wistiaUrl) {
//div approach

        output =  '<script src="https://fast.wistia.com/embed/medias/'+wistiaUrl[3]+'.jsonp" async></script>';
        output += '<script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>';
        // output += '<div class="wistia_responsive_padding" style="padding:64.06% 0 0 0;position:relative;>';
            output += '<div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">';
                output += '<div class="wistia_embed wistia_async_'+wistiaUrl[3]+' seo=false videoFoam=true" style="height:100%;width:100%">&nbsp;</div>';
            output += '</div>';
        // output += '</div>';

        //iframe
        //output = '<iframe src="https://fast.wistia.net/embed/iframe/'+wistiaUrl[3]+'?seo=false&videoFoam=true" title="Wistia video player" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="100%" height="100%"></iframe><script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>';
    }else{
        output = '<p>No video url found - vimeo and youtube supported</p>';
    }
    return '<div style="position: relative;padding-bottom: 64%;padding-top: 0px;height: 0;">' + output + '</div>';
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
