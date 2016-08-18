import * as gulp from 'gulp';
import * as sourcemaps from 'gulp-sourcemaps';
import * as sass from 'gulp-sass';
import * as importer from 'node-sass-importer';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: importer,
      importerOptions: {
        roots: ['bower_components']
      }
    }).on('error', sass.logError))
    .pipe(build.bundle());
};
