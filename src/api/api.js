import mockArticles from "./mockArticles.json";

const DEFAULT_TIMEOUT = 0;

/**
 * Get local content with delay.
 *
 * @param {json} content
 * @param {number} timeout
 */
const getContentWithDelay = async (content, timeout = DEFAULT_TIMEOUT) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(content);
		}, timeout);
	});

const getContentFromDistantFakeApi = async () => {
	// await response of fetch call (100 fake items)
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	// only proceed once promise is resolved
	const data = await response.json();
	// only proceed once second promise is resolved
	return data;
};

export const getArticles = async (timeout = DEFAULT_TIMEOUT) => {
	// Get articles from external API (caution: no image).
	// See json-server node module to build a more complex fake api.
	//return await getContentFromDistantFakeApi();

	// Get local json with a delay.
	return await getContentWithDelay(mockArticles, timeout);
};
