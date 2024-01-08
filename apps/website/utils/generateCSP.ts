export const generateCSP = () => {
	// generate random nonce converted to base64. Must be different on every HTTP page load
	// const nonce = crypto.randomBytes(16).toString('base64')
	const nonce = crypto.randomUUID();

	const csp = [
		{
			name: "default-src",
			values: ["'self'", "https://*.milovangudelj.com"],
		},
		{
			name: "script-src",
			values: [
				"'report-sample'",
				"'self'",
				`'nonce-${nonce}'`,
				"'strict-dynamic'",
			],
		},
		{
			name: "style-src",
			values: ["'report-sample'", "'self'", `'nonce-${nonce}'`],
		},
		{
			name: "connect-src",
			values: ["'self'", "*.vercel-insights.com"],
		},
		{ name: "font-src", values: ["'self'", "data:"] },
		{
			name: "img-src",
			values: [
				"'self'",
				"data:",
				"https://i.scdn.co",
				"https://cdn.sanity.io",
			],
		},
		{ name: "worker-src", values: ["'self'", "blob:"] },
		{ name: "frame-ancestors", values: ["'none'"] },
		{ name: "form-action", values: ["'self'"] },
	];

	const cspString = csp
		.map((directive) => {
			return `${directive.name} ${directive.values.join(" ")}`;
		})
		.join("; ");

	return { csp: cspString, nonce };
};
