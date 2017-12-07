import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../reducer";
import Timer from "./presenter";

function mapStateToProps(state) {
  const { isPlaying, elapsedTime, timerDuration, soundOn } = state;

  return {
    isPlaying,
    elapsedTime,
    timerDuration,
    soundOn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: bindActionCreators(actionCreators.startTimer, dispatch),
    restartTimer: bindActionCreators(actionCreators.restartTimer, dispatch),
    addSecond: bindActionCreators(actionCreators.addSecond, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
