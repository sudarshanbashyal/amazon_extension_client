chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// read changeInfo data and do something with it (like read the url)
	if (changeInfo.url) {
		// do something here
		console.log('url just changed ' + tabId + JSON.stringify(tab));
		chrome.tabs.executeScript({ code: "console.log('Hello World!')" }, callback);
	}
});
