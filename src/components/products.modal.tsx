import { colors, sidebarIcon, sidebarStyles, sidebarStylesActive, sidebarToggle } from './styles';
import { FaAngleLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProductsByUser } from '../services/api';

export const ProductsModal = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [authToken, setAuthToken] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const { data, error, refetch } = useQuery({
		queryFn: () =>
			getProductsByUser({
				access_token: authToken,
			}),
		enabled: !!authToken,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	console.log('products modal: ', data, error);

	useEffect(() => {
		if (showSidebar && authToken) {
			refetch();
		}
	}, [showSidebar, authToken]);

	useEffect(() => {
		setIsLoading(true);
		chrome.storage.local.get(['access_token'], (items) => {
			const token = items?.access_token;
			setAuthToken(token);
			setIsLoading(false);
		});
	}, [showSidebar]);

	return (
		<div className="sidebar-modal" style={showSidebar ? sidebarStylesActive : sidebarStyles}>
			<div className="sidarbar-toggle" style={sidebarToggle}>
				<div
					className="sidebar-icon"
					style={sidebarIcon}
					onClick={() => {
						setShowSidebar(!showSidebar);
					}}
				>
					<FaAngleLeft color={colors.primaryBlue} size="25" />
				</div>
			</div>

			{!isLoading &&
				(!authToken ? (
					<div>Login to see your products here.</div>
				) : (
					<div>
						<div>
							{data?.getProductsByUser?.map((data: any) => (
								<div>
									<h1>{data.product_title}</h1>
								</div>
							))}
						</div>
					</div>
				))}
		</div>
	);
};
