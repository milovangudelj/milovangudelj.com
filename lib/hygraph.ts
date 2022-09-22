import { GraphQLClient } from "graphql-request";

export const hygraph = new GraphQLClient(
	"https://api-eu-central-1.hygraph.com/v2/cl6l8oz3n0h3m01um96yzds4w/master",
	{
		headers: {
			Authorization: `Bearer ${process.env.HYGRAPH_ACCESS_TOKEN}`,
		},
	}
);
