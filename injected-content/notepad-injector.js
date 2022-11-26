console.log('script started')
if(!window.MyFlag9393949489239085){
    window.MyFlag9393949489239085 = true;
    console.log('main entered');
    // iife for async.
    (async function(){
        // Fetch the notepad html
        let html = await chrome.runtime.sendMessage({purpose:'getFileText',fileName:'injected-content/notepad.html'});
        let pageKey = `textData-${window.location.href}`;
        debugger;
        let textData = await chrome.storage.local.get(createQueryObject(pageKey,Date()));
        textData = textData[pageKey];
        // Build the notepad element
        let element = htmlToElement(html);
        // Inject the notepad into the page
        document.body.appendChild(element);
        let writingSpace = document.getElementById('notepad-extension-writing-space');
        writingSpace.value = textData;

        // Update the data every minute.
        setInterval(()=>{
            let queryObj = createQueryObject(pageKey, writingSpace.value);
            chrome.storage.local.set(queryObj);
        }, 60 * 1000);

        document.onvisibilitychange = () => {
            if (document.visibilityState === 'hidden') {
                let queryObj = createQueryObject(pageKey, writingSpace.value);
                chrome.storage.local.set(queryObj);
            }
        };
    })();
}
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function createQueryObject(key,value){
    let output = {};
    output[key] = value;
    return output;
}