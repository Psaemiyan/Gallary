import React from "react";

class Audio extends React.Component {
  componentDidMount() {
    // Ensure 'audio' is assigned to this.audio correctly
    this.audio = new window.Audio('./audio.mp3'); // Adding 'window.' to explicitly use the Audio constructor
    this.audio.loop = true;

    // Play the audio file
    this.audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  }

  componentWillUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0; // Optionally reset the audio to the beginning
    }
  }

  render() {
    return null; // No UI needs to be rendered for this component
  }
}

export default Audio;
