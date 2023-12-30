/**
 * @param {string} remoteUrl
 * @return {Array|Object}
 */
module.exports.fetchRemoteData = async( remoteUrl ) =>
{
	try
	{
		const url = new URL( remoteUrl );
		const response = await fetch( url );

		return await response.json();
	}
	catch( error )
	{
		if( error.code === "ERR_INVALID_URL" )
		{
			throw new Error( "Missing or invalid url: " + remoteUrl );
		}

		if( error.constructor?.name === "SyntaxError" )
		{
			throw new Error( "Invalid JSON response received: " + remoteUrl );
		}

		throw error;
	}
};
