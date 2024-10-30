const Modal = ({ productTitle, productImage, onClose }: any) => {
	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Product Found!</h2>
				<p>{productTitle}</p>
				{productImage && <img src={productImage} alt="Product" />}
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default Modal;
