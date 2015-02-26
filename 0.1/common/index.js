var header =
  '<header class="header">\
    <ul class="nav nav-pills pull-right">\
      <li class="active"><a href="#">Spec Home</a></li>\
    </ul>\
    <h1 class="text-muted">Lury Specification 0.1</h1>\
    <hr />\
  </header>';

var footer =
  '<footer class="footer">\
    <hr />\
    <p>Copyright &copy; 2015 Tomona Nanase</p>\
  </footer>';

function _(format)
{
  var args = arguments;
  return format.replace(/\{(\d)\}/g, function(m, c) { return args[parseInt(c) + 1] });
}

function build_nav() {
  var nav = $('<nav class="affix-nav"><ul class="nav"></ul></nav>');
  var navul = nav.children('ul.nav');

  $('.col-main>section').each(function() {
    var section = $('<li></li>').prepend(_('<a href="#{0}">{1}</a>', $(this).attr('id'), $(this).children('h2').text()));
    var subsection = $(_('.col-main>section#{0}>section', $(this).attr('id')));

    if (subsection.length > 0) {
      var subnavul = $('<ul class="nav"></ul>');
      subsection.each(function() {
        $('<li></li>').prepend(_('<a href="#{0}">{1}</a>', $(this).attr('id'), $(this).children('h3').text()))
                      .appendTo(subnavul);
      });
      subnavul.appendTo(section);
    }

    section.appendTo(navul);
  });

  nav.prependTo('.col-navigator');

  // apply affix
  $('nav.affix-nav').affix({
    offset: {
      top: $('#content').position().top,
      bottom: 50
    }
  }).on('affix.bs.affix', function() {
    $(this).css('top', 0);
  });

  // apply scrollspy
  $('body').scrollspy({ target: 'nav.affix-nav' });
}

$(function(){
  $('#content').before(header)
               .after(footer);
  build_nav();
});