import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { spacing, fontSizes } from "../utils/sizes";
import { RoundedButton } from "../components/RoundedButton";

const HistoryItem = ({ item }) => {
  return <Text style={styles.historyItems(item.status)}>{item.task}</Text>;
};

export const TaskList = ({ taskHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {!!taskHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              data={taskHistory}
              renderItem={HistoryItem}
              keyExtractor={(item) => item.id}
            ></FlatList>

            {/* //? clear button */}
            <View style={styles.clearContainer}>
              <RoundedButton
                size={70}
                title="Clear"
                textStyle={{
                  marginLeft: -2,
                  fontWeight: "bold",
                  color: "white",
                }}
                color="#ff7675"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItems: (status) => ({
    color: status > 1 ? "red" : "green",
    fontSize: fontSizes.md,
  }),

  title: {
    color: "white",
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});
