# SubSync

##About

This tiny library helps you synchronizing subtitles with a video. For example,
you may advance all the track's cues by 4.1 seconds, shift them 2.8
seconds backwards, etc.

Version: 1.0.0.

##Using

The library's main object is `SubSync`. It has one function, `track`. This function
receives the `<track>` element as an argument, and returns a `Promise` object
which resolves when the subtitles are loaded and rejects if they fail to load.
The function that the user passes to the `Promise` and that is called if the
`Promise` is fulfilled, accepts an instance of `Sync` - an object that controls
the subtitles' timing. It has one function - `sync`, that gets a (signed) float and
adjusts the subtitles' timing correspondingly.

Note: You should include `SubSync.js` or `SubSync.min.js` in your page in order to
use the API. (These files are placed under `src`).

##Example

```
SubSync.track(trackElement).then((syncObj) => {
	syncObj.sync(0.5);
}, (error) => {
	alert(error.message);
});
```

A more interesting example can be found under `sample-app`.
