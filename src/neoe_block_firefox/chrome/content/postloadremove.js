
// define the element to remove
var toRemove=[
// format [site,element], if site exists in url or site is not set, element will be removed
// element is defined in jquery format
	[0,".everyonelovesstackoverflow"],
	["yahoo", "#brandpanel"],
	[0, '[id^="ADframe"]'],
	["yahoo", 'div[id^="ad"]'],
	[0,"[id='ad']"],
	["tube8.com","iframe"],
	["fantasy8.com","iframe"],
	[0,'[id*="_ads_"]'],
	[0,'[id*="_ad_"]'],
	[0,'[class*="_ads_"]'],
	[0,'[class*="_ad_"]'],
	[0,'[id^="ads_"]'],
	["solidot",".adv"],
	[0,"[id^='cproIframe']"],
	[0,"[id^='BAIDU_DUP_']"],
	[0,"[id^='ad-w-']"],
	[0,"[id^='ad-w-']"],
	["sohu.com", "sohuadcode"],
	["tieba.baidu.com", "div[data-daid]"],
];

var removeFuncs = [ // [enabled, site, function]
	[1, "yahoo", function(doc){ // yahoo, PR
			var cnt=0;
			$.each($("*",doc),function(i,x){
				cnt++;
				if (x.innerHTML=="PR"){
					//console.debug(x);
					$(x).parent().remove();
					console.debug("[neoe]removed PR");
				}
			})
			console.debug("checked "+cnt);
	} ],
	[0, "solidot.org", function(doc){ //
		var func1=function(){
			var s="div.adv";
			var x=$(s,doc);
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
			}
			setTimeout(func1, 1000);
		}
		func1();
	} ],
	[0, "twitter.com" , function(doc){ // twitter quick text
			$.each($(".js-tweet-text",doc), function(i,x){
				console.debug($(x).text());
			});
	}],
	[1, "facebook", function(doc){ // yahoo, PR
		var func1=function(){
			var s="div.ego_column";
			var x=$(s,doc);
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
			}
			setTimeout(func1, 1000);
		}
		func1();
	} ],

	[1, "baidu.com", function(doc) {
		var func1=function(){
			{
				var s='div[title="商业推广"]';
				//console.debug("check "+s);
				var x=$(s,doc);
				if (x.length) {
					console.debug("[neoe]remove "+x.length+"x "+s);
					$.each(x, function(index,item){
						console.debug("[neoe]remove "+ item);
						var t = $(item).parent().parent().parent();
						console.debug("[neoe]remove "+ t);
						t.remove();
					});
				}
			}
			{
				var s="div[data-daid]";
				var x=$(s,doc);
				if (x.length) {
					console.debug("[neoe]remove "+x.length+"x "+s);
					x.remove();
				}
			}
			setTimeout(func1, 10000);
		}
		func1();
	} ],

	[0, "all", function(doc){ // all ad , disable for bad performance
		var func1=function(){
			var x;
			x=$('[id*="_ad_"]');
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
			}
			x=$('[id*="_adv_"]');
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
			}
			x=$('[id*="_ads_"]');
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
			}
			setTimeout(func1, 10000);
			console.debug("[neoe]run-check");
		}
		func1();
	} ],
];


function work(doc) {
//	console.debug("[neoe]postload working");
	//$.defaultContext = doc.defaultView;
	var passed="1";
	var href = doc.URL;
	// removing
	$.each(toRemove, function(i,ss){
		var site=ss[0];
		if (site==0||href.indexOf(site)>=0){
			//console.debug(ss);
			var s=ss[1];
			var x=$(s,doc);
			//console.debug("[neoe]"+s+":"+x.length);
			if (x.length) {
				console.debug("[neoe]remove "+x.length+"x "+s);
				x.remove();
				passed="toRemove";
			}else{
				//console.debug("pass");
			}
		}
	});

	// customized functions
	$.each(removeFuncs, function(i,x){
		if (x[0]){ //enabled
			var site=x[1];
			if (site=="all" || href.indexOf(site)>=0){ //site
				var f=x[2];
				f(doc); // function
				passed="removeFuncs";
			}
		}
	});
	if (passed!="1")
		console.debug("[neoe]postload worked:"+passed);
	else
		console.debug("[neoe]postload passed");
};



window.addEventListener('load', function() {
    var appcontent = document.getElementById('appcontent');
    if(appcontent != null) {
        appcontent.addEventListener('DOMContentLoaded', function(event) {
            var doc = event.originalTarget;
            if(doc instanceof HTMLDocument) {
                work(doc);
            }
        }, true);
    }
}, false);
