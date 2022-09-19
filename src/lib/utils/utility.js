export const getUserMedia = (audioSource = null) => {
  if (window.customUserMediaStream) {
    window.customUserMediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const deviceId = audioSource ? { exact: audioSource } : undefined;
  const constraints = {
    audio: {
      deviceId,
      echoCancellation: true,
    },
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

export const acceptedTemplates = ["default"];
