export const getUserMedia = (audioSource) => {
  if (window.customUserMediaStream) {
    window.customUserMediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    video: false,
  };

  return new Promise((res) => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        window.customUserMediaStream = stream;
        res(stream);
      })
      .catch(handleError);
  });
};

function handleError(error) {
  console.log("navigator error: ", error.message, error.name);
}
