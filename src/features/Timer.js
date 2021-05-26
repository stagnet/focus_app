import React, { useState } from 'react';
import { Text, StyleSheet, View, Vibration, Platform } from 'react-native';
import { Icon, LinearProgress } from 'react-native-elements';
import { Timing } from './Timing';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake';

const DEFUALT_TIME = 1;
const ONE_SEC_IN_MS = 1000;

export const Timer = ({ taskName, onTimerEnd, clearTask }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFUALT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  // ? track down timing using props...
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  // ? track down progress using props...
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      // Vibration.vibrate(6 * ONE_SEC_IN_MS);
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 6000);
    } else {
      Vibration.vibrate(3 * ONE_SEC_IN_MS);
    }
  };

  // ? vibrating when task ends..
  const onEnd = () => {
    vibrate();
    setMinutes(DEFUALT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          progressProp={onProgress}
          endTask={onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}>Focusing on :</Text>
        <Text style={styles.task}>{taskName}</Text>
      </View>
      <View style={styles.prgressBarWrapper}>
        <LinearProgress
          color='primary'
          style={{ height: 10 }}
          variant='determinate'
          value={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      {/* //* button changes on isStarted state...  */}
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            color='#e77f67'
            title='Pause'
            iconPosition='top'
            icon={
              <Icon
                name='pause-circle-outline'
                type='ionicon'
                size={25}
                color='white'
              />
            }
            textStyle={{ marginLeft: 6, color: 'white' }}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            color='#3dc1d3'
            title='Start'
            iconPosition='top'
            icon={
              <Icon
                name='caret-forward-circle-outline'
                type='ionicon'
                size={30}
                color='black'
              />
            }
            textStyle={{ marginLeft: 6 }}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>

      {/* //* cancle button */}
      <View style={styles.cancleButton}>
        <RoundedButton
          color='#e74c3c'
          size={50}
          icon={
            <Icon name='close-outline' type='ionicon' size={18} color='black' />
          }
          onPress={() => clearTask()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  task: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prgressBarWrapper: {
    flexDirection: 'row',
    paddingTop: 25,
    marginHorizontal: 10,
  },
  cancleButton: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
