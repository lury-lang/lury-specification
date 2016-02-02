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
        className: 'attr',
        begin: /\b[A-Z]\w*\b/
      },
      {
        className: 'variable',
        begin: /\b[a-z_]\w*\b/
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
