import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Dimens} from '../Utils/Theme';

export default FooterComponent = React.memo((props) => {
  return (
    <View style={styles.gradientConatiner}>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: Dimens.ten,
          margin: Dimens.twenty,
        }}>
        <Text style={styles.textTipStyling} children={props.quotes} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  gradientConatiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  textTipStyling: {
    fontSize: Dimens.sixteen,
    textAlign: 'center',
    color: '#bac0ca',
    backgroundColor: '#f1f5f9',
    padding: Dimens.fifteen,
  },
});
