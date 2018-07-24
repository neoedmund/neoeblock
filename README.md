neoeblock
=========

Neoe Ad blocker for firefox

### Block what ever neoe don't want to see.





How it works
-------------
It employs 2 phrased blocking: preload-block and postload-block.

**preload-block** blocks before a url is going to be visited.

**postload-block** blocks difficult ones, which usally loaded by javascript, something load dynamicly, written against ad-block. It remove DOM objects from web page's html, something, repeatly for some anonying AD.

Install 
-------------
The only official release link is https://github.com/neoedmund/neoeblock/raw/master/src/neoeblock2-1.0-an%2Bfx.xpi

See what is blocked, is it working good? debug
-------------
In firefox, press shift-control-K to bring up console, you will see how it is working by reading it's log.

Hacking
-------------
you can edit `neoe_block_firefox/chrome/content/preloadblock.js` and  `neoe_block_firefox/chrome/content/postloadremove.js` for special content you want to block.

Then re-package binary(xpi) use `makexpi.sh`(on Unix) or `makexpi.cmd`(on Windows), then re-install it to firefox.
(If you made some changes, a clone of this repo is welcomed.)


