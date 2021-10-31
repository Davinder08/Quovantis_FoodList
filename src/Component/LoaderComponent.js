import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Dimens} from '../Utils/Theme';

export default Loader = React.memo((props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={'white'} size={'large'} />
      <Text style={styles.textStyling} children={props.loadingText} />
    </View>
  );
});

// Loader.propsType({
// loadingText : PropType.string
// })

// Loader.DefaultProps({
// updateSearch:"Please wait ..!"
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyling: {
    textAlign: 'center',
    fontSize: Dimens.twentyFive,
    color: 'white',
    marginLeft: Dimens.ten,
  },
});
