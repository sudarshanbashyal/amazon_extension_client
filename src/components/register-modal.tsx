import { useState } from 'react';
import { modalOverlayStyles, modalStyles } from './styles';
import { useMutation } from 'react-query';
import { createUser } from '../services/api';

export interface RegisterDto {
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export const RegisterModal = () => {
	const [userData, setUserData] = useState<RegisterDto>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const registerMutation = useMutation({
		mutationFn: (registerDto: RegisterDto) => createUser(registerDto),
	});
	console.log('register: ', registerMutation.data, registerMutation.error);

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

	return (
		<div className="modal-overlay" style={modalOverlayStyles}>
			<div className="modal" style={modalStyles}>
				<input name="name" value={userData.name} placeholder="Name" onChange={onChange} />
				<input name="email" value={userData.email} type="email" placeholder="Email" onChange={onChange} />
				<input name="password" value={userData.password} placeholder="Password" onChange={onChange} />
				<input
					name="confirmPassword"
					value={userData.confirmPassword}
					placeholder="Confirm Password"
					onChange={onChange}
				/>
				<button onClick={onSubmit}>Submit</button>
			</div>
		</div>
	);
};
