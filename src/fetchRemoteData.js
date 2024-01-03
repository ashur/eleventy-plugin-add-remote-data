const eleventyFetch = require( "@11ty/eleventy-fetch" );

/**
 * Allow individual URLs to override default options
 * @typedef {Object} Source
 * @property {Object} options
 * @property {string} url
 */

/**
 * @param {string|Source} source
 * @param {Object} defaultOptions
 * @return {any}
 */
module.exports.fetchRemoteData = async( source, defaultOptions ) =>
{
	const sourceUrl = source.url ? source.url : source;
	const sourceOptions = source.options ? source.options : {};

	const options = Object.assign(
		{ type: "json" },
		defaultOptions,
		sourceOptions,
	);

	try
	{
		const url = new URL( sourceUrl );
		return await eleventyFetch( url.toString(), options );
	}
	catch( error )
	{
		if( error.code === "ERR_INVALID_URL" )
		{
			throw new Error( "Missing or invalid url: " + sourceUrl );
		}

		throw error;
	}
};
