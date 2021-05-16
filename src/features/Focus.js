import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import { RoundedButton } from "../components/RoundedButton";
import { fontSizes, paddingSizes } from "../utils/sizes.js";

export const Focus = ({ addTask }) => {
  const [inputValue, setInputValue] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What would you like to focus on ?</Text>

        <View
          style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}
        >
          <Input
            containerStyle={styles.inputContainer}
            placeholder="Task name"
            onSubmitEditing={({ nativeEvent }) =>
              setInputValue(nativeEvent.text)
            }
          />
          <RoundedButton
            size={55}
            color="#67e6dc"
            icon={<Icon name="plus" type="octicon" size={16} color="white" />}
            onPress={() => {
              addTask(inputValue);
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.6,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#9AECDB",
    borderRadius: 10,
    shadowColor: "#ff4d4d",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },

  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    padding: paddingSizes.md,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: fontSizes.lg,
  },
});
