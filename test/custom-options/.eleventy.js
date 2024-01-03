const addRemoteData = require( "../../eleventy.plugin.js" );

/* eslint-disable-next-line valid-jsdoc */
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = ( eleventyConfig ) =>
{
	eleventyConfig.addPlugin( addRemoteData, {
		data: {
			coinToss: {
				options: {
					duration: "0d",
				},
				url: "https://coin-toss.netlify.app/api/v1.json",
			},
			deckOfCards: "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
		},
		options: {
			directory: "custom-cache",
			duration: "2d",
		},
	} );
};
