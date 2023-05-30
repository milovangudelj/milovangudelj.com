import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from "~/sanity/env";
import { ProjectPayload, CaseStudyPayload } from "~/sanity/types";

import {
	projectBySlugQuery,
	projectPaths,
	caseStudyBySlugQuery,
	caseStudyPaths,
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

export async function getCaseStudyBySlug({
	slug,
}: {
	slug: string;
}): Promise<CaseStudyPayload | undefined> {
	return await client.fetch(caseStudyBySlugQuery, { slug });
}

export async function getProjectPaths(): Promise<string[]> {
	return (await client.fetch(projectPaths)) || [];
}

export async function getCaseStudyPaths(): Promise<string[]> {
	return (await client.fetch(caseStudyPaths)) || [];
}