import { colors, sidebarIcon, sidebarStyles, sidebarStylesActive, sidebarToggle } from './styles';
import { FaAngleLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getProductsByUser } from '../services/api';
import { AUTH_MODE } from '../App';

export interface ProductsModalProps {
	setAuthMode: (val: AUTH_MODE) => void;
}

export const ProductsModal = ({ setAuthMode }: ProductsModalProps) => {
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

	const logout = () => {
		setAuthToken('');
		chrome.storage.local.remove('access_token');
	};

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
					<div>
						Login to see your products here.
						<button
							onClick={() => {
								setShowSidebar(false);
								setAuthMode(AUTH_MODE.AUTH_LOGIN);
							}}
						>
							Log In
						</button>
					</div>
				) : (
					<div>
						<button onClick={logout}>Logout</button>
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
