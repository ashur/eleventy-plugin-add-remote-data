# eleventy-plugin-add-remote-data

An [Eleventy](https://11ty.dev/) plugin for fetching remote JSON data from one or more endpoints and
exposing each response as a [global data](https://www.11ty.dev/docs/data-global-custom/) property.

## Setup

Run the following command at the root of your Eleventy project:

```shell
npm install @aaashur/eleventy-plugin-add-remote-data
```

Next, include the plugin in your `.eleventy.js` config:

```javascript
const addRemoteData = require("@aaashur/eleventy-plugin-add-remote-data");

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(addRemoteData, {
		data: {
			// See "Usage" below
		},
	});
};
```

## Usage

The `data` property of the plugin options object is used to define the name of the global data value that is available to templates and the remote URL of the actual data.

For example, the following configuration:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
	data: {
		dogPhoto: "https://dog.ceo/api/breeds/image/random",
		todoItems: "https://jsonplaceholder.typicode.com/todos/"
	},
});
```

would create two new global data entries — `dogPhoto` and `todoItems` — which you might use in a template like this:

```njk
{% for todoItem in todoItems %}
	<li>{{ todoItem.title }}</li>
{% endfor %}
```

### Notes

`addRemoteData` requires a valid JSON response — if it encounters an invalid payload, an exception will be thrown.
