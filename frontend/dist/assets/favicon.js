// ===== Favicon Fetcher =====
// Fetch each card's site HTML, parse <link rel="icon"> and display the favicon.
// Requires CORS to be configured on target domains.
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var cards = document.querySelectorAll('.card[href]');

        cards.forEach(function (card) {
            var placeholder = card.querySelector('.card-favicon-placeholder');
            var override = card.getAttribute('data-favicon');

            if (override) {
                applyFavicon(override, placeholder);
            } else {
                var url = card.href;
                var origin = new URL(url).origin;
                fetchFavicon(origin).then(function (faviconUrl) {
                    applyFavicon(faviconUrl, placeholder);
                });
            }
        });
    });

    function applyFavicon(faviconUrl, placeholder) {
        if (!faviconUrl) {
            if (placeholder) {
                placeholder.style.animation = 'none';
                placeholder.style.background = 'none';
            }
            return;
        }
        var img = document.createElement('img');
        img.className = 'card-favicon';
        img.alt = '';
        img.onload = function () {
            if (placeholder) {
                placeholder.classList.add('loaded');
                placeholder.appendChild(img);
            }
        };
        img.onerror = function () {
            if (placeholder) {
                placeholder.style.animation = 'none';
                placeholder.style.background = 'none';
            }
        };
        img.src = faviconUrl;
    }

    function fetchFavicon(origin) {
        return fetch(origin + '/', { mode: 'cors' })
            .then(function (res) {
                if (!res.ok) throw new Error(res.status);
                return res.text();
            })
            .then(function (html) {
                return parseFaviconFromHTML(html, origin);
            })
            .catch(function () {
                // Fallback: use Google's favicon service when CORS blocks direct fetch
                var domain = new URL(origin).hostname;
                return 'https://www.google.com/s2/favicons?sz=64&domain=' + domain;
            });
    }

    function parseFaviconFromHTML(html, origin) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var link = doc.querySelector(
            'link[rel="icon"], link[rel="shortcut icon"], link[rel~="icon"]'
        );

        if (!link || !link.getAttribute('href')) {
            return origin + '/favicon.ico';
        }

        var href = link.getAttribute('href');

        // Data / Blob URI — use as-is
        if (href.startsWith('data:') || href.startsWith('blob:')) {
            return href;
        }

        // Absolute URL
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
            return href.startsWith('//') ? 'https:' + href : href;
        }

        // Root-relative
        if (href.startsWith('/')) {
            return origin + href;
        }

        // Relative path
        return origin + '/' + href;
    }
})();
