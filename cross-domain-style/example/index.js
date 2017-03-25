// need jquery or zepto support

web.isIframe = window.parent !== window;

$(function () {

    if(web.isIframe && window.top) {

        var channel = (function() {
            var callbacks = {}
            var seq = 0;

            window.addEventListener('message', function(e) {
                var info = JSON.parse(e.data)

                var callback = callbacks[info.seq]

                if (callback) {
                    callback(info)
                    delete callbacks[seq]
                }
            })

            return function(type, data, callback) {
                seq++
                data.type = type
                data.seq = seq
                window.top.postMessage(JSON.stringify(data), '*')

                callback && (callbacks[seq] = callback)
            }
        })();

        channel('iframesrc', {}, function(result) {
            var sel = '',
                iframeType = 0;

            if(result.iframeSrc === 'cd_a') {
                sel = '.iframe .main-page';
                // 不同的页面类型
                iframeType = 0;
                // 根路径需从外部获取
                web.config.cultureUrl = result.href;
            } else if(result.iframeSrc === 'cd_b') {
                sel = '.iframe .main-page .main-middle';
                // 不同的页面类型
                iframeType = 1;
            } else {
                return;
            }

            var $mainContainer = null;

            var prevWidth, prevHeight;
            var checkSize = function() {
                var width = 1020;
                if (!$mainContainer) {
                    $mainContainer = $(sel)[0];
                    if (!$mainContainer) {
                        return;
                    }
                }
                // 高度微调整
                if(iframeType == 0) {
                    if($mainContainer.clientHeight < 400) return;
                    var height =  $mainContainer.clientHeight - 58;
                    // 默认高度，微调整
                    height < 600 && (height = 600);
                } else {
                    if($mainContainer.clientHeight < 140) return;
                    var height =  $mainContainer.clientHeight - 12;
                }

                if (prevHeight != height || prevWidth != width) {
                    channel('resize', {w: width, h: height});

                    prevHeight = height;
                    prevWidth = width;
                }
            };

            checkSize();
            setInterval(checkSize, 150);
        });

        // iframe全局弹窗位置调整函数. data参数用于自定义高度
        window.web.setMsgPosition = function(type, data) {
            if(!web.isIframe) return;
            var callback = function() {};
            type || (type = 1);
            // web.alert confirm
            if(type == 1) {
                callback = function(result) {
                    var $dialogParent = $('.dialog-parent');
                    $dialogParent.css('background', 'rgba(0, 0, 0, 0.3)');
                    $dialogParent.show();
                    var $dialog = $dialogParent.children('.dialog');
                    (result.pageHeight > 300) || (data = -20);
                    $dialog.css("marginTop", result.scrollTop + (data || result.pageHeight/5));

                };
            } else if (type == 2) {
                // web.message   tip
                callback = function(result) {
                    var $toptip = $('.top-tip');
                    $toptip.css("position", "absolute");
                    (result.pageHeight > 225) || (data = 1);
                    $toptip.css("top", result.scrollTop + (data || result.pageHeight/3));
                    $toptip.show();
                };
            }
            channel('scrolltop', {}, callback);
        };

    }
});