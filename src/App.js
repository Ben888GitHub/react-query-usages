import './App.css';

// import Characters from './components/Characters';
// import WithoutReactQuery from './components/WithoutReactQuery';
import WithReactQuery from './components/WithReactQuery';
import { QueryClient, QueryClientProvider } from 'react-query';

// Instantiate new Client
const queryClient = new QueryClient();

function App() {
	return (
		// QueryClientProvider is to make the entire React Component accessible to all React Query Functions

		<div className="App">
			<div className="container">
				<QueryClientProvider client={queryClient}>
					<h1>React Query Usages</h1>

					{/* <WithoutReactQuery /> */}
					<WithReactQuery />
				</QueryClientProvider>
			</div>
		</div>
	);
}

export default App;
