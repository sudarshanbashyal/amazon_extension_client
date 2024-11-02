import {
	primaryButtonStyle,
	sidebarIcon,
	sidebarloginButton,
	sidebarLoginPromptContainer,
	sidebarStyles,
	sidebarStylesActive,
	sidebarToggle,
	sidebarToggleActive,
} from './styles';
import { FaAngleLeft } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getProductsByUser } from '../services/api';
import { AUTH_MODE } from '../App';
import { ProductDetail } from './product-detail';
import { Pagination } from './pagination';

export interface PaginationVaribles {
	limit: number;
	page: number;
}

export interface ProductsModalProps {
	setAuthMode: (val: AUTH_MODE) => void;
}

export const ProductsModal = ({ setAuthMode, authToken, setAuthToken }: any) => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [isLoading, setIsLoading] = useState(true); //
	const [currPage, setCurrPage] = useState(1);

	const modalRef = useRef<HTMLDivElement>(null);

	const { data, refetch } = useQuery({
		queryFn: () =>
			getProductsByUser(
				{
					limit: 5,
					page: currPage,
				},
				{
					access_token: authToken,
				},
			),
		queryKey: [currPage],
		enabled: !!authToken,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	const logout = () => {
		setAuthToken('');
		chrome?.storage?.local?.remove('access_token');
	};

	useEffect(() => {
		if (showSidebar && authToken) {
			refetch();
		}
	}, [showSidebar, authToken]);

	useEffect(() => {
		setIsLoading(true);
		chrome?.storage?.local?.get(['access_token'], (items) => {
			const token = items?.access_token;
			setAuthToken(token);
			setIsLoading(false);
		});
	}, [showSidebar]);

	useEffect(() => {
		if (modalRef?.current) {
			modalRef?.current?.scrollTo(0, 0);
		}
	}, [currPage]);

	return (
		<>
			<div
				onClick={() => {
					setShowSidebar(!showSidebar);
				}}
				className="sidebar-toggle"
				style={showSidebar ? sidebarToggleActive : sidebarToggle}
			>
				<div className="sidebar-icon" style={sidebarIcon}>
					<FaAngleLeft color="white" size="25" />
				</div>
			</div>
			<div ref={modalRef} className="sidebar-modal" style={showSidebar ? sidebarStylesActive : sidebarStyles}>
				{!isLoading &&
					/*
					 * Show the login option if no auth token is found in chrome storage,
					 */
					(!authToken ? (
						<div style={sidebarLoginPromptContainer}>
							<div>
								<h2>Login to see your saved products.</h2>
								<button
									style={sidebarloginButton}
									onClick={() => {
										setAuthMode(AUTH_MODE.AUTH_LOGIN);
										setShowSidebar(false);
									}}
								>
									Log In
								</button>
							</div>
						</div>
					) : (
						/*
						 * In case auth token is present, display saved products if they exist.
						 */
						<div>
							<button style={primaryButtonStyle} onClick={logout}>
								Logout
							</button>
							{!isLoading ? (
								<div>
									{!data?.getProductsByUser?.products?.length ? (
										<h2>No Saved Products.</h2>
									) : (
										<>
											{data?.getProductsByUser?.products?.map((data: ProductDetail) => (
												<ProductDetail productDetails={data} />
											))}

											<Pagination
												paginationData={data?.getProductsByUser?.pagination}
												isLoading={isLoading}
												onNext={() => {
													setCurrPage(currPage + 1);
												}}
												onPrev={() => {
													setCurrPage(currPage - 1);
												}}
											/>
										</>
									)}
								</div>
							) : (
								<h2>Loading...</h2>
							)}
						</div>
					))}
			</div>
		</>
	);
};
