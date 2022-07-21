import axios from 'axios';
import { useQueries } from 'react-query';

function DynamicParallelQueries() {
	const todos = useQueries(
		Array(5)
			.fill()
			.map((_, idx) => idx + 1)
			.map((id) => {
				return (
					{
						queryKey: ['todo', id],
						queryFn: async ({ queryKey: [, id] }) => {
							const { data } = await axios.get(
								`https://jsonplaceholder.typicode.com/posts/${id}`
							);
							return data;
						}
					},
					{
						refetchOnWindowFocus: false
					}
				);
			})
	);

	console.log(todos);

	return (
		<>
			<h2>{JSON.stringify(todos)}</h2>
		</>
	);
}

export default DynamicParallelQueries;
