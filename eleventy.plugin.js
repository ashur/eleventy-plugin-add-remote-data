const { fetchRemoteData } = require( "./src/fetchRemoteData" );

/* eslint-disable-next-line valid-jsdoc */
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @param {Object} options
 * @param {Object} [options.cache] - options passed to eleventy-fetch
 * @param {Object} options.data
 */
module.exports = ( eleventyConfig, options ) =>
{
	// See https://www.11ty.dev/docs/plugins/fetch/#options
	const defaultOptions = options.options || {};
	const data = options.data || {};

	Object.entries( data ).forEach( ( [key, value] ) =>
	{
		eleventyConfig.addGlobalData( key, async () => await fetchRemoteData( value, defaultOptions ) );
	} );
};
