/*
Language: bnf
Category: misc
*/

function hljs_bnf(hljs) {
  return {
    contains: [
      {
        className: 'title',
        begin: /\b\w+\s*:/
      },
      {
        className: 'variable',
        begin: /\b\w+\b/
      },
      {
        className: 'string',
        begin: "'", end: "'",
        illegal: '\\n'
      },
      {
        className: 'string',
        begin: '"', end: '"',
        illegal: '\\n'
      },
      hljs.HASH_COMMENT_MODE
    ]
  };
}
