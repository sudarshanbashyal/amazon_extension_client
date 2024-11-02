import { useEffect, useState } from 'react';
import {
	errorStyle,
	flexContainerStyle,
	imageContainer,
	imageGridDiv,
	inputStyle,
	primaryButtonDisabledStyle,
	primaryButtonStyle,
	productImage,
	secondaryButtonStyle,
	successStyle,
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
	onChange: any;
	setAuthMode: (mode: AUTH_MODE) => void;
	setHideProductModal: (hide: boolean) => void;
}

const SaveProductModal = ({ productData, setAuthMode, onChange, setHideProductModal }: SaveProductModalProps) => {
	const [authToken, setAuthToken] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const saveProductMutation = useMutation<any, any, any>({
		mutationFn: ({ saveProductDto, headers }: { saveProductDto: SaveProductDto; headers: Object }) =>
			saveProduct(saveProductDto, headers),
	});

	const onSubmit = (e: React.FormEvent) => {
		setErrorMessage('');
		e.preventDefault();
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
		if (!saveProductMutation?.error) return;
		if (saveProductMutation?.error?.response?.errors?.length)
			setErrorMessage(saveProductMutation?.error?.response?.errors?.[0]?.message);
		else setErrorMessage('Failed to save product. Please try again.');
	}, [saveProductMutation]);

	useEffect(() => {
		chrome?.storage?.local?.get(['access_token'], (items) => {
			setAuthToken(items.access_token);
		});
	}, []);

	useEffect(() => {
		if (saveProductMutation.data && !saveProductMutation.isError) {
			setTimeout(() => {
				setHideProductModal(true);
			}, 2000);
		}
	}, [saveProductMutation]);

	return (
		<BaseModal
			modalTitle="Save Product"
			modalSubtitle="This product will be saved to your database."
			onClose={() => {
				setHideProductModal(true);
			}}
		>
			<form onSubmit={onSubmit}>
				<label>Extracted Title</label>
				<input
					required
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
					step=".01"
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

				{errorMessage && <p style={errorStyle}>{errorMessage}</p>}
				{saveProductMutation?.data && <p style={successStyle}>Product saved successfully!</p>}

				{!saveProductMutation?.data && (
					<div style={flexContainerStyle}>
						<button
							disabled={saveProductMutation?.isLoading || saveProductMutation?.data}
							style={saveProductMutation?.isLoading ? primaryButtonDisabledStyle : primaryButtonStyle}
							formAction="submit"
						>
							{saveProductMutation?.isLoading ? 'Processing..' : 'Save Product'}
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
				)}
			</form>
		</BaseModal>
	);
};

export default SaveProductModal;
