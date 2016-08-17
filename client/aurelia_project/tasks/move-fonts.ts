import * as gulp from 'gulp';
import * as rename from 'gulp-rename';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function moveFonts() {
  return gulp.src('bower_components/**/fonts/**/*.*')
    .pipe(rename(function(path) {
      path.dirname = path.dirname.match(/fonts\/?(.*)/)[1];
      return path;
    }))
    .pipe(gulp.dest('fonts'));
};
