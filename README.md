# Anatomy of a Progressive Web App

## What Is a PWA?
A PWA is simply an application which can perform some or all of its functions even if there is no Internet connectivity. PWAs can run in the browser, but they are more often saved by the user as an external application.

## Example

To install a sample PWA on your smartphone, follow the instructions in Activity 07-Stu_PWAs. This isn't mandatory. The app you are installing was originally built as a normal web application, but then the code was modified to make it into a PWA.

## Building a PWA

### The Manifest

The first step to building a PWA is to build a manifest file. This file tells the browser some basic info about the PWA for when it runs in a "standalone" mode. This repo contains a sample manifest file (manifest.json). You'll see that you can specify the name of the app, and some details about how it should look when it runs in standalone mode. You will also see a listing of icon sizes -- these are the varying icon sizes needed by various platforms when showing your app on their screens. I would follow the same naming convention you see here.

In the root index.html file of your application you will need to link to that manifest file:

```
<link rel="manifest" href="manifest.json" />
```

### The Service Worker 

Service workers are Javascript code that operate between your web application and any server that it connects to. They basically act as a bridge so that you can (in the case of PWAs) intercept calls being made to/from the server and do something else when there is no Internet connection. You will see a fully-commented service worker file in this repo. You can use almost all of this code as-is.

You also have to register your service worker so that the browser knows it's there. The easiest way is to put this code inside a script tag on your home page:

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

Your app will need a way to store structured data; and allow you to modify that data, even when offline. So we use IndexedDB. The file db.js in this repo can be used almost as-is. Make sure you have it loaded via a script tag on your index.html page.

```
<script src="db.js"></script>
```

