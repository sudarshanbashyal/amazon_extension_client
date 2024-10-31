import './index.css';
import { useMutation, useQuery } from 'react-query';
import { pingServer, saveProduct } from './services/api';
import { RegisterModal } from './components/register-modal';
import { LoginModal } from './components/login-modal';
import SaveProductModal, { SaveProductDto } from './components/save-product-modal';
import { useEffect, useState } from 'react';
import DefaultPopup from './components/default-popup';
import { ToastContainer, toast } from 'react-toastify';
import { ProductsModal } from './components/products.modal';

export enum AUTH_MODE {
	AUTH_LOGIN = 'AUTH_LOGIN',
	AUTH_REGISTER = 'AUTH_REGISTER',
}

const App = ({ productData, hideComponent }: any) => {
	const [isExtensionEnabled, setIsExtensionEnabled] = useState(false);
	const [authMode, setAuthMode] = useState<AUTH_MODE | null>(null);
	const [authToken, setAuthToken] = useState('');
	const [hideProductModal, setHideProductModal] = useState(false);

	const [productDetails, setProductDetails] = useState<SaveProductDto>({
		product_title: productData?.title,
		product_url: 'test',
		product_description: 'test',
		product_price: '123123',
		product_image_urls: productData?.imageUrls,
		product_rating: +productData?.review,
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.name, typeof e.target.value);
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

	// const { data, error } = useQuery('ping', pingServer);

	useEffect(() => {
		chrome.storage.local.get(['extension_enabled'], (items) => {
			const enabled = items.extension_enabled;
			console.log('app is enabled: ', enabled);
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

	// {Object.keys(productData || {})?.length ? (
	// authMode === AUTH_MODE.AUTH_LOGIN ? (
	// 	<LoginModal setAuthToken={setAuthToken} setAuthMode={setAuthMode} />
	// ) : authMode === AUTH_MODE.AUTH_REGISTER ? (
	// 	<RegisterModal setAuthMode={setAuthMode} />
	// ) : (
	// 	<SaveProductModal
	// 		productData={productDetails}
	// 		onClose={hideComponent}
	// 		onChange={onChange}
	// 		setAuthMode={setAuthMode}
	// 	/>
	// )
	// ) : productData ? (
	// <ProductsModal />
	// ) : (
	// <DefaultPopup />
	// )}

	return (
		<div>
			<ToastContainer />
			{/* {productData && <ProductsModal />} */}
			{Object.keys(productData || {})?.length ? (
				authMode === AUTH_MODE.AUTH_LOGIN ? (
					<LoginModal setAuthToken={setAuthToken} setAuthMode={setAuthMode} />
				) : authMode === AUTH_MODE.AUTH_REGISTER ? (
					<RegisterModal setAuthMode={setAuthMode} />
				) : !hideProductModal ? (
					<SaveProductModal
						productData={productDetails}
						onClose={hideComponent}
						onChange={onChange}
						setAuthMode={setAuthMode}
						setHideProductModal={setHideProductModal}
					/>
				) : (
					<ProductsModal />
				)
			) : productData ? (
				<ProductsModal />
			) : (
				<DefaultPopup isExtensionEnabled={isExtensionEnabled} setIsExtensionEnabled={setIsExtensionEnabled} />
			)}
		</div>
	);
};

export default App;
