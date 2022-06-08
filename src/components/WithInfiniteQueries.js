import { useInfiniteQuery } from 'react-query';
import Character from './character/Character';
import { useState } from 'react';

function WithInfiniteQueries() {
	// const [currentPage, setCurrentPage] = useState(1);
	// const currentPage = 1;
	const fetchUsers = async ({
		pageParam = `https://rickandmortyapi.com/api/character?page=1`
	}) => {
		console.log(pageParam);
		const res = await fetch(pageParam);
		const data = await res.json();
		return data;
	};

	const { isLoading, error, data, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(['characters'], fetchUsers, {
			getPreviousPageParam: (firstPage, page) => firstPage.info.page - 1,
			getNextPageParam: (lastPage, pages) => lastPage.info.next,

			refetchOnWindowFocus: false, // to prevent refetch when we get out and come back to the browser window / page
			keepPreviousData: true
		});

	if (isLoading) {
		return <h4>Loading...</h4>;
	}
	if (error) {
		return <h4>Error!</h4>;
	}

	console.log(data);

	return (
		<>
			<h2>Infinite Scroll View</h2>

			<div>
				{data &&
					data?.pages?.map((page) =>
						page.results.map((user, idx) => (
							<Character key={idx} character={user} />
						))
					)}
			</div>
			<div className="btn-container">
				<button
					// onClick={() => {
					// 	setCurrentPage(currentPage + 1);
					// 	fetchNextPage({ pageParam: currentPage + 1 });
					// }}
					onClick={fetchNextPage}
					disabled={isFetchingNextPage}
				>
					Load More
				</button>
			</div>
			<div> {isFetchingNextPage && 'Fetching...'}</div>
		</>
	);
}

export default WithInfiniteQueries;
