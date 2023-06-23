import { createClient } from "@supabase/supabase-js";

import { Database } from "~types/supabase";
import { assertValue } from "~/utils/assertValue";

const supabaseUrl = assertValue(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	"Missing environment variable: NEXT_PUBLIC_SUPABASE_URL"
);
const supabaseKey = assertValue(
	process.env.SUPABASE_SERVICE_KEY,
	"Missing environment variable: SUPABASE_SERVICE_KEY"
);

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: false,
	},
});
