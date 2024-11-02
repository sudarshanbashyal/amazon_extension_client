import { modalHeaderStyle, modalIconStyle, modalOverlayStyles, modalStyles, modalSubtitleStyle } from './styles';
import { IoCloseSharp } from 'react-icons/io5';
import * as React from 'react';

export interface BaseModalProps {
	modalTitle: string;
	modalSubtitle: string;
	children: React.ReactNode;
	onClose: (param: any) => any;
}

export const BaseModal = ({ modalTitle, modalSubtitle, onClose, children }: BaseModalProps) => {
	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				<div className="modal-header" style={modalHeaderStyle}>
					<div>
						<h2>{modalTitle}</h2>
						<p style={modalSubtitleStyle}>{modalSubtitle}</p>
					</div>
					<div onClick={onClose} style={modalIconStyle}>
						<IoCloseSharp size={20} />
					</div>
				</div>
				{children}
			</div>
		</div>
	);
};
