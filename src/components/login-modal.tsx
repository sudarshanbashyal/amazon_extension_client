import { useEffect, useState } from 'react';
import { errorStyle, inputStyle, primaryButtonStyle, secondaryButtonStyle } from './styles';
import { useQuery } from 'react-query';
import { login } from '../services/api';
import { AUTH_MODE } from '../App';
import { BaseModal } from './base-modal';

export interface LoginDto {
	email: string;
	password: string;
}

export interface LoginProps {
	setAuthMode: (authMode: AUTH_MODE | null) => void;
	setAuthToken: (token: string) => void;
}

export const LoginModal = ({ setAuthToken, setAuthMode }: LoginProps) => {
	const [errorMessage, setErrorMessage] = useState('');

	const { data, error, refetch, isLoading } = useQuery<any, any>({
		queryFn: () => login(userData),
		retry: 0,
		retryOnMount: false,
		enabled: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		/*
		 * Setting the cache time to 0 for login.
		 * If cache is enabled for login, when the user logs out, the auth token is again set from the cache resulting in inconsistency.
		 */
		cacheTime: 0,
	});

	// Update the state present in App.tsx so that the auth token can be in other API calls
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

	const onSubmit = (e: React.FormEvent) => {
		setErrorMessage('');
		e.preventDefault();
		refetch();
	};

	useEffect(() => {
		if (!error) return;
		if (error?.response?.errors?.length) setErrorMessage(error?.response?.errors?.[0]?.message);
		else setErrorMessage('Failed to login. Please try again.');
	}, [error]);

	return (
		<BaseModal
			modalTitle="Sign In"
			modalSubtitle="Log in to your account to save products."
			onClose={() => {
				setAuthMode(null);
			}}
		>
			<form onSubmit={onSubmit}>
				<label>Email</label>
				<input
					style={inputStyle}
					name="email"
					value={userData.email}
					type="email"
					placeholder="Email"
					onChange={onChange}
					required
				/>

				<label>Password</label>
				<input
					style={inputStyle}
					name="password"
					type="password"
					value={userData.password}
					placeholder="Password"
					onChange={onChange}
					required
				/>

				{errorMessage && <p style={errorStyle}>{errorMessage}</p>}

				<div>
					<button formAction="submit" style={primaryButtonStyle}>
						Sign In
					</button>
					<button
						disabled={data || isLoading}
						style={secondaryButtonStyle}
						onClick={() => {
							setAuthMode(AUTH_MODE.AUTH_REGISTER);
						}}
					>
						Register Instead
					</button>
				</div>
			</form>
		</BaseModal>
	);
};
