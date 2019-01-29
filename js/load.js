InboxSDK.load('1.0', 'sdk_new_ext_xxxxxxxxxx').then(function(sdk){
  init(sdk);
});


window.addEventListener("message", receiveMessage, false);

var data = '';
function receiveMessage(event) {
    // Do we trust the sender of this message?  (might be
    // different from what we originally opened, for example).
    if (event.origin !== "https://localhost:4430")
        return;

    // event.source is popup
    // event.data is "hi there yourself!  the secret response is: rheeeeet!"
    console.log("received message!!!");
    data = event.data;

    InboxSDK.load('1.0', 'sdk_new_ext_xxxxxxxxxx').then(function (sdk) {
        sdk.Compose.registerComposeViewHandler(function (composeView) {
            composeView.insertHTMLIntoBodyAtCursor(data);
            data = '';
        });
    });
}

