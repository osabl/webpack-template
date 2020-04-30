<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack Template</h1>
  <p>
    Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
</div>

## Start:

``` bash
# Download repository:
git clone https://github.com/osabl/webpack-template webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
npm i
```

## Build Setup:

``` bash
# Server with hot reload at http://yourIpV4Adress:8081/
npm run start

# Start building in developer mode. Output will be at dev/ folder.
npm run dev

# Webpack will be watch files and recompile whenever they change.
npm run watch

# Start building in developer mode. Output will be at dist/ folder.
# Also will be open page of visualize size of webpack output files with an interactive treemap.
npm run build

# Will be analyze an existing bundle and save the data into a stats.json file.
npm run stats
```

## Project Structure:
``` js
`src/`  // project root
`├── assets/`  // assets folder
`|   ├── img/`  // put images here.
`|   ├── fonts/`  // put fonts here.
`|   └── .../`  // and other assets. 
`├── js/`  // put custom app scripts here
`├── pug/`
`|   ├── layout/`  // put custom layout for pages
`|   ├── includes/`  // all app includes
`|   ├── utils/`  // pug mixins and other
`|   └── pages/`  // put custom app pages.
`├── scss/`  // put custom app SCSS styles here. Don't forget to import them in `index.js`
`|   └── utils/`  // scss mixins and other
`├── static/`  // folder with extra static assets that will be copied into output folder
`└── index.js`  // main app file where you include/import all required libs and init app
```

# Setting

## Main const:
Easy way to move all files.
Default:
``` js
const PATHS = {
  // Path to main app dir
  src: path.join(__dirname, 'src'),
  // Path to Output dir (production mode)
  dist: path.join(__dirname, 'dist'),
  // Path to Output dir (developer mode)
  distDev: path.resolve(__dirname, 'dev'),
  // Path to Second Output dir (js/css/fonts etc folder)
  assets: 'assets/',
  // Path to your custom app pages
  pages: path.resolve(__dirname, 'src/pug/pages')
}
```

## Customize:
Change any folders:
``` js
const PATHS = {
  // src must be src
  src: path.join(__dirname, 'src'),
  // dist to public (production mode)
  dist: path.join(__dirname, 'public'),
  // dev to public (developer mode)
  distDev: path.resolve(__dirname, 'public'),
  // assets to static
  assets: 'static/'
}
```

## Import Another libs:
1. Install libs
2. Import libs in `./index.js`
``` js
// React example
import React from 'react'
// Bootstrap example
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
// or
import 'bootstrap/dist/js/bootstrap.min.js'
// Normalize.css
import 'normalize.css'
```

## Import only SASS or CSS libs:
1. Install libs
2. Go to `/scss/utils/libs.scss`
3. Import libs in node modules
``` scss
// Sass librarys example:
@import '../../node_modules/spinners/stylesheets/spinners';
// CSS librarys example:
@import '../../node_modules/csshaker/dist/csshaker.min.css';
```

## Import js files:
1. Create another js module in `./src/js/` folder
2. Import modules in `./src/index.js` file
``` js
// another js file for example
import './js/common.js'
```

## PUG Dir Folder:
#### Default:
* .pug dir: `./src/pug/pages`
* Configurations: in `./webpack.config.js`
**Usage:**
All pages must be created in the `./src/pug/pages` folder.
Example:
``` bash
./src/pug/pages/index.pug
./src/pug/pages/about.pug
```

#### Change PUG Default Dir Folder:
Example for `./pug/mynewfolder/pages`:
1. Change `./webpack.config.js` const PAGES_DIR:
``` js
// Your new path
const PATHS = {
  pages: path.resolve(__dirname, 'src/pug/mynewfolder/pages')
}
```
2. Rerun webpack dev server

## Create Another PUG Files:
#### Default: 
Automatic creation any pug pages:
1. Create another pug file in `./src/pug/pages/`
2. Open new page `http://yourIpV4Adress:8081/another.html` (Don't forget to RERUN dev server)

#### Second method:
Manual (not Automaticlly) creation any pug pages (Don't forget to RERUN dev server and COMMENT lines above)
1. Create another pug file in `./src/pug/pages/`
2. Go to `./webpack.config.js`
3. Comment lines above (create automaticlly pug pages)
4. Create new page in pug:
``` js
    new HtmlWebpackPlugin({
      template: `${PATHS.pages}/anotherFolder/index.pug`,
      filename: './anotherFolder/index.html',
      // anotherOptions...
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.pages}/anotherFolder/portfolio.pug`,
      filename: './anotherFolder/portfolio.html',
      // anotherOptions...
    })
```
5. Open new page `http://yourIpV4Adress:8081/about.html` (Don't forget to RERUN dev server)

#### Third method: (BEST)
Сombine the first method and the second.
Example:
``` js
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PATHS.pages}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      // anotherOptions...
    }))
    new HtmlWebpackPlugin({
      template: `${PATHS.pages}/anotherFolder/index.pug`,
      filename: './anotherFolder/index.html',
      // anotherOptions...
    })
```

## Add Fonts:
Add @font-face in `/assets/scss/utils/fonts.scss`:

``` scss
// Example with Helvetica
@font-face {
  font-family: "Helvetica-Base";
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot'); /* IE9 Compat Modes */
  src: url('/assets/fonts/Helvetica/Base/Helvetica-Base.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.woff') format('woff'), /* Pretty Modern Browsers */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('/assets/fonts/Helvetica/Base/Helvetica-Base.svg') format('svg'); /* Legacy iOS */
}
```

Add vars for font in `/assets/scss/utils/vars.scss`:

``` scss
$mySecontFont : 'Helvetica-Base', Arial, sans-serif;
```
