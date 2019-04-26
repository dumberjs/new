module.exports = [
  {
    message: 'Choose a front-end framework',
    choices: [
      {value: 'aurelia', title: 'Aurelia'},
      {value: 'react', title: 'React'},
      {value: 'vue', title: 'Vue'}
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
    message: 'What JavaScript transpiler to use?',
    choices: [
      {value: 'babel', title: 'ESNext (babel)', hint: 'Use next generation JavaScript, today.'},
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
      {if: '!aurelia', value: 'jest', title: 'Jest', hint: 'Runs in Node.js, simulates browser, with a focus on simplicity.'},
      {if: 'aurelia',  value: 'jest', title: 'Jest', hint: 'Runs in Node.js, simulates browser (aurelia-pal-nodejs), with a focus on simplicity.'},
      {value: 'jasmine', title: 'Jasmine', hint: 'Runs in browser, a behavior-driven testing framework.'},
      {value: 'tape', title: 'Tape', hint: 'Runs in browser, tap-producing test harness for node and browsers.'},
      {if: '!aurelia', value: 'ava', title: 'Ava + browser-env', hint: 'Runs in Node.js, simulates browser (browser-env). A test runner for Node.js with a concise API, detailed error output, embrace of new language features and process isolation that let you write tests more effectively.'},
      {if: 'aurelia',  value: 'ava', title: 'Ava', hint: 'Runs in Node.js, simulates browser (aurelia-pal-nodejs). A test runner for Node.js with a concise API, detailed error output, embrace of new language features and process isolation that let you write tests more effectively.'}
    ]
  }
];
