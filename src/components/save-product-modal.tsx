import { useEffect, useState } from 'react';
import { modalOverlayStyles, modalStyles } from './styles';
import { useMutation } from 'react-query';
import { saveProduct } from '../services/api';
import { AUTH_MODE } from '../App';
import { toast } from 'react-toastify';

export interface SaveProductDto {
	product_title?: string;
	product_url?: string;
	product_description?: string;
	product_price?: string;
	product_image_urls?: string[];
	product_rating?: number;
}

export interface SaveProductModalProps {
	productData: SaveProductDto;
	onClose: () => void;
	onChange: any;
	setAuthMode: (mode: AUTH_MODE) => void;
}

const SaveProductModal = ({ productData, setAuthMode, onClose, onChange }: SaveProductModalProps) => {
	const [authToken, setAuthToken] = useState('');

	const saveProductMutation = useMutation({
		mutationFn: ({ saveProductDto, headers }: { saveProductDto: SaveProductDto; headers: Object }) =>
			saveProduct(saveProductDto, headers),
	});

	const onClick = () => {
		if (!authToken) {
			setAuthMode(AUTH_MODE.AUTH_LOGIN);
			return;
		}

		saveProductMutation.mutate({
			saveProductDto: productData,
			headers: {
				access_token: authToken,
			},
		});
	};

	useEffect(() => {
		chrome.storage.local.get(['access_token'], (items) => {
			setAuthToken(items.access_token);
		});
	}, []);

	useEffect(() => {
		if (saveProductMutation.data && !saveProductMutation.isError) {
			console.log('product saved');
		}
	}, [saveProductMutation]);

	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				<input name="product_title" value={productData.product_title} placeholder="Title" onChange={onChange} />
				<input
					min={0}
					max={5}
					name="product_rating"
					value={+(productData?.product_rating || 0)}
					type="number"
					placeholder="Review Score"
					onChange={onChange}
				/>

				<button onClick={onClose}>Close</button>
				<br></br>
				<button onClick={onClick}>Save product</button>
			</div>
		</div>
	);
};

export default SaveProductModal;
