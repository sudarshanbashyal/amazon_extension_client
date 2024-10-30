const App = () => {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		// read changeInfo data and do something with it (like read the url)
		if (changeInfo.url) {
			// do something here
			alert('url just changed ' + tabId + JSON.stringify(tab));
		}
	});

	const onClick = async () => {
		let [tab] = await chrome.tabs.query({ active: true });
		chrome.scripting.executeScript({
			target: { tabId: tab.id! },
			func: async () => {
				const title = document.getElementById('productTitle');
				console.log('extension title: ', title);
				alert(`${title}`);
			},
		});
	};

	return (
		<div>
			<button onClick={onClick}>Click</button>
		</div>
	);
};

export default App;
