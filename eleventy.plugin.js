const { fetchRemoteData } = require( "./src/fetchRemoteData" );

/* eslint-disable-next-line valid-jsdoc */
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 * @param {Object} options
 * @param {Object} options.data
 */
module.exports = ( eleventyConfig, options ) =>
{
	const data = options.data || {};

	Object.entries( data ).forEach( ( [key, url] ) =>
	{
		eleventyConfig.addGlobalData( key, async () => await fetchRemoteData( url ) );
	} );
};
