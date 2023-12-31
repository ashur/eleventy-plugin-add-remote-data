const eleventyFetch = require( "@11ty/eleventy-fetch" );

/**
 * @param {string} remoteUrl
 * @param {Object} cacheOptions
 * @return {Array|Object}
 */
module.exports.fetchRemoteData = async( remoteUrl, cacheOptions ) =>
{
	cacheOptions.type = "json";

	try
	{
		const url = new URL( remoteUrl );
		return await eleventyFetch( url.toString(), cacheOptions );
	}
	catch( error )
	{
		if( error.code === "ERR_INVALID_URL" )
		{
			throw new Error( "Missing or invalid url: " + remoteUrl );
		}

		throw error;
	}
};
