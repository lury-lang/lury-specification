var root_dir = null;

function loader_load(dir) {
  root_dir = dir;
  var css = [
	    'common/bootstrap.min.css',
	    'common/bootstrap-theme.min.css',
	    'common/jquery-ui.min.css',
	    'common/markdown.css',
        'common/styles/xcode.css',
	    'common/index.css'
  ];
	var js = [
		'common/jquery-2.1.3.min.js',
		'common/bootstrap.min.js',
		'common/jquery-ui.min.js',
		'common/marked.min.js',
        'common/highlight.js',
        'common/lury.js',
        'common/lury_bnf.js',
		'common/index.js'
	];
  for (var i = 0; i < css.length; i++)
    document.write('<link rel="stylesheet" href="' + dir + css[i] + '" />');
	for (var i = 0; i < js.length; i++)
		document.write('<script src="' + dir + js[i] + '"></script>');
}