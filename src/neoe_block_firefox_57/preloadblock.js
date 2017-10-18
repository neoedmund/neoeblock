var toBlock=[
	"google-analytics.com",
	"doubleclick.net",
	"googlesyndication.com/",
	"/adtv/",
	"baidu.com/cpro",
	"pos.baidu.com/",
	"baidu.com/adrc.php",
	"tb.himg.baidu.com/sys/portrait/item",
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
	"zhanqi.tv/",
	"img.twcczhu.com",
	"654321wan.com",
	"x.jd.com",
	"tv.sohu.com",
	"/ads-",
	".gamingadult.com",
	"x/257596-1798120618297533_1.jpg",
	"/ads/"
];


function preloadBlock(requestDetails) {
  var url = requestDetails.url;
  console.debug("[neoe]pre: " + url);
  { // redirect
  	if (url.endsWith("/jquery.min.js") && url.indexOf("//ajax.googleapis.com/")>0){
    		var y = "https://code.jquery.com/jquery-3.1.1.slim.min.js" ;
	    	console.debug("[neoe]redirect: " + url+" to "+y);
	    	return {redirectUrl: y};
  	}
  }
  {//block
    var i;
    for (i=0;i<toBlock.length;i++){
   	var x=toBlock[i];
   	if (url.indexOf(x)>=0) {
   		console.debug("[neoe]cancel by '"+x+"': " + url);
   		return {cancel: true};
   	}
	}
	return {cancel: false};
    }
}


browser.webRequest.onBeforeRequest.addListener(
  preloadBlock,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
