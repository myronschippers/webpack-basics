# Webpack

## What are Build Tools?
Developers love solving problems. Build Tools are the solution to this problem!
Build Tools all try to solve this problem, although in different ways.

Some Common Node Build Tools:

- Grunt.js: Task manager that takes in a config file
- Gulp.js: Task manager that is scripted instead of configured
- Webpack.js: A dependency manager that bundles dependencies

Task managers are really good at running common tasks that you could do manually, but you don't want to. Sure, you could concatenate and minify your files every time, but build tools can do it automatically!

## Common tasks solved with Build Tools
  - Minify + Uglify
  - Bundling
  - Dependency Management
  - Build Process Automation
  - Auto Reload

## Webpack Overview
At its core, webpack is a static module bundler. Static meaning your HTML, CSS, Fonts, Images, JS, etc.

Webpack builds a dependency tree and creates one javascript bundle based on what it finds.
Webpack can also handle a variety of other file types and handle them as well (It can encode them to JS, or just transform to one file of the same type);

## Import & Export
Webpack makes use of ES6, specifically Import and Export syntax.

Most languages have an equivalent of Import/Export. Can you think of one?

Note that the final bundle will NOT have those keywords, in fact, it will all be ES5 so it is browser safe.

If you want to handle other ES6 syntax for browser compatibility, you will need to transpile with a Babel Plugin. That will come later.

## Getting Started

Installing webpack

```
npm install --save-dev webpack
npm install webpack-cli -D
```

Dev dependencies are required to build, but not to run.

Add a script to your package.json:

```JavaScript
"scripts": {
    ...
    "build": "webpack --config webpack.config.js"
}
```

Make New File: `webpack.config.js` at root of project.

```JavaScript
  module.exports = {
    ///WEBPACK CONFIG
  }
```

## 4 Main Concepts in Webpack:

### Entry
The Entry is where you tell webpack to start building its tree. This would probably be the root of your project.

webpack.config.js

```JavaScript
module.exports = {
    entry: './public/src/client.js', // path to my entry file
};
```



### Output

The Output is where you tell webpack to put the resulting file, and what to call it. Usually you put your built file(s) in a folder called `dist`.

webpack.config.js

```JavaScript
module.exports = {
    entry: './public/src/client.js',
    output: {
      path: `${__dirname}/public/dist`, // this is optional, `dist` is the default
      filename: 'client.bundle.js'
    }
}
```

That's the basics of webpack. Now let's look at the javascript to see what that looks like.

### Javascript Basics
Where should we start? What's the `entry` to our app? Let's create an `client.js` and a `hello.js`. Remember, we're now referring to client side code.

client.js

```JavaScript
import helloWorld from './helloWorld';

helloWorld();
```

hello.js

```JavaScript
function hello() {
  console.log('Webpack says, "Hey!!"');
}

export default hello;
```

now you can run

```
npm run build
```

to build your project!

### Webpack turns our code ugly!!

### devtool

So we can debug:

```JavaScript
module.exports = {
    entry: './public/src/client.js',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: `${__dirname}/public/dist`,
      filename: 'client.bundle.js'
    }
};
```

In the chrome debugger we now have a .webpack folder with our original code!

### Node modules on the client side

Webpack lets us import npm-based packages! Want to bring jquery into your project?

```
npm install jquery
```

update `client.js`

```JavaScript
import $ from 'jquery';
import helloWorld from './helloWorld';

$(document).ready(init);

function init() {
  console.log('Page is Loaded');
  console.log('More to Say.....');
  helloWorld();
}
```

update `index.html`

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="styles/style.css">
  <script src="dist/client.bundle.js" type="text/javascript"></script>

  <title>Build Tools</title>
</head>
<body>
  <header class="appBar">
    <h1>Build Tools, Webpack</h1>
  </header>
```

No more `vendors` folder!! Just bring in the files you want by importing them!

Our Bundle is in a different place, and a different name!

That's webpack! `import` and `export` on the client side!

### So, Why are we doing this??

That's a lot of changes. What did this accomplish?
- No magical global variables like `app` or `$`
- Explicit injection of our libraries
- One Sourced file (browsers love this)
- No vendors folder, just npm install and use!
- This is how React and Angular 2+ do things
- Now we get better errors sooner (Didn't import something? Here's an error!)
- Any other reasons?
- But there's more!

### Loaders

Lets setup loaders for handling our css!
Then we can import it!

In order to import a CSS file from within a JavaScript module, you need to install and add the style-loader and css-loader to your module configuration:

`npm install --save-dev style-loader css-loader`
 Then we add this config in the webpack.config.js:

```JavaScript
module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }
     ]
  }
```

Webpack uses a regular expression to determine which files it should look for and serve to a specific loader. In this case any file that ends with .css will be served to the style-loader and the css-loader.

This enables you to import './style.css' into the file that depends on that styling. Now, when that module is run, a `<style>` tag with the stringified css will be inserted into the `<head>` of your html file.

Loaders are for handling other file types -- the pattern for all of them is basically the same:
`npm install --save-dev VALUE_OF_LOADER`
```JavaScript
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
    'file-loader'
    ]
},
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
    'file-loader'
    ]
},
{
    test: /\.(csv|tsv)$/,
    use: [
    'csv-loader'
    ]
},
{
    test: /\.xml$/,
    use: [
    'xml-loader'
    ]
}
```

## Other things

### Plugins

Lets minify our code!

`npm install --save-dev uglifyjs-webpack-plugin`

`const UglifyJsPlugin = require('uglifyjs-webpack-plugin')`

```JavaScript
plugins: [
    new UglifyJsPlugin()
]
```



