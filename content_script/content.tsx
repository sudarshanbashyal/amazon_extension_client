import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from 'react-query';

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

	const queryClient = new QueryClient();

	createRoot(document.getElementById('react-root')!).render(
		<QueryClientProvider client={queryClient}>
			<App hideComponent={hideComponent} productData={data} />
		</QueryClientProvider>,
	);
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

	if (productIdElement && productImageElement)
		showComponent({
			productTitle: productIdElement?.innerText,
			productImage: productImageElement?.getAttribute('src'),
		});
};

checkForProductId();
