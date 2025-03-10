import React from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "./Audio.css";

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,  // Initially muted (audio paused)
    };
    this.audio = new window.Audio('./audio.mp3');
    this.audio.loop = true;
  }

  componentDidMount() {
    this.audio.oncanplay = () => {
      console.log("Audio is ready");
    };
  }

  componentWillUnmount() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  toggleAudio = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }));
  };

  render() {
    return (
      <div className="audio-container">
        {/* Toggle play/pause with a single icon */}
        <button className="audio-icon" onClick={this.toggleAudio}>
          {this.state.isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>
    );
  }
}

export default Audio;
