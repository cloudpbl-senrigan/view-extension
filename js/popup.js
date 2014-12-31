$(document).ready( function() {
  $("#open").click(function() {
    var BG = chrome.extension.getBackgroundPage();
    chrome.tabs.create({url: "http://157.82.3.31:3000/top/front"}, function(tab) {
        BG.saveFrontTabId(tab.id);
    } );
    chrome.tabs.create({url: "http://157.82.3.31:3000/top/left"}, function(tab) {
        BG.saveLeftTabId(tab.id);
    } );
    chrome.tabs.create({url: "http://157.82.3.31:3000/top/right"}, function(tab) {
        BG.saveRightTabId(tab.id);
    } );
  });
});
