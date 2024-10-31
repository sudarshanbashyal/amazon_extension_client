export interface DefaultPopupProps {
	isExtensionEnabled: boolean;
	setIsExtensionEnabled: (val: boolean) => void;
}

const DefaultPopup = ({ isExtensionEnabled, setIsExtensionEnabled }: DefaultPopupProps) => {
	const toggleExtension = () => {
		console.log('hello world');
		if (isExtensionEnabled) {
			chrome.storage.local.remove('extension_enabled');
		} else {
			chrome.storage.local.set({ extension_enabled: true });
		}
		setIsExtensionEnabled(!isExtensionEnabled);
	};

	const checkEnabled = () => {
		chrome.storage.local.get(['extension_enabled'], (items) => {
			console.log('is enabled: ', items.extension_enabled);
		});
	};

	return (
		<div>
			<button onClick={toggleExtension}>{isExtensionEnabled ? 'Disable' : 'Enable'}Extension</button>
			<br></br>
			<br></br>
			<button onClick={checkEnabled}>Check Enabled</button>
			<br></br>
			<br></br>
		</div>
	);
};

export default DefaultPopup;
