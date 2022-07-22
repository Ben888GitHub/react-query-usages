import './App.css';
import { useState } from 'react';
// import Characters from './components/Characters';
// import WithoutReactQuery from './components/WithoutReactQuery';
import WithReactQuery from './components/WithReactQuery';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import WithInfiniteQueries from './components/WithInfiniteQueries';

// Instantiate new Client
const queryClient = new QueryClient();

function App() {
	const [view, setView] = useState('pagination');

	return (
		// QueryClientProvider is to make the entire React Component accessible to all React Query Functions
		<>
			<QueryClientProvider client={queryClient}>
				<div className="App">
					<div className="container">
						<h1>React Query Usages</h1>
						<button onClick={() => setView('pagination')}>Pagination</button>
						<button onClick={() => setView('infinite scroll')}>
							Infinite Scroll
						</button>

						{/* <WithoutReactQuery /> */}
						{view === 'pagination' ? (
							<WithReactQuery />
						) : (
							<WithInfiniteQueries />
						)}
					</div>
				</div>
				{/* <ParallelQueries />
				<br />
				<DynamicParallelQueries />
				<br /> */}
				{/* <MoreOnPagination /> */}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}

export default App;
