/**
 * See the RLE section of
 *  http://psoup.math.wisc.edu/mcell/ca_files_formats.html#RLE
 * for definition of RLE format.
 * 
 * This class expects the (extended) RLE input to be
 * correctly formatted. It is a two state parser, thus
 * multi-state RLE will not parse properly.
 * 
 * The output 'this.pattern' is a string with spaces(dead)/zero(alive)
 *  with lines separated by '\n'.
 *
 * The parse() function returns 'this.pattern'.
 * 
 */
class RLE {
  constructor(text){ this.parse(text); }
  
  /**
   * Initalize the class to parse given text
   */
  init(text) {
    this.text = text || '#C Empty text';
    this.pattern = ''; this.done = false;

    this.lines = this.text.split(/\r\n|\r|\n/)
      .map(l => ({ type: '', data: l.trim()}))
      .filter(l => l.data.length > 0);
  }
  
  /**
   * Three types of input lines are identified
   *  - comment - contains any line starting with '#'
   *  - header - contains the RLE x,y,rule values
   *  - pattern - are lines that contain the pattern to be parsed
   */
  setTypes() {
    this.lines.forEach(line => {
      if (line.data[0] === '#') line.type = 'comment';
      else if (/[xX]/.test(line.data[0])) line.type = 'header';
      else if (/\d*[oObB]+[$!]+/.test(line.data)) line.type = 'pattern';
    })
  }
  
  /**
   * The operand is to be executed 'n' number of times
   */
  execOp(op) {
    for (let n = 0; n < op.n; n++) {
      this.pattern += this.operation(op.o);
    }
  }

  /**
   * Return a space/zero/new-line depending on operand
   */
  operation(operand) {
    if (!this.done) {
      switch (operand) {
        case 'o': return '0';
        case 'b': return ' ';
        case '$': return '\n';
        case '!': this.done = true; return '\n';
        default: return ' ';
      }
    }
    return '';
  }

  /**
   * Main entry-point of the class
   * Returns 'this.pattern' containing spaces(dead) or zero(alive)
   *  in a newline separated string
   */
  parse(text) {
    this.init(text);
    this.setTypes();
    let tokens = this.lines
      .filter(l => l.type === 'pattern')        // interested in the pattern
      .map(l => l.data).join('').toLowerCase()  // get the pattern data into one string
      .replace(/[^\dob$!]/g,'b')                // any unknown operand is 'b' (dead)
      .match(/\d*[ob$!]/g);                     // build array of tokens

    if (tokens) {
      // insure each token has a number of iterations ( 1 is default )
      tokens.forEach((op, idx) => { tokens[idx] = /\d/.test(op[0]) ? op : '1' + op });
      // build and execute operations - number of iterations and operand
      tokens.join('')
        .match(/\d+[ob$!]/g)
        .map(token => ({ n: parseInt(token), o: token.replace(/\d+/,'') }))
        .forEach(op => this.execOp(op)); // execute the the operations
    }
    return this.pattern;
  }
}

module.exports = RLE;
