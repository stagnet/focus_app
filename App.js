import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Focus } from "./src/features/Focus";
import { Timer } from "./src/features/Timer";
import { spacing } from "./src/utils/sizes.js";
import { TaskList } from "./src/features/taskList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STATUS = {
  COMPLETE: 1,
  CANCELLED: 2,
};

const uniqueId = () => {
  return Date.now().toString();
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [taskHistory, setTaskHistory] = useState([]);

  const taskHistoryWithStatus = (focusSubject, status) => {
    setTaskHistory([
      ...taskHistory,
      { task: focusSubject, status: status, id: uniqueId() },
    ]);
  };

  const Clear = () => {
    setTaskHistory([]);
  };

  const saveTaskHistory = async () => {
    try {
      await AsyncStorage.setItem("taskHisory", JSON.stringify(taskHistory));
    } catch (error) {
      console.log("error while async setItem", error.message);
    }
  };

  const loadTaskHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("taskHisory");
      if (history && JSON.parse(history.length)) {
        setTaskHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log("error while async getItem", error.message);
    }
  };

  // todo.. this useEffect will run while component mount only...
  useEffect(() => {
    loadTaskHistory();
  }, []);

  // todo.. this useEffect will run save the task locally whenever their's a change inside taskHistory array...
  useEffect(() => {
    saveTaskHistory();
  }, [taskHistory]);
  console.log("JUST A LOG: ", taskHistory);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <StatusBar />

          {focusSubject ? (
            <Timer
              taskName={focusSubject}
              onTimerEnd={() => {
                taskHistoryWithStatus(focusSubject, STATUS.COMPLETE);
                setFocusSubject(null);
              }}
              clearTask={() => {
                taskHistoryWithStatus(focusSubject, STATUS.CANCELLED);
                setFocusSubject(null);
              }}
            />
          ) : (
            <>
              <Focus addTask={setFocusSubject} />
              <TaskList taskHistory={taskHistory} onClear={Clear} />
            </>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63cdda",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Platform.OS === "ios" ? spacing.md : spacing.lg,
  },
});
