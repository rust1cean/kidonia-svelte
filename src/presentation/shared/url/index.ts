/**
 * Remove trailing slashes
 *
 * @example
 * ```
 * console.log(removeTrailingSlashes("https://doesnt.exist//").href); // "https://doesnt.exist/"
 * ```
 */
export const removeTrailingSlashes = (url: string | URL, replacement: string = '/'): URL => {
	const newUrl = new URL(url);
	newUrl.pathname = newUrl.pathname.replaceAll(/\/+/g, replacement);

	return newUrl;
};

/**
 * Push path to existing
 *
 * @example
 * ```
 * console.log(justPushPath("https://doesnt.exist/another/", "/another").href); // "https://doesnt.exist/another/another"
 * ```
 */
export const justPushPath = (url: string | URL, path: string): URL => {
	const newUrl = new URL(url);
	newUrl.pathname += '/' + path;

	return removeTrailingSlashes(newUrl);
};

/**
 * Push path only if needed
 *
 * @example
 * ```
 * console.log(justPushPath("https://doesnt.exist/another/", "/another")); // "https://doesnt.exist/another"
 * ```
 */
export const pushPath = (url: string | URL, path: string): URL => {
	const newUrl = new URL(url);
	const levels = newUrl.pathname.split('/');
	const last = levels.length - 1;

	return levels[last] === path ? newUrl : justPushPath(newUrl, path);
};

/**
 * Replace path
 *
 * @example
 * ```
 * console.log("https://doesnt.exist/another", "path"); // "https://doesnt.exist/path"
 * ```
 */
export const replacePath = (url: string | URL, path: string): URL => {
	const newUrl = new URL(url);
	newUrl.pathname = newUrl.pathname.replace(/[^/]*\/?$/, path);

	return newUrl;
};
