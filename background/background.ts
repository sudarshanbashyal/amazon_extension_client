chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('Message received from content script:', message);

	// Optionally, send a response back
	sendResponse({ response: 'Hello from background script!' });
});
