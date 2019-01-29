
var _showLog = true;
const FIRST_IFRAME_ID = 'sniphero-iframe-frame';

function appendFrameTo(parent) { 
  _log('appendFrameTo, iframe:', document.getElementById(FIRST_IFRAME_ID));
  try {
    if (document.getElementById(FIRST_IFRAME_ID))
      return;
    var ifrme = document.createElement('iframe');
    ifrme.src = chrome.runtime.getURL('frame.html');
    // 'https://app.sniphero.com/AppCompose/home/home.html?app=chrome';
    ifrme.width = 300;
    ifrme.height = 500;
    ifrme.scrolling = 'no';
    ifrme.setAttribute('id', FIRST_IFRAME_ID);
    ifrme.setAttribute('frameborder', '0');
    ifrme.setAttribute('marginheight', '0');
    ifrme.setAttribute('marginwidth', '0');
    ifrme.onload = function() {
      //_log('iframe loaded', ifrme);
    }
    parent.appendChild(ifrme);
  } catch(e) {
    console.error('appendFrameTo catch: ', e);
  }
}

function onButton(evnt) {

  var ddv = evnt.dropdown; // DropDownView
  //_log('onClick, evnt:', evnt);
  _log('msg body:', evnt.composeView.getBodyElement());
  _log('dropdown:', ddv.el);
  _log("url is: " + window.location.href);
  _log("document url is: " + document.URL);
  appendFrameTo(ddv.el);
  ddv.setPlacementOptions({
    position: 'top', //null, "top", "bottom", "left", or "right"
    //forcePosition: true,
    //hAlign forceHAlign vAlign forceVAlign
    bottomBuffer: 2 // buffer topBuffer bottomBuffer leftBuffer rightBuffer
  });
}


function init(sdk) { 

  sdk.Compose.registerComposeViewHandler(function(composeView){
    composeView.addButton({
      title: "Sniphero",
      iconUrl: chrome.extension.getURL('icon128.png'),
      hasDropdown: true,
      onClick: onButton
    });
    composeView.on('destroy', function (event) {
    });
  });

    chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.data)
            alert("Hi, there is message from the website");
        var data = request.data;
        alert(data);
    });

}


function _log() {
  if (_showLog)
    console.log.apply(console, arguments);
}

