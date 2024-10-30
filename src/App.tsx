import './index.css';
import { useQuery } from 'react-query';
import { pingServer } from './services/api';
import { RegisterModal } from './components/register-modal';
import { LoginModal } from './components/login-modal';
import SaveProductModal from './components/save-product-modal';

const App = ({ hideComponent, productData }: any) => {
	console.log(hideComponent, productData);

	const { data, error } = useQuery('ping', pingServer);
	console.log(data, error);

	return (
		<div>
			<SaveProductModal />
		</div>
	);
};

export default App;
