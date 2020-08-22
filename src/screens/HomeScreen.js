import * as React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Dimens, Colors} from '../Utils/Theme';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{borderRadius: Dimens.fifteen, marginVertical: Dimens.ten}}>
          <Text style={styles.textStyle} children="FoodList" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  textStyle: {
    paddingVertical: Dimens.twenty,
    paddingHorizontal: Dimens.hundred,
    fontSize: Dimens.twenty,
    color: Colors.white,
  },
});

export default HomeScreen;
