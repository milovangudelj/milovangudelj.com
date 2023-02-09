import { GetServerSideProps } from "next";
import { gql } from "graphql-request";
import { hygraph } from "../lib/hygraph";

const GET_SLUGS = gql`
	{
		caseStudies {
			slug
		}
	}
`;

const CASE_STUDIES_BASE_URL = "https://milovangudelj.com/work";

function generateSiteMap(caseStudies: string[]) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://milovangudelj.com</loc>
     </url>
     <url>
       <loc>https://milovangudelj.com/about</loc>
     </url>
     <url>
       <loc>https://milovangudelj.com/contact</loc>
     </url>
     <url>
       <loc>https://milovangudelj.com/login</loc>
     </url>
     <url>
       <loc>https://milovangudelj.com/music-stats</loc>
     </url>
     <url>
       <loc>https://milovangudelj.com/work</loc>
     </url>
     ${caseStudies
			.map((slug) => {
				return `
       <url>
           <loc>${`${CASE_STUDIES_BASE_URL}/${slug}`}</loc>
       </url>
     `;
			})
			.join("")}
   </urlset>
 `;
}

const SiteMap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { caseStudies } = await hygraph.request(GET_SLUGS);

	const urls: string[] = caseStudies.map(
		(caseStudy: { slug: string }) => caseStudy.slug
	);

	const sitemap = generateSiteMap(urls);

	res.setHeader("Content-Type", "text/xml");

	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
};

export default SiteMap;
