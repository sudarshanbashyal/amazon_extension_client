import { useEffect, useState } from 'react';
import { errorStyle, flexContainerStyle, inputStyle, primaryButtonStyle, secondaryButtonStyle } from './styles';
import { useMutation } from 'react-query';
import { createUser } from '../services/api';
import { AUTH_MODE } from '../App';
import { BaseModal } from './base-modal';

export interface RegisterDto {
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface RegisterModalProps {
	setAuthMode: (authMode: AUTH_MODE) => void;
}

export const RegisterModal = ({ setAuthMode }: RegisterModalProps) => {
	const [userData, setUserData] = useState<RegisterDto>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	const registerMutation = useMutation<any, any, any>({
		mutationFn: () => createUser(userData),
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((userData) => ({
			...userData,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: React.FormEvent) => {
		registerMutation.reset();
		setErrorMessage('');
		e.preventDefault();

		if (userData?.password?.trim()?.length < 6) {
			setErrorMessage('Password must be at least 6 characters in length.');
			return;
		}
		if (userData?.password !== userData?.confirmPassword) {
			setErrorMessage('Passwords must be the same.');
			return;
		}

		const registerData = userData;
		registerMutation.mutate(registerData);
	};

	useEffect(() => {
		if (registerMutation.data && !registerMutation.isError) {
			setAuthMode(AUTH_MODE.AUTH_LOGIN);
		}
	}, [registerMutation]);

	useEffect(() => {
		if (!registerMutation?.error || registerMutation.isLoading) return;
		if (registerMutation?.error?.response?.errors?.length)
			setErrorMessage(registerMutation?.error?.response?.errors?.[0]?.message);
		else setErrorMessage('Failed to register. Please try again.');
	}, [registerMutation]);

	return (
		<BaseModal modalTitle="Register" modalSubtitle="Create a new account">
			<form onSubmit={onSubmit}>
				<label>Name</label>
				<input required style={inputStyle} name="name" value={userData.name} placeholder="Name" onChange={onChange} />

				<label>Email</label>
				<input
					required
					style={inputStyle}
					name="email"
					value={userData.email}
					type="email"
					placeholder="Email"
					onChange={onChange}
				/>

				<label>Password</label>
				<input
					required
					style={inputStyle}
					type="password"
					name="password"
					value={userData.password}
					placeholder="Password"
					onChange={onChange}
				/>

				<label>Confirm Password</label>
				<input
					required
					style={inputStyle}
					name="confirmPassword"
					type="password"
					value={userData.confirmPassword}
					placeholder="Confirm Password"
					onChange={onChange}
				/>

				{errorMessage && <p style={errorStyle}>{errorMessage}</p>}

				<div style={flexContainerStyle}>
					<button disabled={registerMutation.isLoading} style={primaryButtonStyle} formAction="submit">
						Create account
					</button>
					<button
						style={secondaryButtonStyle}
						onClick={() => {
							setAuthMode(AUTH_MODE.AUTH_LOGIN);
						}}
					>
						Login Instead
					</button>
				</div>
			</form>
		</BaseModal>
	);
};
