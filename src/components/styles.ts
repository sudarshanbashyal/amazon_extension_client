import { CSSProperties } from 'react';

export const colors = {
	primaryBlue: '#1E90FF',
};

export const modalOverlayStyles: CSSProperties = {
	position: 'fixed',
	top: '0',
	right: '0',
	width: '100%',
	height: '100vh',
	backgroundColor: 'rgba(0,0,0,0.8)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: '999999',
};

export const modalStyles: CSSProperties = {
	backgroundColor: 'white',
	padding: '1rem',
	opacity: '1',
	width: '45%',
	borderRadius: '10px',
};

export const modalHeaderStyle: CSSProperties = {
	marginBottom: '2rem',
};

export const modalSubtitleStyle: CSSProperties = {
	marginBottom: '0.5rem',
};

export const sidebarStyles: CSSProperties = {
	height: '100vh',
	width: '50%',
	position: 'absolute',
	right: '-50%',
	top: 0,
	backgroundColor: 'white',
	boxShadow: '-5px 0 10px rgba(0, 0, 0, 0.2)',
	zIndex: '99999',
	padding: '1rem',
};

export const sidebarStylesActive: CSSProperties = {
	...sidebarStyles,
	right: '0',
};

export const sidebarToggle: CSSProperties = {
	position: 'absolute',
	top: '50%',
	left: '-20px',
	transform: 'translate(-50%, -50%)',
	height: '100px',
	width: '50px',
	borderRadius: '75px 0 0 75px',
	backgroundColor: 'white',
	cursor: 'pointer',
	boxShadow: '-5px 0 5px rgba(0, 0, 0, 0.2)',
};

export const sidebarIcon: CSSProperties = {
	position: 'absolute',
	top: '35%',
	left: '10%',
};

export const imageGridDiv: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
};

export const imageContainer: CSSProperties = {
	height: '75px',
	width: '50px',
};

export const productImage: CSSProperties = {
	height: '100%',
	width: '100%',
	objectFit: 'cover',
};

export const inputStyle: CSSProperties = {
	width: '100%',
	padding: '0.5rem 1rem',
	marginBottom: '1rem',
	borderRadius: '5px',
};

export const flexContainerStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	marginTop: '2rem',
};

export const primaryButtonStyle: CSSProperties = {
	padding: '0.75rem 1rem',
	border: `1px solid ${colors.primaryBlue}`,
	borderRadius: '5px',
	backgroundColor: colors.primaryBlue,
	color: 'white',
	marginRight: '1rem',
	cursor: 'pointer',
};

export const secondaryButtonStyle: CSSProperties = {
	border: '1px solid black',
	borderRadius: '5px',
	padding: '0.75rem 1rem',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	display: 'inline-block',
	color: 'black',
	textDecoration: 'none',
};

export const plainButtonStyle: CSSProperties = {
	...secondaryButtonStyle,
	border: 'none',
	paddingLeft: '0',
};

export const productDetailContainerStyle: CSSProperties = {
	margin: '1rem 0rem',
};

export const productDetailsInnerStyle: CSSProperties = {
	margin: '0.5rem 0rem',
	padding: '0.5rem',
	border: '1px solid gray',
	borderRadius: '5px',
};

export const productDetailsKeyStyle: CSSProperties = {
	marginBottom: '0.5rem',
	textTransform: 'capitalize',
};

export const productDetailsTextStyle: CSSProperties = {
	marginBottom: '0.5rem',
};
