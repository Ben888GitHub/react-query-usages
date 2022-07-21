import axios from 'axios';
import { useQuery } from 'react-query';

function ParallelQueries() {
	const { data } = useQuery({
		queryKey: ['todo', 1], // unique and serializable key to manage query caching
		queryFn: async ({ queryKey: [, id] }) => {
			// console.log(queryKey);
			const { data } = await axios.get(
				`https://jsonplaceholder.typicode.com/posts/${id}`
			);
			return data;
		}
	});

	const { data: yesNoData } = useQuery('yesNo', async () => {
		const { data } = await axios.get('https://yesno.wtf/api');
		return data;
	});

	return (
		<>
			<br />
			<h2>Page {JSON.stringify(data)}</h2>
			<br />
			<h2>{JSON.stringify(yesNoData)}</h2>
		</>
	);
}

export default ParallelQueries;
