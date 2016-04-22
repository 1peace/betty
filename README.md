**bower**

```
bower install fetch --save
```

**npm**

```
npm install babel-preset-es2015-rollup --save-dev

npm install gulp-rollup --save-dev
npm install rollup-plugin-includepaths --save-dev

npm install rollup --save-dev
npm install rollup-plugin-babel --save-dev
```

**app/scripts/.babelrc**

```
{
  "presets": ["es2015-rollup"]
}
```

**.eslintrc**

```
{
    "ecmaFeatures": {
        "modules": true
    }
}
```

**gulp**

```
import rollupIncludePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
  paths: ['app/scripts']
};

gulp.task('scripts', () => {
  return gulp.src('app/scripts/main.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.rollup({
      sourceMap: true,
      plugins: [
        rollupIncludePaths(includePathOptions)
      ]
    }))
    .pipe($.babel())
    // .on('error', $.util.log)
    // .pipe($.rename('bundle.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({
      stream: true
    }));
});
```

```
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

gulp.task('scripts', () => {
  return rollup({
    entry: 'app/scripts/main.js',
    plugins: [
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }).then(bundle => {
    return bundle.write({
      format: 'iife',
      dest: '.tmp/scripts/main.js'
    });
  });
});
```
