var header =
  '<header class="header">\
    <ul class="nav nav-pills pull-right">\
      <li class="dropdown">\
        <a class="dropdown-toggle" role="button" data-toggle="dropdown" href="#">サイトジャンプ</a>\
        <ul class="dropdown-menu" role="menu">\
          <li><a href="{0}ja/index.html">仕様トップ</a></li>\
          <li class="divider"></li>\
          <li><a href="{0}ja/reference/index.html">言語リファレンス</a></li>\
        </ul>\
      </li>\
    </ul>\
    <h1 class="text-muted">Specification 0.2</h1>\
    <hr />\
  </header>';

var footer =
  '<footer class="footer">\
    <hr />\
    <p>\
      <a href="{0}ja/index.html">仕様トップ</a> --\
      <a href="{0}ja/reference/index.html">言語リファレンス</a>\
    </p>\
    <p>Copyright &copy; 2015 Tomona Nanase</p>\
  </footer>';

function _(format)
{
  var args = arguments;
  return format.replace(/\{(\d)\}/g, function(m, c) { return args[parseInt(c) + 1] });
}

function build_nav(obj) {
  var nav = $('<nav class="affix-nav hidden-print hidden-xs"><ul class="nav"></ul></nav>');
  var navul = nav.children('ul.nav');

  for (var i = 0; i < obj.length; i++) {
    var header = $("#" + obj[i].id);
    var section = $('<li></li>').prepend(_('<a href="#{0}">{1}</a>', obj[i].name, header.text().replace('§', '')));

    if (typeof obj[i].children !== 'undefined') {
      var subnavul = $('<ul class="nav"></ul>');

      for (var j = 0; j < obj[i].children.length; j++)
        $('<li></li>').prepend(_('<a href="#{0}">{1}</a>', obj[i].children[j].name, $("#" + obj[i].children[j].id).text().replace('§', '')))
                      .appendTo(subnavul);

      subnavul.appendTo(section);
    }

    section.appendTo(navul);
  }

  nav.prependTo('.col-navigator');

  // apply affix
  $('nav.affix-nav').affix({
    offset: {
      top: $('.container>.row:first').position().top,
      bottom: 50
    }
  }).on('affix.bs.affix', function() {
    $(this).css('top', 0);
  });

  // apply scrollspy
  $('body').scrollspy({ target: 'nav.affix-nav' });
}

function build_regexLink() {
  var service = 'http://regexper.com/#';
  $('a[regex]').each(function() {
    $(this).attr('href', service + encodeURIComponent($(this).attr('regex')))
           .attr('target', '_blank');
  });
}

function build_grammarAnchor() {
  $('a.grammar').each(function() {
    $(this).attr('name', $(this).text());
  });
}

function build_header_nav(obj) {
  build_parmaLink(obj);
  build_nav(obj);
  //moveToHash();
}

function build_parmaLink(obj) {
  var skippedFirst = false;

  var f = function(id, name) {
    var parmalink = $(_('<a class="permalink" href="#{0}" id="{0}" name="{0}">§</a>', name));

    $('#' + id).prepend(parmalink)
           .hover(function() { parmalink.css('opacity', 1); },
                  function() { parmalink.css('opacity', 0); });
  }

  for (var i = 0; i < obj.length; i++) {
    f(obj[i].id, obj[i].name);

    if (typeof obj[i].children !== 'undefined')
      for (var j = 0; j < obj[i].children.length; j++)
        f(obj[i].children[j].id, obj[i].children[j].name);
  }
}

function moveToHash() {
  if (!location.hash || location.hash === '#')
    return;

  var p = $(location.hash).offset().top;
  $("html, body").animate({scrollTop: p}, 0);
}

function applyMarkdown() {
  var unescape_patch = function(html) {
    return html
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  };

  $('.markdown').each(function(){$(this).html(marked($(this).html())); });
  $('code').each(function(){$(this).html(unescape_patch($(this).html())); });
}

$(function(){
  $('.container>.row:first').before(_(header, root_dir)).after(_(footer, root_dir));
  applyMarkdown();

  $('<div class="col-navigator"></div>').insertAfter('.col-main');
  $('.col-main').addClass('col-sm-9');
  $('.col-navigator').addClass('col-sm-3');

  build_regexLink();
  build_grammarAnchor();
  //build_parmaLink();
  //build_nav();
});