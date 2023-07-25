import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

const SliderContainer = (props) => {
  const {sliderValue, trackMarks} = props;
  const [value, setValue] = React.useState(
    sliderValue ? sliderValue : DEFAULT_VALUE,
  );
  const DEFAULT_VALUE = 0.2;
  const borderWidth = 4;
  const trackMarkStyles = StyleSheet.create({
    activeMark: {
      borderColor: 'red',
      borderWidth,
      left: -borderWidth / 2,
    },
    inactiveMark: {
      borderColor: 'grey',
      borderWidth,
      left: -borderWidth / 2,
    },
  });
  let renderTrackMarkComponent;

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = ({index}) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      if (!!child && child.type === Slider) {
        // _setValue(value)
        // console.log(_value[0]);
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }
      return child;
    });
  };
  return (
    <View style={{}}>
      <View style={styles.titleContainer}>
        {/* <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text> */}
      </View>
      {renderChildren()}
    </View>
  );
};

export default SliderContainer;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
