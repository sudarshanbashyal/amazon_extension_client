import { useEffect, useState } from 'react';
import { modalOverlayStyles, modalStyles } from './styles';
import { useQuery } from 'react-query';
import { login } from '../services/api';
import { AUTH_MODE } from '../App';

export interface LoginDto {
	email: string;
	password: string;
}

export const LoginModal = ({ setAuthToken, setAuthMode }: any) => {
	const { data, error, refetch } = useQuery({
		queryFn: () => login(userData),
		enabled: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data?.login) {
			chrome.storage.local.set({ access_token: data.login }, () => {
				setAuthToken(data?.login);
			});
		}
	}, [data]);

	const [userData, setUserData] = useState<LoginDto>({
		email: '',
		password: '',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((userData) => ({
			...userData,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		refetch();
	};

	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				<input name="email" value={userData.email} type="email" placeholder="Email" onChange={onChange} />
				<input name="password" value={userData.password} placeholder="Password" onChange={onChange} />
				<button onClick={onSubmit}>Submit</button>
				<button
					onClick={() => {
						setAuthMode(AUTH_MODE.AUTH_REGISTER);
					}}
				>
					Register
				</button>
				<br></br>
				<button
					onClick={() => {
						let authToken = '';
						chrome.storage.local.get(['access_token'], (items) => {
							console.log('items: ', items);
							authToken = items.access_token;
						});
						console.log('auth token: ', authToken);
					}}
				>
					check cookie
				</button>
			</div>
		</div>
	);
};
