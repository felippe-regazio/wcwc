export class Tester {
  constructor(options = {}) {
    this.$output = document.querySelector(options.output || '#tester-output');
    this.style();
  }

  style() {
    if (!document.querySelector('#tester-style')) {
      const style = Object.assign(document.createElement('style'), {
        id: 'tester-style',
        
        innerHTML: `
          #tester-output {
            box-sizing: border-box;
          }

          #tester-output * {
            box-sizing: border-box;
          }

          #tester-output > span {
            display: block;
            font-weight: 700;
          }

          #tester-output .tester-output-info {
            color: #555555;
          }

          #tester-output .tester-output-success {
            color: #097969;
          }

          #tester-output .tester-output-error {
            color: #C70039
          }
        `
      });

      document.head.append(style);
    }
  }

  log(msg, level = 'info') {
    const msgElement = Object.assign(document.createElement('span'), {
      classList: `tester-output-${level}`,
      innerHTML: msg
    });

    this.$output.append(msgElement);
    return msgElement;
  }
  
  it(msg, cb) {
    this.log('<hr/>')
    this.log(`<h2>${msg}</h2>`);

    try {
      cb && cb();
    } catch(error) {
      this.log(error, 'error');
    }
  }

  async assert(msg, cb) {
    let result;
    let holder = this.log('<p></p>');

    try {
      result = await cb();
    } catch(error) {
      this.log(error, 'error');
    }

    const emoji = result === true ? '✅' : '❌';
    const level = result ? 'success' : 'error';

    holder.innerHTML = `${emoji} ${msg}`;
    holder.setAttribute('class', `tester-output-${level}`);
  }
}