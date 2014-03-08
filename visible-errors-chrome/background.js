// allow content script access to user prefs for this extension
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.cmd == "get_prefs")
      sendResponse({
		hostlist: localStorage.hostlist || ''
	});
    else
      sendResponse({}); // snub them.
  });