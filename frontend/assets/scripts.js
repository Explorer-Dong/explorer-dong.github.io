// ===== Theme Toggle =====
(function () {
    var STORAGE_KEY = 'theme';

    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'system';
    }

    function applyTheme(preference) {
        if (preference === 'light' || preference === 'dark') {
            document.documentElement.setAttribute('data-theme', preference);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    function nextTheme(current) {
        if (current === 'system') return 'light';
        if (current === 'light') return 'dark';
        return 'system';
    }

    function updateAriaLabel(toggle, preference) {
        var labels = {
            system: '主题：跟随系统，点击切换为浅色模式',
            light: '主题：浅色模式，点击切换为深色模式',
            dark: '主题：深色模式，点击切换为跟随系统'
        };
        toggle.setAttribute('aria-label', labels[preference] || labels.system);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Remove no-transition class after first paint
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                document.documentElement.classList.remove('no-transition');
            });
        });

        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        var current = getStoredTheme();
        applyTheme(current);
        updateAriaLabel(toggle, current);

        toggle.addEventListener('click', function () {
            var current = getStoredTheme();
            var next = nextTheme(current);
            localStorage.setItem(STORAGE_KEY, next);
            applyTheme(next);
            updateAriaLabel(toggle, next);
        });
    });
})();

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
