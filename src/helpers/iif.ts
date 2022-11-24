import Handlebars from 'handlebars';

export function iff() {
  Handlebars.registerHelper('iff', function (a, operator, b, opts) {
    let bool = false;
    switch (operator) {
      case '===':
        bool = a === b;
        break;
      case '>':
        bool = a > b;
        break;
      case '<':
        bool = a < b;
        break;
      default:
        throw 'Unknown operator ' + operator;
    }

    if (bool) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return opts.fn(this);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return opts.inverse(this);
    }
  });
}
