/*
 index.js
 Copyright 2014 AppFeel. All rights reserved.
 http://www.appfeel.com
 
 AdMobAds Cordova Plugin (com.admob.google)
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

var app = {
  // global vars
  autoShowInterstitial: false,
  progressDialog: document.getElementById("progressDialog"),
  spinner: document.getElementById("spinner"),
  weinre: {
    enabled: false,
    ip: '', // ex. http://192.168.1.13
    port: '', // ex. 9090
    targetApp: '' // ex. see weinre docs
  },
  
  // Application Constructor
  initialize: function () {
    if (( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    } else {
      app.onDeviceReady();
    }
  },
  // Must be called when deviceready is fired so AdMobAds plugin will be ready
  initAds: function () {
    var isAndroid = (/(android)/i.test(navigator.userAgent));
    var adPublisherIds = {
      ios : {
        banner: 'ca-app-pub-9863325511078756/5232547029',
        interstitial: 'ca-app-pub-9863325511078756/6709280228'
      },
      android : {
        banner: 'ca-app-pub-9863325511078756/9802347428',
        interstitial: 'ca-app-pub-9863325511078756/2279080628'
      }
    };

    var admobid;
    if (isAndroid) {
      admobid = adPublisherIds.android;
    } else {
      admobid = adPublisherIds.ios;
    }

    admob.setOptions({
      publisherId: admobid.banner,
      interstitialAdId: admobid.interstitial,
      bannerAtTop: false, // set to true, to put banner at top
      overlap: false, // set to true, to allow banner overlap webview
      offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
      isTesting: true, // receiving test ads (do not test with real ads as your account will be banned)
      autoShowBanner: true, // auto show banners ad when loaded
      autoShowInterstitial: false // auto show interstitials ad when loaded
    });
    
    // Adjust viewport
    var viewportScale = 1 / window.devicePixelRatio;
    document.getElementById("viewport").setAttribute("content", "user-scalable=no, initial-scale=" + viewportScale + ", minimum-scale=0.2, maximum-scale=2, width=device-width"); 
  },
  // Bind Event Listeners
  bindAdEvents: function () {
    document.addEventListener("orientationchange", this.onOrientationChange, false);
    document.addEventListener(admob.events.onAdLoaded, this.onAdLoaded, false);
    document.addEventListener(admob.events.onAdFailedToLoad, this.onAdFailedToLoad, false);
    document.addEventListener(admob.events.onAdOpened, function (e) {}, false);
    document.addEventListener(admob.events.onAdClosed, function (e) {}, false);
    document.addEventListener(admob.events.onAdLeftApplication, function (e) {}, false);
    document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {}, false);
  },
  
  // -----------------------------------
  // Events.
  // The scope of 'this' is the event.
  // -----------------------------------
  onOrientationChange: function () {
    app.onResize();
  },
  onDeviceReady: function () {
    var weinre,
        weinreUrl;
    
    document.removeEventListener('deviceready', app.onDeviceReady, false);
    
    if (app.weinre.enabled) {
      console.log('Loading weinre...');
      weinre = document.createElement('script');
      weinreUrl = app.weinre.ip + ":" + app.weinre.port;
      weinreUrl += '/target/target-script-min.js';
      weinreUrl += '#' + app.weinre.targetApp;
      weinre.setAttribute('src', weinreUrl);
      document.head.appendChild(weinre);
    }
    
    if (admob) {
      console.log('Binding ad events...');
      app.bindAdEvents();
      console.log('Initializing ads...');
      app.initAds();
    } else {
      alert('AdMobAds plugin not ready');
    }
  },
  onAdLoaded: function (e) {
    app.showProgress(false);
    if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
      if (app.autoShowInterstitial) {
        admob.showInterstitialAd();
      } else {
        alert("Interstitial is available. Click on 'Show Interstitial' to show it.");
      }
    }
  },
  onAdFailedToLoad: function(event, e) {
    app.showProgress(false);
    alert("Could not load ad: " + e.reason);
  },
  onResize: function () {
    var msg = 'Web view size: ' + window.innerWidth + ' x ' + window.innerHeight;
    document.getElementById('sizeinfo').innerHTML = msg;
  },
  
  // -----------------------------------
  // App buttons functionality
  // -----------------------------------
  startBannerAds: function () {
    app.showProgress(true);
    admob.createBannerView(function (){}, function (e) {
      alert(JSON.stringify(e));
    });
  },
  removeBannerAds: function () {
    app.showProgress(false);
    admob.destroyBannerView();
  },
  showBannerAds: function () {
    app.showProgress(false);
    admob.showBannerAd(true, function (){}, function (e) {
      alert(JSON.stringify(e));
    });
  },
  hideBannerAds: function () {
    app.showProgress(false);
    admob.showBannerAd(false);
  },
  requestInterstitial: function (autoshow) {
    app.showProgress(true);
    app.autoShowInterstitial = autoshow;
    admob.requestInterstitialAd(function (){}, function (e) {
      alert(JSON.stringify(e));
    });
  },
  showInterstitial: function() {
    app.showProgress(false);
    admob.showInterstitialAd(function (){}, function (e) {
      alert(JSON.stringify(e));
    });
  },
  showProgress: function(show) {
    if (show) {
      addClass(app.spinner, "animated");
      removeClass(app.progressDialog, "hidden");
    } else {
      addClass(app.progressDialog, "hidden");
      removeClass(app.spinner, "animated");
    }
  }
};

function removeClass(elem, cls) {
  var str;
  do {
    str = " " + elem.className + " ";
    elem.className = str.replace(" " + cls + " ", " ").replace(/^\s+|\s+$/g, "");
  } while (str.match(cls));
}

function addClass(elem, cls) {
  elem.className += (" " + cls);
}