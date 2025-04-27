// 首页脚本
(function () {
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        /* 首页屏宽变窄
        // 创建 <style> 标签并注入 CSS
        const style = document.createElement('style');
        style.textContent = `
            .md-content:not(.mermaid) {
                max-width: 1024px !important;
                margin-left: auto !important;
                margin-right: auto !important;
            }
        `;

        // 插入到 <head> 最前面，确保优先级
        document.head.insertBefore(style, document.head.firstChild);
        */

        // 微软站长验证
        var metaTag = document.createElement('meta');
        metaTag.name = 'msvalidate.01';
        metaTag.content = '1081A53FC99773039D9265F944693B5A';
        
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(metaTag);
    }
})();