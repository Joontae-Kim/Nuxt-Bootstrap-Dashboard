<p align="center">
  <a href="https://nuxt-bootstrap-dashboard.herokuapp.com/" rel="nofollow">
    <img src="assets/images/nuxtstrap-logo.png" alt="https://nuxt-bootstrap-dashboard.herokuapp.com/" data-canonical-src="assets/images/nuxtstrap-logo.png" style="max-width: 80%;"><br>
  </a>
  <br>
  A Free Nuxt Admin Dashboard Project using Bootstrap 4 & Bootstrap-vue UI Components and Chart.js
</p>


  ![languages/count](https://img.shields.io/github/languages/count/Joontae-Kim/Nuxt-Bootstrap-Dashboard) ![github/languages/top](https://img.shields.io/github/languages/top/Joontae-Kim/Nuxt-Bootstrap-Dashboard) ![code-size](https://img.shields.io/github/languages/code-size/Joontae-Kim/Nuxt-Bootstrap-Dashboard) ![GitHub repo size](https://img.shields.io/github/repo-size/Joontae-Kim/Nuxt-Bootstrap-Dashboard) ![github/issues-closed](https://img.shields.io/github/issues-closed/Joontae-Kim/Nuxt-Bootstrap-Dashboard) ![github/issues-pr-closed](https://img.shields.io/github/issues-pr-closed/Joontae-Kim/Nuxt-Bootstrap-Dashboard)


  ![npm/v6.14.6](https://img.shields.io/badge/npm-v6.14.6-orange) ![github/package-json/dependency-version/nuxt](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/nuxt) ![dependency-version/Nuxt-Bootstrap-Dashboard/express](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/express) ![dependency-version/Nuxt-Bootstrap-Dashboard/@nuxtjs/axios](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/@nuxtjs/axios) ![dependency-version/Nuxt-Bootstrap-Dashboard/bootstrap](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/bootstrap) ![dependency-version/Nuxt-Bootstrap-Dashboard/bootstrap-vue](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/bootstrap-vue) ![dependency-version/Nuxt-Bootstrap-Dashboard/chart.js](https://img.shields.io/github/package-json/dependency-version/Joontae-Kim/Nuxt-Bootstrap-Dashboard/chart.js)


# Nuxtrap

> ✨ **Note:**  Nuxtrap is a private admin dashboard Project. But, you can use to develop your own dashaboard web application or extend by fork the repository.



## Quick Start

### Usage Guideness of Nuxtrap
#### 1. Just Explore
If you just want to explore, `git clone https://github.com/Joontae-Kim/Nuxt-Bootstrap-Dashboard.git`

#### 2. Extend Nuxtrap
If you want to extend some features or fix bugs, let's folk this repository and clone folked repository placed in your own github.

#### 3. Create your own Dashboard using Nuxtrap
If you want to create a dashboard web application based on Nuxtrap, `git clone --mirror https://github.com/Joontae-Kim/Nuxt-Bootstrap-Dashboard.git` . Then, reset the repository url `git remote set-url --push origin https://github.com/[exampleuser]/Nuxt-Bootstrap-Dashboard.git`. and To update your mirror, fetch updates and push.

```shell
$ git fetch -p origin
$ git push --mirror
```

### Build Setup 

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# analyze builded application size
$ npm run analyze
```

<br>

## Features
- Server-side Rendered Using Nuxt.js
- Support Fully Responsive Design
- Make Restful API for generating or managing dashboard contents
- Support to draw multiple types of charts. 
  - Line, Bar, Doughnut, Pie, Polar Area and mixed or complex type
- Integrate with the CSS Preprocessor SCSS

<br>

## Integration and Configuration
#### 1. Costomize the Bootstrap and Bootstrap-vue
Configure options to customize Bootstrap SCSS in the **bootstrapVue** property of the **nuxt.config.js**. Refer **the Nuxt.js module** section of [Bootstrap-vue](https://bootstrap-vue.org/docs) to customize the bootstrap and bootstrap-vue system. 


```js
modules: ['bootstrap-vue/nuxt'],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    icons: false,
    componentPlugins: [
      // component plugins
    ],
    directivePlugins: [
      // directive plugins
    ],
    config: {
      breakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    }
  }
```

1. `bootstrapCSS` and `bootstrapVueCSS`
Disable automatic inclusion of Bootstrap and BootstrapVue pre-compiled CSS files by setting the following option(s) to `false`. And, you can find bootstrap and bootstrap-vue custom stylesheet in the directory `asstes/styles/library/bootstrap` and `asstes/styles/library/bootstrapVue`. 
Each sub-directory of the `assets/styles/library` have `blocks` directory that edited or extended from default style.

2. `icons`
Set `icon: false` to use the bootstrapVue icon and create the plugin `~/plugins/importBootstrapVueIcons` for importing independently icon components.


3. `config.breakpoints`
In Nuxtrap, Extend the bootstrap 4's default breakpoints. extended breakpoints scss variables is placed in `/assets/styles/library/_library.scss`.
Read More the Section **Configuring defaults** and **Setting new configuration values** in https://bootstrap-vue.org/docs/reference/settings#default-bootstrapvue-configuration.

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 480px,
  md: 640px,
  lg: 992px,
  xl: 1200px,
  xxl: 1366px,
  sxl: 1680px,
);
```

#### 2. Transfer data and content from server to client
Nuxtrap have custom Endpoint API in the directory `/api` and refered [configuration-servermiddleware#custom-api-endpoint](https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware#custom-api-endpoint). Each endpoint mapped to `serverMiddleware` property in `nuxt.config.js` like `{ path, handler }`.

```js
serverMiddleware: [
  bodyParser.json(),
  { path: '/test', handler: '~/api/test.js' }, // for api test
  { path: '/api/over', handler: '~/api/over.js' },
  { path: '/api/event', handler: '~/api/event.js' },
  { path: '/api/users', handler: '~/api/users.js' }
],
```

On client, Use `@nuxtjs/axios` to communicate with API Endpoints and Add `@nuxtjs/axios` to `modules` property in `nuxt.config.js` and create a axiost plugin for `interceptors` feature - `/plugins/axios.js`.

```js
modules: [
  '@nuxtjs/axios'
],
...,
plugins: [
  '~/plugins/axios'
]
```

#### 3. Integrate with Chart.js
For Integrating with Chart.js, create the plugin `/plugins/chartjs.js` and others.
- `/lib/chart.lib.js`: Chart Global Configuration Variables
- `/mixins/chart/*`: mixins for customizing chartjs js module
  - Merge default option with option passed from chart-component's props
  - Compute Scale Ticks for Bar and Line Chart
  - Create a chart color-set
  - Create a custom common style for all charts
  - Draw and Update chart instance

```js
plugins: [
  '~/plugins/chartjs',
]
```

In Nuxtrap, Created reusable chart components (`/components/chart/~`).
- Bar Chart (`/components/chart/BarChart.vue`)
- Line Chart (`/components/chart/LineChart.vue`)
- Doughnut Chart (`/components/chart/DoughnutChart.vue`)
- Pie Chart (`/components/chart/PieChart.vue`)
- PolartArea (`/components/chart/PolarArea.vue`)

<br>

## Project Structure

```markdown
.
├── ...
├── api                         # ServerMiddleware - custom Endpoint API
├── assets                      # Application resources
├── components                  # Reusable components
│   ├── base
│   ├── chart
│   ├── common
│   ├── dashboard
│   ├── event
│   ├── landing
│   ├── users
│   └── index
├── env                         # Environment vairables
├── layouts                     # Global layouts
├── lib                         # Helper Functions 
├── middleware                  # Route middleware
├── mixins                      # Reusable module for common js feature
├── pages                       # Vue Page components template
├── plugins                     # Global js module that injected to root Vue.js Application
├── static                      # Other types static resources
├── store                      	# Vuex store directory
├── test                        # Unit tests
│
│   nuxt.config.js              # Nuxt application configuration
└── ...
```

- This project is bootstrapped using [create-nuxt-app](https://nuxtjs.org/docs/get-started/installation#using-create-nuxt-app).
- `/layouts` : All Primary layout templates are located
  - `/layouts/default.vue` : for just landing page
  - `/layouts/dashboard.vue` : for types of dashboard pages
  - `/layouts/authentication.vue` : for types of authentication pages
  - `/layouts/utility.vue` : for types of utility pages
- `/pages` : Every Page component is a `.vue` Vue component. and Nuxt.js support automatic routes based on your provided Vue files inside the `pages` directory.
  - Read more, [file-system-routing](https://nuxtjs.org/docs/features/file-system-routing/).
- `/components` : all template-specific subcomponents are located in their own subdirectory.
  - components configuration is set in `components` property in `nuxt.config.js`
  - if `components: true` in `nuxt.config.js` ,  all components is automatically imported.
  - Read More, [component-discovery](https://nuxtjs.org/docs/features/component-discovery)
- `/plugins` : it contains Javascript plugins that you want to run before instantiating the root Vue.js Application.
  - Inject extended features of external packages/modules and custom features or variables in `$root` & `context`.
  - The Plugins configuration is set in `plugins` property in `nuxt.config.js`
  - Read more [plugins](https://nuxtjs.org/docs/directory-structure/plugins/), [inject-in-root--context](https://nuxtjs.org/docs/directory-structure/plugins/#inject-in-root--context)
- `/api`
  - This directory is [Custom API endpoint](https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware#custom-api-endpoint) and we can use API endpoint to enroll to `serverMiddleware` property in `nuxt.config.js`
  - Read More, [custom-server-middleware](https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware#custom-server-middleware), [custom-api-endpoint](https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware#custom-api-endpoint)
  - features of utility, middleware and library for API is placed inside `/api/~` directory. not `/(root)`.
- `/store`
  - It contains your Vuex Store files. Every `.js` file inside the `store` directory is transformed as a [namespaced module ](http://vuex.vuejs.org/en/modules.html) (`index` being the root module).
- `/assets`
  - this directory have `/images`, `/styles` and `/svgs` directory. Especially, `/styles` contains custom, layout and library *(bootstrap)* scss styles.

<br>

## Supported browsers

**Nuxtrap** follows the Supported browsers of the Bootstrap 4 because Nuxtrap's Design System and UI Component based on Bootstrap 4 and Bootstrap-vue.

Read more https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/.

- Bootstrap supports the latest, stable releases of all major browsers and platforms. On Windows, we support Internet Explorer 10-11 / Microsoft Edge.


| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE >= 10, Edge >= 12 | Firefox >= 38 | Chrome >= 45 | Safari >= 9 | iOS >= 9 | Android >= 4.4 | Opera >= 30

<br>

## Production deployment

> ✨ Note: If you want to use this repository to create your own project, you can change the Production deployment System and the Environment Variables.


**Nuxtrap** use `dotenv` node package to support environments and environment variables for deployment.

If `feature/` or `hotfix/` branch is merged into the `develop` branch, automatically the latest `develop` branch is deployed on **the Staging Server**. and, `develop` branch is merged into the `master` branch, automatically the latest `master` branch is deployed on **the Production Server**. 


| Environtment | Branch | `env` variables | Deployment |
| ------------ | -----------| ---------- | ---------- |
| Staging | `develop` | `/env/.env.staging` | [Heroku - Staging Server](https://nuxt-bootstrap-dashboard-stage.herokuapp.com/) |
| Production | `master` | `/env/.env.production` | [Heroku - Production Server](https://nuxt-bootstrap-dashboard.herokuapp.com/) |


## Changelog


<br>

## License
![license/Joontae-Kim](https://img.shields.io/github/license/Joontae-Kim/Nuxt-Bootstrap-Dashboard)

