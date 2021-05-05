# Anatomy of a Progressive Web App

## What Is a PWA?
A PWA is simply an application which can perform some or all of its functions even if there is no Internet connectivity. PWAs can run in the browser, but they are more often saved by the user as an external application.

## Example

To install a sample PWA on your smartphone, follow the instructions in Activity 07-Stu_PWAs. This isn't mandatory. The app you are installing was originally built as a normal web application, but then the code was modified to make it into a PWA.

## Building a PWA

### The Manifest

The first step to building a PWA is to build a manifest file. This file tells the browser some basic info about the PWA for when it runs in a "standalone" mode. This repo contains a sample manifest file (manifest.json). You'll see that you can specify the name of the app, and some details about how it should look when it runs in standalone mode. You will also see a listing of icon sizes -- these are the varying icon sizes needed by various platforms when showing your app on their screens. I would follow the same naming convention you see here.

For you to do:  In the manifest.json file I create a reference to the first icon in the iconset. You create a reference to the second. Also, change the background color and theme color to #ffffff.

In the root index.html file of your application you will need to link to that manifest file:

```
<link rel="manifest" href="manifest.json" />
```

### The Service Worker 

Service workers are Javascript code that operate between your web application and any server that it connects to. They basically act as a bridge so that you can (in the case of PWAs) intercept calls being made to/from the server and do something else when there is no Internet connection. You will see a fully-commented service worker file in this repo. You can use almost all of this code as-is. But check the code for any comments where you may need to modify something.

You also have to register your service worker so that the browser knows it's there. The easiest way is to put this code inside a script tag on your home page, OR, you can put the code at the very top in the index.js page:

```
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('Service worker registered.', reg);
      });
  });
}
```

### Incorporate IndexedDB 

Your app will need a way to store structured data when there is no access to the server; and allow you to modify that data, even when offline. So we use IndexedDB. 

IndexedDB is built into the browser and stores data in a way similar to NoSQL/Mongo, but with different methods for access and other CRUD functions.

The file db.js in this repo can be used almost as-is, and is intended to be this way. You will need to specify the name of your database and your object store.

Make sure you have this code loaded via a script tag on your index.html page.

```
<script src="db.js"></script>
```

### Setup and Testing

You are provided with all the server-side code that is needed, no changes are necessary. You only to modify select files in the public directory.

When you think everything is ready, launch the server file (```node server.js```) and then load the index.html file in your browser.

If that works, then you must disable Internet connectivity in the browser (or turn off the server if you're running locally), and see if the page behaves correctly. You can disable Internet connectivity in Chrome in dev tools, in the Network tab, with the Throttling drop down menu (select Offline).

Don't forget to deploy to Heroku and test there as well!

And do NOT include this README as part of the homework!