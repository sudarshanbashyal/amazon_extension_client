import { defaultPopupContainerStyle, primaryButtonStyle } from './styles';

export interface DefaultPopupProps {
	isExtensionEnabled: boolean;
	setIsExtensionEnabled: (val: boolean) => void;
}

const DefaultPopup = ({ isExtensionEnabled, setIsExtensionEnabled }: DefaultPopupProps) => {
	const toggleExtension = () => {
		if (isExtensionEnabled) {
			chrome.storage.local.remove('extension_enabled');
		} else {
			chrome.storage.local.set({ extension_enabled: true });
		}
		setIsExtensionEnabled(!isExtensionEnabled);
	};

	return (
		<div style={defaultPopupContainerStyle}>
			<h2>👋 Hello, Welcome to</h2>
			<h1>Amazon Product Extractor</h1>
			<br />
			{isExtensionEnabled ? (
				<h4>The extension is enabled and ready to use.</h4>
			) : (
				<h4>To starting capturing amazon products, please enable this extension.</h4>
			)}
			<br />
			<button style={primaryButtonStyle} onClick={toggleExtension}>
				{isExtensionEnabled ? 'Disable ' : 'Enable '}Extension
			</button>
		</div>
	);
};

export default DefaultPopup;
