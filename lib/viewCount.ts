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
		.limit(1)
		.single();

	if (previous.error)
		return {
			count: 0,
			error: "Couldn't increment view count",
		};

	const count = previous.data.views;

	if (process.env.NODE_ENV !== "production") {
		return {
			count,
		};
	}

	const { data, error } = await supabase
		.from("view_count")
		.update({ views: count + 1 })
		.eq("website", "www.milovangudelj.com")
		.select()
		.single();

	if (error)
		return {
			count: 0,
			error: "Couldn't increment view count",
		};

	return {
		count: data.views,
	};
};
