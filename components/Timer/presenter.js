import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import Button from "../Button";
import { Audio } from 'expo';

function formatTime(time) {
  let minutes = Math.floor(time/60);
  let seconds = time%60
  return `${minutes<10 ? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`
}

function soundOn(soundOn) {
  if (soundOn) {
    (async () => {
      const source = require("../../sound/MerryGoRoundofLife.mp3");

      try {
        await Audio.setIsEnabledAsync(true);
        const sound = new Audio.Sound();
        await sound.loadAsync(source);
        await sound.playAsync();
      } catch(error) {
          console.error(error);
      }
    })();
  }
}


class Timer extends Component {
componentWillReceiveProps(nextProps) {
  const currentProps = this.props;
  //console.log(`Current Props: ${currentProps.isPlaying} and New Props: ${nextProps.isPlaying}`)
  if (!currentProps.isPlaying && nextProps.isPlaying) {
    const timerInterval = setInterval(() => {
      currentProps.addSecond()
    }, 1000);

    this.setState({
      timerInterval
    });

  } else if (currentProps.isPlaying && !nextProps.isPlaying) {
    clearInterval(this.state.timerInterval);
    soundOn(nextProps.soundOn)
  }
}

  render() {
    //console.log(this.props);
    const { isPlaying, elapsedTime, timerDuration, startTimer, restartTimer, addSecond, soundOn } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.upper}>
          <Text style={styles.time}>{formatTime(timerDuration - elapsedTime)}</Text>
        </View>
        <View style={styles.lower}>
          {!isPlaying && (
            <Button iconName={"play-circle"} onPress={startTimer} />
          )}
          {isPlaying && (
            <Button iconName={"stop-circle"} onPress={restartTimer} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CE0B24"
  },

  upper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  lower: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  time: {
    color: "white",
    fontSize: 120,
    fontWeight: "100"
  }
});

export default Timer;
