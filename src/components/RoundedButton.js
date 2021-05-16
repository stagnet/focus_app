import React from "react";
import { FAB } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";

export const RoundedButton = ({
  style = {},
  textStyle = {},
  icon = {},
  size = 120,
  ...props
}) => {
  return (
    <View style={[styles(size).radius, style]}>
      <FAB
        onPress={props.onPress}
        color={props.color}
        icon={icon}
        title={props.title}
        iconPosition={props.iconPosition}
        buttonStyle={[styles(size).radius, style]}
        titleStyle={[styles(size).text, textStyle]}
        containerStyle={{ borderRadius: 80 }}
      />
    </View>
  );
};
const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#57606f",
      fontSize: size / 6,
    },
  });
