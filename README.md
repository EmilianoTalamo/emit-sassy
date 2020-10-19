# emit-sassy

This is a scaffold for SASS and PostCSS projects. It includes a neat custom library to handle media queries and Gulp for compilation.

---

## File structure

This repository uses a simple folder and file structure, but it can be customized to your liking.

By default, a main [`style.scss`](scss/style.scss) file is used to import all the required partials and configurations. This file will be the main one to be compiled into a single and final [`style.css`](css/style.css).

---

## Media queries

Media queries are handled in the [`_emit-mediaquery.scss`](scss/vendors/_emit-mediaquery.scss) file. Configure your breakpoints there, and put the `$mfIsDefault` flag in false if you're not using a *mobile-first* approach on your site.

Afterwards, you can import the [`vscode/scss.json`](vscode/scss.json) snippet file [into your *Visual Studio Code* configuration](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets), so you can use the media queries mixins with simple snippets.

### Available `snippets` and corresponding media queries mixins:

`mqp` - Media query for **phones** (not needed on mobile-first)
```
@include mqP{
	// SCSS code for phones
}
```

`mqpl` - Media query for **phones in landscape**
```
@include mqPL{
	// SCSS code for phones in landscape
}
```

`mqt` - Media query for **tablets**
```
@include mqT{
	// SCSS code for tablets
}
```

`mqtl` - Media query for **tablets in landscape**
```
@include mqTL{
	// SCSS code for tablets in landcape
}
```

`mql` - Media query for **laptops and lowres screens**
```
@include mqL{
	// SCSS code for laptops
}
```

`mqd` - Media query for **desktop computers** and **high-res screens**
```
@include mqD{
	// SCSS code for desktop
}
```

`mqh` - Media query for **ultra high resolution screens** (not needed if not using mobile-first)
```
@include mqH{
	// SCSS code for UHD screens
}
```

---

You can pass the `true`/`false` flag argument to these mixins to override the configured `$mfIsDefault` flag for that specific ruleset. eg:

You are using the mobile-first approach, so in the [scss configuration](scss/vendors/_emit-mediaquery.scss) you have set:

`$mfIsDefault: true;`

But if you need to override this for one mixins for whatever reason, you can do this:

```
h1{
	color: red; // color red by default
	mqT{
		color: blue; // color blue in tablet and upwards
	}
}
h2{
	color: yellow; // color yellow by default
	@include mqT(false){ // override the mobile-first flag
		color: green; // color green in tablet and downwards
	}
}
```

---

You can also set custom breakpoints with the following `snippets` and mixins:

`mqcmin` - Custom resolution breakpoint. Set the desired breakpoint width as a parameter, and the rules inside this mixins will only apply from that resolution **upwards**.
```
@include mqCustomMin(breakpoint){
	// SCSS code
}
```

eg:

```
h1{
	color: red; // color red by default
	@include mqCustomMin(600px){ // pass the custom breakpoint as an argument
		color: blue; // the color will be blue at 600px (width) and upwards
	}
}
```

`mqcmax` - Custom resolution breakpoint. Set the desired breakpoint width as a parameter, and the rules inside this mixins will only apply from that resolution **downwards**.
```
@include mqCustomMax(breakpoint){
	// SCSS code
}
```

eg:

```
h1{
	color: red; // color red by default
	@include mqCustomMax(1000px){ // pass the custom breakpoint as an argument
		color: blue; // the color will be blue at 1000px (width) and downwards
	}
}
```

---

## Compilation

[Gulp](https://gulpjs.com/) is used to compile the SCSS files. So make sure you run `npm i` to install all the dependencies, and check that Gulp is running correctly with `gulp -v`. NodeJS version 12 (at least) is recommended.

Vendor prefixing and PostCSS compilation will be done automatically.

Two compilation methods can be used for your project:

### For development

`npm run dev` or `gulp css-watch`

Use this command to **compile** the SASS file and **watch** the SASS folder. The watcher will run constantly until you interrupt the task. The final CSS file will not be minified using this compilation method.

### For production enviroments
`npm run prod` or `gulp css` or `gulp`

Use this command to **compile** the SASS file into a final CSS file, which will be minified, but no sourcemaps will be created.

| 🚀                     | npm run dev | npm run prod |
|-----------------------|-------------|--------------|
| SCSS compilation      | ✅           | ✅            |
| PostCSS compilation   | ✅           | ✅            |
| Sourcemaps generation | ✅           | ❌            |
| Minification          | ❌           | ✅            |
| Folder watching       | ✅           | ❌            |
| Vendor prefixing      | ✅           | ✅            |

---

## Compilation configs

You can configure several aspects of Gulp.

### Paths

Paths can be defined in the [`gulpfile.js/config.js`](gulpfile.js/config.js) file. Here you can set the source and destination files, as well as the folder to watch.

### PostCSS

PostCSS modules can be added inside the `CompilePostCSS` function, in the [`gulpfile.js/index.js`](gulpfile.js/index.js) file.

These modules can be configured there as well. Refer to their documentation to do so.