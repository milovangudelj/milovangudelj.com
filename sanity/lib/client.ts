import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from "~/sanity/env";
import {
	ProjectPayload,
	CaseStudyPayload,
	SlimProjectPayload,
} from "~/sanity/types";

import {
	projectBySlugQuery,
	projectPaths,
	projectsQuery,
	caseStudyBySlugQuery,
	caseStudyPaths,
	slimProjectsQuery,
} from "./queries";

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

export async function getProjects(): Promise<ProjectPayload[]> {
	return await client.fetch(projectsQuery);
}

export async function getSlimProjects(): Promise<SlimProjectPayload[]> {
	return await client.fetch(slimProjectsQuery);
}

export async function getCaseStudyBySlug({
	slug,
}: {
	slug: string;
}): Promise<CaseStudyPayload> {
	return await client.fetch(caseStudyBySlugQuery, { slug });
}

export async function getProjectPaths(): Promise<string[]> {
	return (await client.fetch(projectPaths)) || [];
}

export async function getCaseStudyPaths(): Promise<string[]> {
	return (await client.fetch(caseStudyPaths)) || [];
}