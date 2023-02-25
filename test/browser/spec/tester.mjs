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

  assert(msg, cb) {
    let result;

    try {
      result = cb && cb();
    } catch(error) {
      this.log(error, 'error');
    }

    const emoji = result ? '✅' : '❌';
    const clazz = result ? 'success' : 'error';
    this.log(`<p>${emoji} ${msg}</p>`, clazz);
  }
}