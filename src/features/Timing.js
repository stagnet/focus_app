import React from "react";
import { StyleSheet, View } from "react-native";
import { RoundedButton } from "../components/RoundedButton";

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          color="#3dc1d3"
          size={70}
          title="6s"
          textStyle={{ marginLeft: -6, fontWeight: "bold" }}
          onPress={() => onChangeTime(0.1)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          color="#3dc1d3"
          size={70}
          title="15m"
          textStyle={{ marginLeft: -6, fontWeight: "bold" }}
          onPress={() => onChangeTime(15)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          color="#3dc1d3"
          size={70}
          title="30m"
          textStyle={{ marginLeft: -6, fontWeight: "bold" }}
          onPress={() => onChangeTime(30)}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
});
