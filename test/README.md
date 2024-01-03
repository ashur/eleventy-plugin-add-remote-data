# Tests

To run a test:

1. `cd` into a test directory
2. Run `npx eleventy --config=./.eleventy.js`
3. Inspect the resulting output — `./_site/index.html`

For example:

```bash
$ cd ./test/custom-options
$ npx eleventy --config=./.eleventy.js && cat _site/index.html
{
    "success": true,
    "deck_id": "t14ln4k01167",
    "remaining": 52,
    "shuffled": true
}

{
    "coin": "tails"
}
```

## To-Do

- [ ] Overcome personal gaps in knowledge to understand why throwing errors from within an Eleventy plugin causes `mocha` and `node:test` to hang and not resolve
- [ ] Implement these tests using a proper test runner
