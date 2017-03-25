window.onload = function() {
    var curIframe,
        iframeType = '';

    if(curIframe = document.getElementById('aIframe')) {
        curIframe.src = "http://localhost:7678/cd_a.html";
        iframeType = 'cd_a';
    } else if(curIframe = document.getElementById('bIframe')) {
        curIframe.src = "http://localhost:7678/cd_b.html";
        iframeType = 'cd_b';
    }
    //需换成ie兼容的统一事件注册方式
    window.addEventListener('message', function(e) {
        var info = JSON.parse(e.data);
        if (info.type == 'scrolltop') {
            e.source.postMessage(JSON.stringify({
                seq: info.seq,
                scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
                //屏幕可视区高度  ie8 似乎不兼容
                pageHeight: window.innerHeight || 300
            }), '*');
            //console.log(window.innerHeight);
        } else if (info.type == 'resize') {
            curIframe.width = info.w;
            curIframe.height = info.h;
        } else if(info.type == 'iframesrc') {
            e.source.postMessage(JSON.stringify({
                seq: info.seq,
                iframeSrc: iframeType,
                href: 'baidu.com'
            }), '*');
        } else if (info.linkType) {
            console.log(info.linkType, info.originUrl);
            var jumpUrl = info.linkType == 'a' ?
                ('http://localhost:8999/a.html#' + info.originUrl) : ('http://localhost:8999/b.html#' + info.originUrl);
            //location.href = jumpUrl;
        }
    })

};