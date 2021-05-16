import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { fontSizes, paddingSizes } from "../utils/sizes.js";

const minToMilisec = (min) => min * 1000 * 60;
// ? without the below function time would look like 10:0  not 10:00...
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, progressProp, endTask }) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  // * set interval callback func...
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        //do something;
        clearInterval(interval.current);

        return time;
      }
      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  // ? this will rerender the minutes every time new minutes comes...
  useEffect(() => {
    setMillis(minToMilisec(minutes));
  }, [minutes]);

  // * update progress bar from an external component clean way...
  useEffect(() => {
    //report progress...
    progressProp(millis / minToMilisec(minutes));
    if (millis === 0) {
      endTask();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(minute)}: {formatTime(sec)}{" "}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: "bold",
    color: "#c8d6e5",
    padding: paddingSizes.xl,
    backgroundColor: "rgba(94,132,226,0.2)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    textAlign: "center",
  },
});
