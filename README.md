# Instructions for testing Cordova AdMob plugin:

- [Download zip](https://github.com/appfeel/admob-google-cophodemo/archive/master.zip) project or clone it via git CLI:
```
git clone https://github.com/appfeel/admob-google-cophodemo.git AdmobAdsTest
```

- Add com.admob.google plugin to the project:
````
cd AdmobAdsTest
cordova plugin add com.admob.google
```

- Add platforms to the project:
```
cordova platform add ios android
```

- Emulate the application:
````
cordova emulate android
cordova emulate ios
````