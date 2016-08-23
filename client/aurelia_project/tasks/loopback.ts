import * as gulp from 'gulp';
import * as app from '../../../server/server';

let loopback = gulp.series((done) => {
  app.start();
  done();
});

export default loopback;
