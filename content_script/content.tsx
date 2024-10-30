import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';

const hideComponent = () => {
	const reactNode = document.getElementById('react-root');
	reactNode?.remove();
};

const showComponent = (data: any) => {
	const body = document.querySelector('body');
	const app = document.createElement('div');

	app.id = 'react-root';

	if (body) {
		body.prepend(app);
	}

	createRoot(document.getElementById('react-root')!).render(<App hideComponent={hideComponent} data={data} />);
};

const showModal = (data: any) => {
	const modalOverlay = document.createElement('div');
	const modal = document.createElement('div');
	const modalContent = document.createElement('div');
	const closeButton = document.createElement('button');

	// Set styles for the modal and overlay
	modalOverlay.style.position = 'fixed';
	modalOverlay.style.top = '0';
	modalOverlay.style.left = '0';
	modalOverlay.style.right = '0';
	modalOverlay.style.bottom = '0';
	modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
	modalOverlay.style.display = 'flex';
	modalOverlay.style.justifyContent = 'center';
	modalOverlay.style.alignItems = 'center';
	modalOverlay.style.zIndex = '9999';

	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.borderRadius = '5px';
	modal.style.textAlign = 'center';
	modal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';

	closeButton.textContent = 'Close';
	closeButton.onclick = () => {
		document.body.removeChild(modalOverlay);
	};

	modalContent.innerHTML = '<h2>Product Found!</h2><p>This page contains the product ID.</p>';
	modal.appendChild(modalContent);
	modal.appendChild(closeButton);
	modalOverlay.appendChild(modal);
	document.body.appendChild(modalOverlay);
};

const checkForProductId = () => {
	const productIdElement = document.getElementById('productTitle');
	const productImageElement = document.querySelector('#imgTagWrapperId img');
	console.log('from content script: ', productIdElement?.innerText, productImageElement?.getAttribute('src'));
	chrome.runtime.sendMessage({
		action: 'saveProduct',
		data: {
			productTitle: productIdElement?.innerHTML,
			productImage: productImageElement?.getAttribute('src'),
		},
	});

	showComponent({
		productTitle: productIdElement?.innerText,
		productImage: productImageElement?.getAttribute('src'),
	});

	// if (productIdElement) {
	// 	// Send a message to the React app to show the modal
	// 	chrome.runtime.sendMessage({ showModal: true });
	// }
};

checkForProductId();
