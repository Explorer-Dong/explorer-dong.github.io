// ===== Favicon Fetcher =====
// Fetch each card's site HTML, parse <link rel="icon"> and display the favicon.
// Requires CORS to be configured on target domains.
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var cards = document.querySelectorAll('.card[href]');

        cards.forEach(function (card) {
            var url = card.href;
            var origin = new URL(url).origin;

            fetchFavicon(origin).then(function (faviconUrl) {
                if (!faviconUrl) return;
                var img = document.createElement('img');
                img.className = 'card-favicon';
                img.src = faviconUrl;
                img.alt = '';
                img.width = 32;
                img.height = 32;
                card.appendChild(img);
            });
        });
    });

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
                // Fallback: try the conventional /favicon.ico path
                return origin + '/favicon.ico';
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
