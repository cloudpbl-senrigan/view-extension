chrome.runtime.sendMessage({name: "start"}, function(response) {});

var target = document.querySelector('#counter');
var config = {
    childList: true,
    characterData: true,
    subtree: true
};

var observer = new MutationObserver(function(mutations, self) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'characterData') {
            var data = new Object();
            data.name = "move";
            data.x = $('#x').html();
            data.y = $('#y').html();
            data.z = $('#z').html();
            data.theta = $('#theta').html();
            chrome.runtime.sendMessage(data, function(response) {});
        }
    });
});

observer.observe(target, config);
