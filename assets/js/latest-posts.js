// Renders the latest posts from the Blogger feed into #latest-posts.
(function () {
  var container = document.getElementById('latest-posts');
  if (!container) return;

  var BLOG = 'https://cd7z.blogspot.com';
  var FEED = BLOG + '/feeds/posts/summary?alt=json&max-results=6';

  // Blogger feeds normally allow cross-origin fetch; fall back to JSONP if not.
  function loadJsonp(url) {
    return new Promise(function (resolve, reject) {
      var name = '__blogFeed' + Date.now();
      var script = document.createElement('script');
      function cleanup() {
        delete window[name];
        script.remove();
      }
      window[name] = function (data) { cleanup(); resolve(data); };
      script.onerror = function () { cleanup(); reject(new Error('JSONP failed')); };
      script.src = url.replace('alt=json', 'alt=json-in-script') + '&callback=' + name;
      document.head.appendChild(script);
    });
  }

  function loadFeed() {
    return fetch(FEED)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(function () { return loadJsonp(FEED); });
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function bilingual(tag, className, zh, en) {
    var node = el(tag, className);
    node.appendChild(el('span', 'zh', zh));
    node.appendChild(el('span', 'en', en));
    return node;
  }

  function safeUrl(href) {
    return /^https?:\/\//i.test(href || '') ? href : BLOG + '/';
  }

  function postUrl(entry) {
    var links = entry.link || [];
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel === 'alternate') return safeUrl(links[i].href);
    }
    return BLOG + '/';
  }

  function link(href, className) {
    var a = el('a', className);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }

  function renderPost(entry) {
    var url = postUrl(entry);
    var title = (entry.title && entry.title.$t) || '';
    var card = el('article', 'post-card');

    var thumb = entry.media$thumbnail && entry.media$thumbnail.url;
    if (thumb) {
      var imgLink = link(url, 'post-thumb');
      var img = el('img');
      img.src = safeUrl(thumb.replace(/\/s\d+(-c)?\//, '/s640/'));
      img.alt = '';
      img.loading = 'lazy';
      imgLink.appendChild(img);
      card.appendChild(imgLink);
    }

    var heading = el('h3');
    var titleLink = link(url);
    titleLink.textContent = title;
    heading.appendChild(titleLink);
    card.appendChild(heading);

    if (entry.published && entry.published.$t) {
      card.appendChild(el('p', 'post-date', entry.published.$t.slice(0, 10)));
    }

    var snippet = (entry.summary && entry.summary.$t) || '';
    if (snippet) card.appendChild(el('p', 'post-excerpt', snippet));

    var more = link(url, 'read-more');
    more.appendChild(el('span', 'zh', '阅读全文'));
    more.appendChild(el('span', 'en', 'Read More'));
    card.appendChild(more);

    return card;
  }

  function showStatus(zh, en) {
    container.replaceChildren(bilingual('p', 'posts-status', zh, en));
  }

  loadFeed()
    .then(function (data) {
      var entries = (data.feed && data.feed.entry) || [];
      if (!entries.length) {
        showStatus('暂无博文。', 'No posts yet.');
        return;
      }
      container.replaceChildren.apply(container, entries.map(renderPost));
    })
    .catch(function () {
      showStatus('博文加载失败，请直接访问我们的博客。', 'Could not load posts. Please visit our blog directly.');
    });
})();
