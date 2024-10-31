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
	const productTitleEl = document.getElementById('productTitle');
	const productImageEl = document.querySelector('#imgTagWrapperId img');
	const productAltImagesEl = document.querySelectorAll('.item.imageThumbnail');
	const reviewEl = document.querySelector('#averageCustomerReviews .a-size-base.a-color-base');
	const pricesEl = document.querySelectorAll('.a-price.a-text-price');

	const productFactsDetails = document.getElementById('productFactsDesktop_feature_div');
	const featuredBulletsEl = document.getElementById('feature-bullets');

	console.log('content script: ', featuredBulletsEl);

	const productImageUrls: string[] = [];
	const productTitle = productTitleEl?.innerText?.trim() || '';
	const productAvgReview = reviewEl?.textContent || '';

	const primaryImageUrl = productImageEl?.getAttribute('src') || '';
	productImageUrls.push(primaryImageUrl);

	productAltImagesEl.forEach((el) => {
		const imgElement = el.querySelector('img');
		const imgUrl = imgElement?.getAttribute('src') || '';
		productImageUrls.push(imgUrl);
	});

	// creating a set because sometimes the off-screen prices are duplicated on amazon webpage
	const productPrices = new Set();
	pricesEl.forEach((el) => {
		const priceEl = el.querySelector('span');
		const price = priceEl?.textContent || '';
		productPrices.add(price);
	});

	const productDescriptionPoints: string[] = [];
	if (featuredBulletsEl || productFactsDetails) {
		const descriptionEl = featuredBulletsEl || productFactsDetails;
		const pointsEl = descriptionEl?.querySelectorAll('li');
		pointsEl?.forEach((el) => {
			const point = el.querySelector('span')?.textContent || '';
			if (point) productDescriptionPoints.push(point);
		});
	}
	console.log('content script: ', productDescriptionPoints);

	// if (productTitle && productImageUrls?.length) {
	// 	showComponent({
	// 		title: productTitle,
	// 		review: productAvgReview,
	// 		imageUrls: productImageUrls,
	// 	});
	// } else {
	// 	showComponent({});
	// }

	// chrome.runtime.sendMessage({
	// 	action: 'saveProduct',
	// 	data: {
	// 		productTitle: productTitleEl?.innerHTML,
	// 		productImage: productImageEl?.getAttribute('src'),
	// 	},
	// });
};

const checkIfExtensionEnabled = () => {
	chrome.storage.local.get(['extension_enabled'], (items) => {
		const enabled = items?.extension_enabled;
		if (enabled) {
			checkForProductId();
		}
	});
};

checkIfExtensionEnabled();

chrome.storage.local.onChanged.addListener((event: any) => {
	console.log('changed value: ', event?.extension_enabled?.newValue);
	if (event?.extension_enabled?.newValue) {
		checkForProductId();
	} else if (event?.extension_enabled?.oldValue) {
		hideComponent();
	}
});
