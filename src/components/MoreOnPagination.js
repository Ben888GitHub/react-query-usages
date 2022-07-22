import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';

const fetchData = async ({ queryKey }) => {
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/posts?_page=${
			queryKey[1]
		}&_limit=${5}`
	);
	return data;
};

function MoreOnPagination() {
	const [page, setPage] = useState(1);
	const { data, error, isLoading } = useQuery(['posts', page], fetchData, {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});
	console.log(data);
	if (isLoading) return <div>Loading</div>;

	if (error) return <div>Error</div>;
	return (
		<>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Previous
			</button>
			<button style={{ marginLeft: 10 }} onClick={() => setPage(page + 1)}>
				Next
			</button>
			{data &&
				data?.map((post) => (
					<div key={post.id}>
						<h2>{post.title}</h2>

						<p>{post.body}</p>
					</div>
				))}
		</>
	);
}

export default MoreOnPagination;
