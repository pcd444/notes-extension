chrome.action.onClicked.addListener(
    tab => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [
                'injected-content/notepad-injector.js'            ]
          });
        chrome.scripting.insertCSS({
            target: {tabId: tab.id},
            files:[
                'injected-content/notepad.css'
            ]
        });
    }
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.purpose === 'getFileText'){
        let url = chrome.runtime.getURL(request.fileName);
        fetch(url).then(r=>r.text()).then(text=> sendResponse(text))
        return true;
    }
});