import { useEffect, useState } from 'react';
import {
	flexContainerStyle,
	imageContainer,
	imageGridDiv,
	inputStyle,
	primaryButtonStyle,
	productImage,
	secondaryButtonStyle,
} from './styles';
import { useMutation } from 'react-query';
import { saveProduct } from '../services/api';
import { AUTH_MODE } from '../App';
import {} from './styles';
import { BaseModal } from './base-modal';

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
	setHideProductModal: (hide: boolean) => void;
}

const SaveProductModal = ({
	productData,
	setAuthMode,
	onClose,
	onChange,
	setHideProductModal,
}: SaveProductModalProps) => {
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
		chrome?.storage?.local?.get(['access_token'], (items) => {
			setAuthToken(items.access_token);
		});
	}, []);

	useEffect(() => {
		if (saveProductMutation.data && !saveProductMutation.isError) {
			console.log('product saved');
		}
	}, [saveProductMutation]);

	return (
		<BaseModal modalTitle="Save Product" modalSubtitle="This product will be saved to your database.">
			<label>Extracted Title</label>
			<input
				style={inputStyle}
				name="product_title"
				value={productData.product_title}
				placeholder="Title"
				onChange={onChange}
			/>

			<label>Extracted Rating</label>
			<input
				style={inputStyle}
				min={0}
				max={5}
				name="product_rating"
				value={+(productData?.product_rating || 0)}
				type="number"
				placeholder="Review Score"
				onChange={onChange}
			/>

			<label>Extracted Price</label>
			<input
				style={inputStyle}
				name="product_price"
				value={productData?.product_price}
				placeholder="Product Price"
				onChange={onChange}
			/>

			<label>Extraced Descriiption</label>
			<textarea style={inputStyle} name="product_description" onChange={onChange} rows={7}>
				{productData?.product_description}
			</textarea>

			<label>Extraced Images</label>
			<div style={imageGridDiv}>
				{productData?.product_image_urls?.map((url: string, i: number) => (
					<div key={i} style={imageContainer}>
						<img src={url} style={productImage} />
					</div>
				))}
			</div>

			<div style={flexContainerStyle}>
				<button style={primaryButtonStyle} onClick={onClick}>
					Save product
				</button>
				<button
					style={secondaryButtonStyle}
					onClick={() => {
						setHideProductModal(true);
					}}
				>
					Discard
				</button>
			</div>
		</BaseModal>
	);
};

export default SaveProductModal;
