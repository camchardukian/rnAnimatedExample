import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  StatusBar,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import data from './data';
import OverflowItems from './OverflowItems';

const App = () => {
  const width = useWindowDimensions().width;
  const ITEM_WIDTH = width * 0.76;
  const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [scrollItemIndex, setScrollItemIndex] = useState(0);

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const renderItem = ({item, index}) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -100],
    });
    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });
    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.66, 1, 0],
    });
    return (
      <Animated.View
        style={{
          position: 'absolute',
          left: -ITEM_WIDTH / 2,
          opacity,
          transform: [{translateX}, {scale}],
        }}>
        <Image
          source={{uri: item.poster}}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
          }}
        />
      </Animated.View>
    );
  };

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          if (scrollItemIndex < data.length - 1) {
            setScrollItemIndex(scrollItemIndex + 1);
            scrollXIndex.setValue(scrollItemIndex + 1);
          }
        }
      }}>
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (scrollItemIndex > 0) {
              setScrollItemIndex(scrollItemIndex - 1);
              scrollXIndex.setValue(scrollItemIndex - 1);
            }
          }
        }}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, itemIndex) => String(itemIndex)}
            horizontal
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              style,
              children,
              ...props
            }) => {
              const zIndex = {zIndex: data.length - index};
              return (
                <View style={zIndex} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            contentContainerStyle={styles.flatlist}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  flatlist: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default App;
