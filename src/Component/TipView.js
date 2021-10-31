import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dimens} from '../Utils/Theme';
import LinearGradient from 'react-native-linear-gradient';

export default TipView = React.memo((props) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#86a7e1', '#66aad7', '#a1e6e5']}
      style={styles.gradientConatiner}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.textTipStyling} children={'TIP'} />
        </View>
        <Text style={styles.detailTextStyling} children={props.proTip} />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  gradientConatiner: {
    borderRadius: Dimens.ten,
    marginTop: Dimens.fifteen,
  },
  mainContainer: {
    borderRadius: Dimens.ten,
    padding: Dimens.fifteen,
  },
  container: {
    flex: 1,
    backgroundColor: '#538fb8',
    alignSelf: 'flex-start',
    borderRadius: Dimens.hundred,
  },
  textTipStyling: {
    fontSize: Dimens.eighteen,
    paddingHorizontal: Dimens.thirty,
    paddingVertical: Dimens.five,
    color: 'white',
  },
  detailTextStyling: {
    fontSize: Dimens.eighteen,
    padding: Dimens.seven,
    marginTop: Dimens.five,
    color: 'white',
  },
});
