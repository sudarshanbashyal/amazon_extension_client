import { useEffect, useState } from 'react';
import {
	flexContainerStyle,
	inputStyle,
	modalOverlayStyles,
	modalStyles,
	primaryButtonStyle,
	secondaryButtonStyle,
} from './styles';
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

export const RegisterModal = ({ setAuthMode }: any) => {
	const [userData, setUserData] = useState<RegisterDto>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const registerMutation = useMutation({
		mutationFn: (registerDto: RegisterDto) => createUser(registerDto),
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserData((userData) => ({
			...userData,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const registerData = userData;
		delete registerData.confirmPassword;
		registerMutation.mutate(registerData);
	};

	useEffect(() => {
		if (registerMutation.data && !registerMutation.isError) {
			setAuthMode(AUTH_MODE.AUTH_LOGIN);
		}
	}, [registerMutation]);

	return (
		<BaseModal modalTitle="Register" modalSubtitle="Create a new account">
			<label>Name</label>
			<input style={inputStyle} name="name" value={userData.name} placeholder="Name" onChange={onChange} />

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
				type="password"
				name="password"
				value={userData.password}
				placeholder="Password"
				onChange={onChange}
			/>

			<label>Confirm Password</label>
			<input
				style={inputStyle}
				name="confirmPassword"
				type="password"
				value={userData.confirmPassword}
				placeholder="Confirm Password"
				onChange={onChange}
			/>

			<div style={flexContainerStyle}>
				<button style={primaryButtonStyle} onClick={onSubmit}>
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
		</BaseModal>
	);
};
