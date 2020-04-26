# Phaser 3 Typescript Project

## Getting Started

Do `npm install` then `npm start`!

If not work, need to be installed:

> `$ npm install webpack-dev-server -g`

> `$ npm install webpack -g`

> `$ npm install webpack-cli -g`

## Native App

The simplest way to build a Native App is using [Capacitor](https://capacitor.ionicframework.com/docs/). The only thing you need to change after installing Capacitor is the **webDir** inside the **capacitor.config.json** file. Set it to **dist** like so:
```
{
  "appId": "com.example.app",
  "appName": "YOUR_APP_NAME",
  "bundledWebRuntime": false,
  "webDir": "dist"
}
```

## PWA Ready

The ServiceWorker is **disabled by default**. Uncomment the line below inside __/src/index.html__ to enable it.

```
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
    })
  }
</script>
```

You can easily personalize its settings by following these steps:

* Replace both icons in /pwa/icons with your own.

> One is 512x512 the other 192x192

* Add your own favicon.ico to /src

* Adjust these parameters in the manifest.json file in /pwa

> short_name: Max. 12 characters

> name: The full game name

> orientation: "landscape" or "portrait"

> background_color: color of the splash screen

> theme_color: color of the navbar - has to match the theme-color in the index.html file

* You can leave the sw.js (serviceWorker) in /pwa how it is.

* Change the gameName in /webpack/webpack.common.js
