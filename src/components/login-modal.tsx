import { useEffect, useState } from 'react';
import { inputStyle, modalOverlayStyles, modalStyles, primaryButtonStyle, secondaryButtonStyle } from './styles';
import { useQuery } from 'react-query';
import { login } from '../services/api';
import { AUTH_MODE } from '../App';
import { BaseModal } from './base-modal';

export interface LoginDto {
	email: string;
	password: string;
}

export interface LoginProps {
	setAuthMode: (authMode: AUTH_MODE) => void;
	setAuthToken: (token: string) => void;
}

export const LoginModal = ({ setAuthToken, setAuthMode }: LoginProps) => {
	const { data, error, refetch } = useQuery({
		queryFn: () => login(userData),
		retry: 0,
		retryOnMount: false,
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
		<BaseModal modalTitle="Sign In" modalSubtitle="Log in to your account to save products.">
			<label>Email</label>
			<input
				style={inputStyle}
				name="email"
				value={userData.email}
				type="email"
				placeholder="Email"
				onChange={onChange}
			/>

			<label>Password</label>
			<input
				style={inputStyle}
				name="password"
				type="password"
				value={userData.password}
				placeholder="Password"
				onChange={onChange}
			/>

			<div>
				<button style={primaryButtonStyle} onClick={onSubmit}>
					Submit
				</button>
				<button
					style={secondaryButtonStyle}
					onClick={() => {
						setAuthMode(AUTH_MODE.AUTH_REGISTER);
					}}
				>
					Register Instead
				</button>
			</div>
		</BaseModal>
	);
};
