console.log("We were happy");

window.onload = function () {
  let audioContext = new AudioContext();

  function startLoop(audioBuffer, pan = 1, rate = 0.02) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 3.98;
    sourceNode.loopEnd = 3.80;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    sourceNode.connect(audioContext.destination);

    sourceNode.start(0, 2.98);
  }

  fetch('assets/wewerehappy.m4a')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      startLoop(audioBuffer, -1);
      startLoop(audioBuffer, 1, 1.002);
      console.log('Decoded', audioBuffer);
    })
    .catch(e => console.error(e));

    document.querySelector('button').addEventListener('click', function() {
      audioContext.resume().then(() => {
        console.log('Playback resumed');
      });
    });
}