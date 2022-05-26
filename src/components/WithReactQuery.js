import { useState, lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
// import Character from './character/Character';
const Character = lazy(() => import('./character/Character'));

function WithReactQuery() {
	const [page, setPage] = useState(() => Number(localStorage.currentPage) || 1);

	const fetchCharacters = async ({ queryKey }) => {
		console.log(queryKey);
		const response = await fetch(
			`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
		);
		const data = await response.json();
		localStorage.setItem('currentPage', Number(queryKey[1]));
		return data;
	};
	const { isLoading, error, data } = useQuery(
		['characters', page],
		fetchCharacters,
		{
			keepPreviousData: true // to make sure the pagination pre-store the data
		}
	);

	console.log(data);

	if (isLoading) return <div>Loading</div>;

	if (error) return <div>Error</div>;

	return (
		<>
			<h1>Page {page && page}</h1>
			<div className="characters">
				<Suspense fallback={<div>Loading...</div>}>
					{data?.results?.map((character) => (
						<Character key={character.id} character={character} />
					))}
				</Suspense>
				<div>
					<button disabled={page === 1} onClick={() => setPage(page - 1)}>
						Previous
					</button>
					<button
						disabled={!data?.info?.next}
						onClick={() => setPage(page + 1)}
					>
						Next
					</button>
					{Array.from({ length: data?.info?.pages }).map((_, index) => (
						<button key={index} onClick={() => setPage(Number(index) + 1)}>
							{Number(index) + 1}
						</button>
					))}
				</div>
			</div>
		</>
	);
}

export default WithReactQuery;
