/*
Language: LuryBNF
Category: misc
*/

function hljs_lury(hljs) {
  var decimal_integer_re = '(0|[1-9][\\d_]*)',
    decimal_integer_nosus_re = '(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)',
    binary_integer_re = '0[bB][01_]+',
    hexadecimal_digits_re = '([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)',
    hexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re,

    decimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')',
    decimal_float_re = '(' + decimal_integer_nosus_re + '(\\.\\d*|' + decimal_exponent_re + ')|' +
                '\\d+\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' +
                '\\.' + decimal_integer_re + decimal_exponent_re + '?' +
              ')',
    hexadecimal_float_re = '(0[xX](' +
                  hexadecimal_digits_re + '\\.' + hexadecimal_digits_re + '|'+
                  '\\.?' + hexadecimal_digits_re +
                 ')[pP][+-]?' + decimal_integer_nosus_re + ')',

    integer_re = '(' +
      decimal_integer_re + '|' +
      binary_integer_re  + '|' +
       hexadecimal_integer_re   +
    ')',

    float_re = '(' +
      decimal_float_re  +
    ')';

  var LURY_INTEGER_MODE = {
    className: 'number',
      begin: '\\b' + integer_re,
      relevance: 0
  };

  var LURY_FLOAT_MODE = {
    className: 'number',
    begin: '\\b(' +
        float_re + 'i?|' +
        integer_re + 'i' +
      ')',
    relevance: 0
  };

  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /'/, end: /'/,
        relevance: 10
      },
      {
        begin: /"/, end: /"/,
        relevance: 10
      },
      {
        begin: /`/, end: /`/,
        relevance: 10
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  return {
    aliases: ['lr'],
    keywords: {
      keyword:
        // normal keywords
        'abstract else is property this and enum lazy protected throw break extended nameof public' +
        'case new ref try catch finally reflect unittest class for not return unless' +
        'continue if or scope until def import out sealed var default in override static while' +
        'delete interface pass super with elif invariant private switch yield' +
        //contextual keywords
        'get set file line exit success failure',
      built_in:
        'print println read readln assert enforce',
      literal:
        'true false nil'
    },
    illegal: /(<\/|=>|\?)/,
    contains: [
      LURY_INTEGER_MODE,
      LURY_FLOAT_MODE,
      STRING,
      {
        className: 'comment',
        begin: '###',
        end: '###'
      },
      hljs.HASH_COMMENT_MODE,
      {
        variants: [
          {className: 'function', beginKeywords: 'def', relevance: 10},
          {className: 'function', beginKeywords: 'unittest', relevance: 10},
          {className: 'function', beginKeywords: 'invariant', relevance: 10},
          {className: 'class', beginKeywords: 'class'},
          {className: 'class', beginKeywords: 'enum'},
          {className: 'class', beginKeywords: 'interface'},
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: /=>/, endsWithParent: true,
            keywords: 'None'
          }
        ]
      },
    ]
  };
}
