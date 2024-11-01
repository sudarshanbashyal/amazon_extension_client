import { modalHeaderStyle, modalOverlayStyles, modalStyles, modalSubtitleStyle } from './styles';

export const BaseModal = ({ modalTitle, modalSubtitle, children }: any) => {
	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				<div className="modal-header" style={modalHeaderStyle}>
					<h2>{modalTitle}</h2>
					<p style={modalSubtitleStyle}>{modalSubtitle}</p>
					<hr></hr>
				</div>
				{...children}
			</div>
		</div>
	);
};
