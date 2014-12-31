var domain = "http://157.82.3.31:3000/"
var view_tabs = new Object();

var saveFrontTabId = function(front_id) {
    view_tabs.front_id = front_id;
};
var saveLeftTabId = function(left_id) {
    view_tabs.left_id = left_id;
};
var saveRightTabId = function(right_id) {
    view_tabs.right_id = right_id;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.name === "start") {
        chrome.pageAction.show(sender.tab.id);
        sendResponse({tabid: sender.tab.id});
    } else if (request.name === "move") {
        if (typeof(view_tabs) != "undefined") {
            if (typeof(view_tabs.front_id) != "undefined") {
                var front_theta = request.theta;
                chrome.tabs.get(view_tabs.front_id, function(tab) {
                    var new_url = domain + "top/" + request.x + "/" + request.y + "/" + request.z + "/" + front_theta + "/front"
                    chrome.tabs.update(tab.id, {url: new_url});
                });
             }
             if (typeof(view_tabs.left_id) != "undefined") {
                var left_theta = String((Number(request.theta) + 270) % 360);
                chrome.tabs.get(view_tabs.left_id, function(tab) {
                    var new_url = domain + "top/" + request.x + "/" + request.y + "/" + request.z + "/" + left_theta + "/left"
                    chrome.tabs.update(tab.id, {url: new_url});
                });
             } 
             if (typeof(view_tabs.right_id) != "undefined") {
                var right_theta = String((Number(request.theta) + 90) % 360);
                chrome.tabs.get(view_tabs.right_id, function(tab) {
                    var new_url = domain + "top/" + request.x + "/" + request.y + "/" + request.z + "/" + right_theta + "/right"
                    chrome.tabs.update(tab.id, {url: new_url});
                });
             }
        }
        sendResponse({tabid: sender.tab.id});
    }
});

