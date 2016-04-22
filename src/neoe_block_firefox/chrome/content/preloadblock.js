// try to block page before loading

var toBlock=[
	"google-analytics.com",
	"doubleclick.net",
	"googlesyndication.com/",
	"/adtv/",
	"baidu.com/cpro",
	"baidu.com/adrc.php",
	"drmcmm.baidu.com",
	"exoclick.com",
	"livejasmin.com",
	"ads.traffichaus.com",
	"camads.net",
	"/ads.",
	".ads.",
	"uramov.info",
	"serving-sys.com",
	".impact-ad.jp",
	".adnxs.com",
	".tribalfusion.com",
	".oggifinogi.com",
	"mmcdn.cn/",
	"baidu.com/cb.php?",
	"ubmcmm.baidustatic.com/media/v1/",
//	"gstatic.com",
//	"sstatic.net",
	"ocsp.gandi.net",
	"quantserve.com",
	"adzerk.net",
	"bestofmedia.com",
	"b.scorecardresearch.com",
	"cdn.biddingx.com",
	"click.tanx.com",
	"static.mediav.com",
	"img.solidot.org/swf/",
	"baifendian.com",
	"platform.twitter.com", // speed up sf.net load
	"1e100.net",//wtf
	"pos.baidu.com/ecom?",
	".googleapis.com", // fonts,ajax,...
	"_ad_",
	"_ads_",
	"_adv_",
	"apis.google.com",
	"asearch.alicdn.com", "strip.taobaocdn.com", //taobao ad
	"360.cn", //i have nothing to do with 360
	"/livechat/",
	"sohu.com/bill/",
	"bmp.ali213.net",
	"hao123.com",
	"/adsense/",
	"zhanqi.tv/"
];

var toRedirect={
	".*://ajax.googleapis.com/.*/jquery.min.js" :"http://code.jquery.com/jquery-1.11.3.min.js",
};

var testObserver = {
  observe : function(aSubject, aTopic, aData) {
	  //console.debug("[neoe]preload in:"+aTopic);
	  if ("http-on-modify-request" == aTopic) {
		    var httpChannel = aSubject.QueryInterface(Components.interfaces.nsIHttpChannel);
		    var url = aSubject.URI.spec;
		    console.debug("[neoe]preload checking "+url);

		    for(var x in toRedirect) {
		    	//console.debug("[neoe]redirect check: " +x);
		    	if (new RegExp(x).test(url)) {
		    		var y = toRedirect[x];
			    	console.debug("[neoe]redirect: " + url+" to "+y);

		    		httpChannel.redirectTo(Services.io.newURI(y, null, null));
		    		return;
		    	}
		    }
			var i;
		    for (i=0;i<toBlock.length;i++){
		   	var x=toBlock[i];
		   	if (url.indexOf(x)>=0) {
		    	 	console.debug("[neoe]cancel by '"+x+"': " + url);
		    	 	//var request = aSubject.QueryInterface(Components.interfaces.nsIRequest);
			    	 aSubject.cancel(Components.results.NS_BINDING_ABORTED);
			    	 return;
			}
		    }
	  }
  },
     register: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
            .getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(testObserver, "http-on-modify-request", false);
        console.debug("[neoe]preload registered");
    },

    unregister: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
            .getService(Components.interfaces.nsIObserverService);
        observerService.removeObserver(testObserver, "http-on-modify-request");
        console.debug("[neoe]preload unregistered");
    }


}

window.addEventListener("load", testObserver.register, false);
window.addEventListener("unload", testObserver.unregister, false);
