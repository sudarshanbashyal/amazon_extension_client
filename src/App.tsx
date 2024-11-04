import { RegisterModal } from './components/register-modal';
import { LoginModal } from './components/login-modal';
import SaveProductModal, { SaveProductDto } from './components/save-product-modal';
import { useEffect, useState } from 'react';
import DefaultPopup from './components/default-popup';
import { ProductsModal } from './components/products.modal';

export enum AUTH_MODE {
	AUTH_LOGIN = 'AUTH_LOGIN',
	AUTH_REGISTER = 'AUTH_REGISTER',
}

const App = ({ productData }: any) => {
	const [isExtensionEnabled, setIsExtensionEnabled] = useState(false);
	const [authMode, setAuthMode] = useState<AUTH_MODE | null>(null);
	const [authToken, setAuthToken] = useState('');
	const [hideProductModal, setHideProductModal] = useState(false);

	/*
	 * State for product details are set in the App.tsx so that when changes are made, and then user has to either login/register
	 * the changed data is still preserved even after the product modal is mounted and unmounted.
	 */
	const [productDetails, setProductDetails] = useState<SaveProductDto>({
		product_title: productData?.title,
		product_url: productData?.productUrl,
		product_description: productData?.description,
		product_price: productData?.price,
		product_image_urls: productData?.imageUrls,
		product_rating: +productData?.review,
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target.name;
		let val: string | number = e.target.value;
		if (target === 'product_rating' && val) {
			val = +val;
		}

		setProductDetails((productDetails) => ({
			...productDetails,
			[target]: val,
		}));
	};

	useEffect(() => {
		chrome?.storage?.local?.get(['extension_enabled'], (items) => {
			const enabled = items.extension_enabled;
			if (enabled) {
				setIsExtensionEnabled(true);
			}
		});
	}, []);

	useEffect(() => {
		if (authToken) {
			setAuthMode(null);
		}
	}, [authToken]);

	return (
		<div>
			{authMode === AUTH_MODE.AUTH_LOGIN && <LoginModal setAuthToken={setAuthToken} setAuthMode={setAuthMode} />}
			{authMode === AUTH_MODE.AUTH_REGISTER && <RegisterModal setAuthMode={setAuthMode} />}

			{Object.keys(productData || {}).length ? (
				!hideProductModal && !authMode ? (
					<SaveProductModal
						productData={productDetails}
						onChange={onChange}
						setAuthMode={setAuthMode}
						setHideProductModal={setHideProductModal}
					/>
				) : (
					<ProductsModal authToken={authToken} setAuthToken={setAuthToken} setAuthMode={setAuthMode} />
				)
			) : productData ? (
				<ProductsModal authToken={authToken} setAuthToken={setAuthToken} setAuthMode={setAuthMode} />
			) : (
				<DefaultPopup isExtensionEnabled={isExtensionEnabled} setIsExtensionEnabled={setIsExtensionEnabled} />
			)}
		</div>
	);
};

export default App;
