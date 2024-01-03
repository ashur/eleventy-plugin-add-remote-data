const addRemoteData = require( "../../eleventy.plugin.js" );

/* eslint-disable-next-line valid-jsdoc */
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = ( eleventyConfig ) =>
{
	eleventyConfig.addPlugin( addRemoteData, {
		data: {
			deckOfCards: "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
		},
	} );
};
