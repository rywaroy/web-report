import webReport from './dist/index';
// const webReport = require('./dist/index');
// import webReport from './src/index';

setTimeout(() => {
  webReport({
    project: 'resource',
  });
}, 1000);