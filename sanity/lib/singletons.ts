// Define the actions that should be available for singleton documents
export const singletonActions = new Set([
	"publish",
	"discardChanges",
	"restore",
]);

// Define the singleton document types
export const singletonTypes = new Set([
	"siteSettings",
	"siteNavigation",
	"siteColors",
]);
