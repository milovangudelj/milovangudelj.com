import type { NextPage } from "next";
import { gql } from "graphql-request";
import { hygraph } from "../lib/hygraph";
import { Layout } from "../components";

const QUERY = gql`
	{
		posts {
			id
			slug
			title
			subtitle
			body {
				markdown
				html
			}
		}
	}
`;

export async function getStaticProps() {
	const { posts } = await hygraph.request(QUERY);

	return {
		props: {
			posts,
		},
	};
}

const Home: NextPage<{ posts: any }> = ({ posts }) => {
	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-8">
				<main>
					<h1 className="text-7xl font-bold">Welcome to my new website</h1>
					<ul className="mt-8">
						{posts.map((post: any) => (
							<li key={post.id}>
								<h2 className="text-5xl font-bold mb-2">
									{post.title}
								</h2>
								<span className="inline-block text-xl mb-4">
									{post.subtitle}
								</span>
								<div>{post.body.markdown}</div>
							</li>
						))}
					</ul>
				</main>
			</div>
		</Layout>
	);
};

export default Home;
