import {
	imageContainer,
	imageGridDiv,
	plainButtonStyle,
	productDetailContainerStyle,
	productDetailsInnerStyle,
	productDetailsKeyStyle,
	productDetailsTextStyle,
	productImage,
} from './styles';
import { FaExternalLinkAlt } from 'react-icons/fa';

export interface ProductDetailProps {
	productDetails: ProductDetail;
}

export interface ProductDetail {
	_id: string;
	product_title: string;
	product_description?: string;
	product_price?: string;
	product_image_urls?: string[];
	product_rating?: number;
	product_url: string;
	user: string;
}

export const ProductDetail = ({ productDetails }: ProductDetailProps) => {
	const textKeys: (keyof ProductDetail)[] = ['product_description', 'product_price', 'product_rating'];

	return (
		<div style={productDetailContainerStyle}>
			<h3>{productDetails.product_title}</h3>
			<a style={plainButtonStyle} href={productDetails.product_url} target="_blank">
				Visit Link <FaExternalLinkAlt />
			</a>

			{/* Looping through the keys to get the fields that are only texts to lessen repeated code */}
			<div className="details-inner" style={productDetailsInnerStyle}>
				{textKeys.map((key) => (
					<div key={key}>
						<strong style={productDetailsKeyStyle}>{key.split('_').join(' ')}</strong>
						<p style={productDetailsTextStyle}>{productDetails[key] || '--'}</p>
					</div>
				))}

				<div>
					<strong style={productDetailsKeyStyle}>Product Images</strong>
					<div style={imageGridDiv}>
						{productDetails?.product_image_urls?.map((url: string, i: number) => (
							<div key={i} style={imageContainer}>
								<img src={url} style={productImage} />
							</div>
						))}
					</div>
				</div>
			</div>

			<hr />
		</div>
	);
};
