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
