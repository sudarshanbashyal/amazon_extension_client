chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	// Optionally, send a response back
	sendResponse({ response: 'Hello from background script!' });
});
