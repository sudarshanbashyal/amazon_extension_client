chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// read changeInfo data and do something with it (like read the url)
	if (changeInfo.url) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			// if (tabs.length > 0) {
			// 	chrome.tabs.sendMessage(tabs[0].id, { greeting: 'Hello from background!' });
			// } else {
			// 	console.log('No active tabs found.');
			// }
		});
	}
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'saveProduct') {
		const productData = message.data;
		console.log('product data: ', productData);
	}
});
