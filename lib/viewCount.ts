"use server";

import { supabase } from "~/lib/supabase";

export const getViewCount = async () => {
	const { data, error } = await supabase
		.from("view_count")
		.select("*")
		.eq("website", "www.milovangudelj.com")
		.single();

	return {
		count: data?.views ?? 0,
		error: error ? "Couldn't fetch view count" : undefined,
	};
};

export const incrementViewCount = async () => {
	const previous = await supabase
		.from("view_count")
		.select("*")
		.eq("website", "www.milovangudelj.com")
		.single();

	if (previous.error) return;

	const count = previous.data.views;

	await supabase
		.from("view_count")
		.update({ views: count + 1 })
		.eq("website", "www.milovangudelj.com")
		.select()
		.single();
};
