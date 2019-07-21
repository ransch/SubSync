(() => {

SubSync.track(document.querySelector("track")).then((syncObj) => {
	let videlem = document.querySelector("video");
	RTLText(videlem.textTracks[0].cues);
	bindDelayInput(syncObj, document.querySelector("#delayNum"), document.querySelector("#delayRange"), document.querySelector("#minus"),
			document.querySelector("#plus"));
	bindKeyboard(videlem);

}, (error) => {
	alert(error.message);
});

function bindKeyboard(vid) {
	window.addEventListener('keydown', (event) => {
		switch (event.key) {
		case ' ':
			togglePlaying();
			break;
		case 'ArrowLeft':
			precedeFive();
			break;
		case 'ArrowRight':
			proceedFive();
			break;
		}
	}, true);

	vid.addEventListener('focus', (event) => {
		vid.blur();
	}, true);

	function proceedFive() {
		vid.currentTime += 5;
	}

	function precedeFive() {
		vid.currentTime -= 5;
	}

	function togglePlaying() {
		if (vid.paused) {
			vid.play();
		} else {
			vid.pause();
		}
	}
}

function RTLText(cues) {
	for (let i = 0; i < cues.length; i++) {
		let cue = cues[i];
		cue.text = ("&lrm;" + cue.text).replace("\n", "\n&lrm;"); // We assume that there are at most 2 lines.
	}
}

function bindDelayInput(syncObj, span, range, minus, plus){
	function updateSpan(value) {
		span.innerHTML = value;
	}

	function bindRangeSpan() {
		range.addEventListener("input", function() {
			updateSpan(range.value);
		});

		range.addEventListener("change", function() {
			syncObj.sync(parseFloat(range.value));
		});
	}

	function bindRangeButtons() {
		minus.addEventListener("click", function() {
			range.value = parseFloat(range.value) - 0.1;
			updateSpan(range.value);
			syncObj.sync(parseFloat(range.value));
		});

		plus.addEventListener("click", function() {
			range.value = parseFloat(range.value) + 0.1;
			updateSpan(range.value);
			syncObj.sync(parseFloat(range.value));
		});
	}

	bindRangeSpan();
	bindRangeButtons();
}

})();
