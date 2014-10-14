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
In firefox(iceweal), press shift-control-A, to about:addons , then click on tool icon, then press "Install Add-on from file",
then select **neoe_block_firefox.xpi** to install, you need restart firefox to make it start to work.
The newest install binary is https://github.com/neoedmund/neoeblock/blob/master/src/neoe_block_firefox.xpi?raw=true

See what is blocked, is it working good? debug
-------------
In firefox, press shift-control-K to bring up console, you will see how it is working by reading it's log.

Hacking
-------------
you can edit `neoe_block_firefox/chrome/content/preloadblock.js` and  `neoe_block_firefox/chrome/content/postloadremove.js` for special content you want to block.
Then package binary(xpi) use `makexpi.sh`(on Unix) or `makexpi.cmd`(on Windows)


