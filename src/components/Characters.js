import { useState, memo } from 'react';
import { useQuery } from 'react-query';

function Characters() {
	const [characters, setCharacters] = useState([]);

	const fetchCharacters = async () => {
		const response = await fetch('https://rickandmortyapi.com/api/character');
		const data = await response.json();
		return data;
		// console.log(data);
		// setCharacters(data);
	};
	const { isLoading, error, data } = useQuery('characters', fetchCharacters);

	// useEffect(() => {
	// 	fetchCharacters();
	// }, []);
	if (isLoading) {
		<div>Loading</div>;
	}

	if (error) {
		<div>Error</div>;
	}

	return (
		<div>
			{data?.results?.map((character) => (
				<div key={character.id}>{character.name}</div>
			))}
		</div>
	);
}

export default memo(Characters);
