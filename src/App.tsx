import { useState } from 'react';
import './App.css';

const App = ({ hideComponent, data }: any) => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button
				className="click-btn"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Click ${count}
			</button>

			{data && (
				<button
					className="click-btn"
					onClick={() => {
						hideComponent();
					}}
				>
					Close
				</button>
			)}
		</div>
	);
};

export default App;
