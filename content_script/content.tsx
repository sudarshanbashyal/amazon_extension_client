import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from 'react-query';

// Unmount the react component from DOM when extension is disabled.
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

	// DOM elements for the primary and alt images
	const productImageEl = document.querySelector('#imgTagWrapperId img');
	const productAltImagesEl = document.querySelectorAll('.item.imageThumbnail');

	const reviewEl = document.querySelector('#averageCustomerReviews .a-size-base.a-color-base');

	/*
	 * The DOM content/structure for prices, and description are different depending on the type of product,
	 * So multiple DOM elements have been listed to increase extraction accuracy.
	 */
	const pricesEl = document.querySelectorAll('.a-price.a-text-price');
	const pricesAlternateEl = document.getElementById('corePriceDisplay_desktop_feature_div');
	const pricesWithOptionsEl = document.getElementById('twister');

	const productFactsDetails = document.getElementById('productFactsDesktop_feature_div');
	const featuredBulletsEl = document.getElementById('feature-bullets');
	const descriptionEl = document.getElementById('productDescription');
	const descriptionFeatureDivEl = document.getElementById('bookDescription_feature_div');

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

	if (pricesAlternateEl) {
		const sym = pricesAlternateEl?.querySelector('.a-price-symbol')?.textContent || '';
		const whole = pricesAlternateEl?.querySelector('.a-price-whole')?.textContent || '';
		const frac = pricesAlternateEl?.querySelector('.a-price-fraction')?.textContent || '';

		let totalPriceString = `${sym}${whole}${frac}`;
		productPrices.add(totalPriceString);
	}

	if (pricesWithOptionsEl) {
		const priceLiElements = document.querySelectorAll('.twisterSlotDiv');
		priceLiElements.forEach((el) => {
			const priceText = el?.querySelector('span > span')?.innerHTML;
			if (priceText) {
				const separatedPrice = priceText.split('<br>')?.[1] || '';
				productPrices.add(separatedPrice?.trim());
			}
		});
	}

	const productDescriptionPoints: string[] = [];
	if (featuredBulletsEl || productFactsDetails) {
		const descriptionEl = featuredBulletsEl || productFactsDetails;
		const pointsEl = descriptionEl?.querySelectorAll('li');
		pointsEl?.forEach((el) => {
			const point = el.querySelector('span')?.textContent || '';
			if (point) productDescriptionPoints.push(point);
		});
	}
	if (descriptionEl) {
		const descriptionText = descriptionEl.textContent || '';
		productDescriptionPoints.push(descriptionText?.trim());
	}
	if (descriptionFeatureDivEl) {
		const descriptionText = descriptionFeatureDivEl.textContent || '';
		productDescriptionPoints.push(descriptionText?.trim());
	}

	// fetching current url without the query params
	const currentTabUrl = window.location?.href?.split('?')[0] || '';

	if (!currentTabUrl.startsWith('https://www.amazon.')) return;
	if (productTitle && productImageUrls?.length) {
		showComponent({
			title: productTitle,
			review: productAvgReview,
			imageUrls: productImageUrls,
			description: productDescriptionPoints.join(`\n`),
			price: Array.from(productPrices).join(','),
			productUrl: currentTabUrl,
		});
	} else {
		/*
		 * Injecting component with empty object in case it is not the product page,
		 * but the page still belongs to amazon so that the sidebar can be shown.
		 */
		showComponent({});
	}
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

// Listening to disable/enable extension events.
chrome.storage.local.onChanged.addListener((event: any) => {
	if (event?.extension_enabled?.newValue) {
		checkForProductId();
	} else if (event?.extension_enabled?.oldValue) {
		hideComponent();
	}
});
