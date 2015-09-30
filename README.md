This is the demo project for [Phonegap Build AdMob plugin](https://github.com/appfeel/admob-google-cordova).

# Instructions:

- Go to your [Phonegap Build](https://build.phonegap.com) platform and log-in
- Go to [Apps](https://build.phonegap.com/apps) and click on `+ new app`
- Paste the following url into `find existing repo / paste .git repo`: `https://github.com/appfeel/admob-phonegap-build-demo.git`
- Click on `Pull from .git repository`
- Click on `Ready to build` button
- It will fail for ios (as your own keys are required) but will success for Android

To build iOS app, you should create your own app id and the associated keys. To do so, fork this project and change the id in `config.xml`. In order to avoid collision, we suggest you to be creative and place your company name in between:

```xml
<widget id="com.mypreferredname.admob.test" ...
```

You can also [click here](http://goo.gl/aanH2G) or scan this QR from your device to install it (only Android):

[![ScreenShot](demo/qr-cool.png)](http://goo.gl/aanH2G)
