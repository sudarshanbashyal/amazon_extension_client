import { useEffect, useState } from 'react';
import { modalOverlayStyles, modalStyles } from './styles';
import { useMutation } from 'react-query';
import { saveProduct } from '../services/api';

export interface SaveProductDto {
	product_title: string;
	product_url: string;
	product_description: string;
	product_price: string;
	product_image_urls: string[];
	product_rating: number;
}

const SaveProductModal = ({ productTitle, productImage, onClose }: any) => {
	const [authToken, setAuthToken] = useState('');
	const saveProductMutation = useMutation({
		mutationFn: ({ saveProductDto, headers }: { saveProductDto: SaveProductDto; headers: Object }) =>
			saveProduct(saveProductDto, headers),
	});

	useEffect(() => {
		chrome.storage.local.get(['access_token'], (items) => {
			setAuthToken(items.access_token);
		});
	}, []);

	console.log('product mutation: ', saveProductMutation.data, saveProductMutation.error);

	const onClick = () => {
		saveProductMutation.mutate({
			saveProductDto: {
				product_title: 'prod1',
				product_url: 'url',
				product_description: 'description123',
				product_price: '123123',
				product_image_urls: ['url1', 'url2'],
				product_rating: 123,
			},
			headers: {
				access_token: authToken,
			},
		});
	};

	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				{productImage && <img src={productImage} alt="Product" />}
				<button onClick={onClose}>Close</button>
				<br></br>
				<button onClick={onClick}>Save product</button>
			</div>
		</div>
	);
};

export default SaveProductModal;
