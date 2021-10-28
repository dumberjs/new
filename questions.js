module.exports = [
  {
    message: 'Choose a front-end framework',
    choices: [
      {value: 'aurelia', title: 'Aurelia'},
      {value: 'react', title: 'React'},
      {value: 'vue', title: 'Vue'},
      {value: 'no-framework', title: 'None'}
    ]
  },
  {
    if: 'aurelia',
    message: 'What kind of Aurelia project?',
    choices: [
      {title: 'App', hint: 'A normal single page application in Aurelia'},
      {value: 'plugin', title: 'Plugin', hint: 'An Aurelia plugin project'}
    ]
  },
  {
    if: 'vue',
    message: 'Do you want to use Single File Components (.vue files)?',
    choices: [
      {title: 'No', hint: 'string template + runtime template compiler'},
      {value: 'sfc', title: 'Yes', hint: '.vue file contains html template, scoped css, and JavaScript component'}
    ]
  },
  {
    message: 'What browsers to support?',
    choices: [
      {title: 'IE 11 :-(', hint: "No need to explain, we feel you!"},
      {value: 'evergreen', title: 'Evergreen Browsers :-)', hint: 'Only for evergreen browsers like Chrome, Firefox, Edge and Safari.'}
    ]
  },
  {
    message: 'What JavaScript transpiler to use?',
    choices: [
      {value: 'babel', title: 'ESNext (babel)', hint: 'Use next generation JavaScript, today.'},
      // have trouble to support TS in .vue file (gulp-vue-file) due to handling of decorator.
      {if: '!sfc', value: 'typescript', title: 'TypeScript', hint: 'TypeScript is a typed superset of Javascript that compiles to plain JavaScript.'}
    ]
  },
  {
    message: 'What CSS preprocessor to use?',
    choices: [
      {value: 'css', title: 'Plain CSS'},
      {value: 'less', title: 'Less'},
      {value: 'sass', title: 'Sass (.scss)'}
    ]
  },
  {
    message: 'What unit testing framework to use?',
    choices: [
      {value: 'no-unit-tests', title: 'None', hint: 'No unit testing'},
      {if: '!aurelia', value: 'jest', title: 'Jest', hint: 'Runs in Node.js, simulates browser, with a focus on simplicity.'},
      {if: 'aurelia',  value: 'jest', title: 'Jest', hint: 'Runs in Node.js, simulates browser (aurelia-pal-nodejs), with a focus on simplicity.'},
      {value: 'jasmine', title: 'Jasmine', hint: 'Runs in browser, a behavior-driven testing framework.'},
      {value: 'mocha', title: 'Mocha + Chai', hint: 'Runs in browser, a feature-rich JavaScript test framework for node and browsers.'},
      {value: 'tape', title: 'Tape', hint: 'Runs in browser, tap-producing test harness for node and browsers.'}
    ]
  },
  {
    message: 'Do you want to setup e2e test?',
    choices: [
      {title: 'No'},
      {value: 'cypress', title: 'Yes (Cypress)', hint: 'Cypress offers fast, easy and reliable testing for anything that runs in a browser.'}
    ]
  }
];
