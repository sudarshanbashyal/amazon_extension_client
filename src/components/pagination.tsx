import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { colors, flexContainerStyle, paginationContainerDisabledStyle, paginationContainerStyle } from './styles';

export interface PaginationProps {
	paginationData: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
	onNext: (param: any) => any;
	onPrev: (param: any) => any;
	isLoading: boolean;
}

export const Pagination = ({ paginationData, onNext, onPrev, isLoading }: PaginationProps) => {
	return (
		<>
			<div style={flexContainerStyle}>
				<button
					disabled={isLoading || paginationData.page === 1}
					style={paginationData.page === 1 ? paginationContainerDisabledStyle : paginationContainerStyle}
					onClick={onPrev}
				>
					<FaAngleLeft color={paginationData.page === 1 ? 'gray' : colors.primaryBlue} size="25" />
				</button>
				<button
					disabled={isLoading || paginationData.page === paginationData.totalPages}
					style={
						paginationData.page === paginationData.totalPages
							? paginationContainerDisabledStyle
							: paginationContainerStyle
					}
				>
					<FaAngleRight
						onClick={onNext}
						color={paginationData.page === paginationData.totalPages ? 'gray' : colors.primaryBlue}
						size="25"
					/>
				</button>
			</div>
		</>
	);
};
