# eleventy-plugin-add-remote-data

An [Eleventy](https://11ty.dev/) plugin for fetching remote JSON data from one or more endpoints and
exposing each response as a [global data](https://www.11ty.dev/docs/data-global-custom/) variable.

## Setup

Run the following command at the root of your Eleventy project:

```shell
npm install @aaashur/eleventy-plugin-add-remote-data
```

Next, include the plugin in your [Eleventy config file](https://www.11ty.dev/docs/config/#default-filenames):

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

Use the `data` property of the plugin options object to define the name of one or more global data variables and the remote URL of its source data.

For example, the following configuration:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        robots: "https://api.ashur.cab/robots/v2.json"
    },
});
```

would create a global data variable named `robots` that you might use in a template like this:

```njk
---
permalink: /robots.txt
---
{%- for robot in robots.disallow -%}
User-agent: {{ robot }}
Disallow: /

{% endfor -%}
```

Adding a second data property `coinToss` would create a global data variable named `coinToss`:

```javascript
    data: {
        coinToss: "https://coin-toss.netlify.app/api/v1.json",
        robots: "https://api.ashur.cab/robots/v2.json"
    },
```

etc.

## Configuration

This plugin uses [`@11ty/eleventy-fetch`](https://www.npmjs.com/package/@11ty/eleventy-fetch) under the hood, and accepts all the same [options](https://www.11ty.dev/docs/plugins/fetch/#options).

In addition to the top-level `data` property, you can set an `options` property to adjust default behaviors.

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        // ...
    },
    options: {
        // ...
    },
});
```

### Cache

By default, `eleventy-fetch` caches results for 1 day and stores them in a directory called `.cache`.

To use a different directory or duration, use the `options` object to set one or both for all endpoints:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        // ...
    },
    options: {
        directory: "different-cache-directory",
        duration: "30d",
    },
});
```

If you're working with global data variables that have different requirements, you can define `options` on an individual basis:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        coinToss: {
            options: {
                duration: "0d",

                // Because we haven't defined `directory`, this endpoint will
                // inherit the "different-cache-directory" value from default
                // options defined below
            },

            url: "https://coin-toss.netlify.app/api/v1.json",
        },

        robots: "https://api.ashur.cab/robots/v2.json",
    },

    options: {
    	// Default options
        directory: "different-cache-directory",
        duration: "30d",
    },
});
```

Options for individual endpoints will be merged with default options, allowing you to fine-tune just the properties you need.

### Type

For convenience, this plugin assumes a valid JSON response by default — if it encounters an invalid payload, an exception will be thrown.

To switch to [another type supported by `eleventy-fetch`](https://www.11ty.dev/docs/plugins/fetch/#type), you can set `type` on both the top-level `options` object:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        // ...
    },
    options: {
        type: "text",
    },
}
```

and on a per-endpoint basis:

```javascript
eleventyConfig.addPlugin(addRemoteData, {
    data: {
        coinToss: {
            type: "json",
            url: "https://coin-toss.netlify.app/api/v1.json",
        },
    },
    options: {
        type: "text",
    },
}
```

### Security & Privacy

If you haven't worked with `eleventy-fetch` before, please be sure to read (and heed) [this warning](https://www.11ty.dev/docs/plugins/fetch/#installation):

> **Important Security and Privacy Notice**
>
> This plugin caches complete network responses. Unless you’re willing to perform a full review of everything this plugin caches to disk for privacy and security exposure, it is strongly recommended that you add the .cache folder to your .gitignore file so that network responses aren’t checked in to your git repository.

## FAQ

### Why choose this over using `eleventy-fetch` directly?

If you find yourself writing global data files that are largely identical, fetching remote JSON data and exporting the results directly, this plugin can help eliminate a lot of the friction in getting set up.

If, however, your needs are more complex — ex., the remote data must be processed or sanitized, or you’re fetching raw image data that needs to be optimized — using `eleventy-fetch` directly is definitely the right choice!
