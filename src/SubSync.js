/* SubSync v1.0.0 | (c) Ran Schreiber | https://github.com/ransch */
(() => {
	function Sync(textTrack) {
		let trackCues = cuesArray(textTrack.cues);

		this.sync = (delay) => {
	
			for (let i = 0; i < trackCues.length; i++) {
				let cue = trackCues[i];
				if (cue.originalStartTime + delay >= 0) {
					cue.startTime = cue.originalStartTime + delay;
				} else {
					cue.startTime = cue.originalStartTime;
				}
				if (cue.originalEndTime + delay >= 0) {
					cue.endTime = cue.originalEndTime + delay;
				} else {
					cue.endTime = cue.originalEndTime;
				}
			}
		}

		function cuesArray(cuesarr) {
			res = [];
			for (let i = 0; i < cuesarr.length; i++) {
				cuesarr[i].originalStartTime = cuesarr[i].startTime;
				cuesarr[i].originalEndTime = cuesarr[i].endTime;
				res[i] = cuesarr[i];
			}
			return res;
		}
	}

	window.SubSync = {
		track: (trackElem) =>{
			return new Promise(function(resolve, reject) {
				let t = setInterval(() => {
					if (trackElem.readyState == 2) {
						clearInterval(t);
						resolve(new Sync(trackElem.track));
					} else if (trackElem.readyState == 3) {
						clearInterval(t);
						reject(new Error("SubSync: Cannot obtain the video's track."));
					}
				}, 10);
			});
		}
	}
})();