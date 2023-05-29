import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { ProjectPayload } from "@/sanity/types";

import { projectBySlugQuery, projectPaths } from "./queries";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
});

export async function getProjectBySlug({
	slug,
}: {
	slug: string;
}): Promise<ProjectPayload | undefined> {
	return await client.fetch(projectBySlugQuery, { slug });
}

export async function getProjectPaths(): Promise<string[]> {
	return (await client.fetch(projectPaths)) || [];
}