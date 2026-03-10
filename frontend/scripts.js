// 外部链接自动添加 target="_blank"
document.addEventListener('DOMContentLoaded', function () {
    var currentHost = window.location.hostname;

    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        var linkHost = new URL(link.href).hostname;
        if (linkHost !== currentHost) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});

// 百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?56e04b82ea944342458b4f274efd5bc1";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
