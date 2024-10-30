import { CSSProperties } from 'react';

export const modalOverlayStyles: CSSProperties = {
	position: 'fixed',
	top: '0',
	right: '0',
	width: '100%',
	height: '100vh',
	backgroundColor: 'rgba(0,0,0,0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: '999999',
};

export const modalStyles: CSSProperties = {
	backgroundColor: 'white',
	padding: '1rem',
	opacity: '1',
};
