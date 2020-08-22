import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Dimens} from '../Utils/Theme';

export default SearchComponent = React.memo((props) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={Dimens.thirty} type="Fontisto" color="black" />
      <TextInput
        placeholder={'Try searching fat, Sauces, names ...'}
        style={styles.textInputStyling}
        onChangeText={(text) => props.updateSearch(text)}
      />
    </View>
  );
});

// SearchComponent.propsType({
// updateSearch : PropType.func.isRequired
// })
// SearchComponent.DefaultProps({
// updateSearch:()=>{}
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: Dimens.seven,
    backgroundColor: '#cccccc',
    borderRadius: Dimens.ten,
    padding: Dimens.tweleve,
  },
  textInputStyling: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: Dimens.ten,
    paddingVertical: Dimens.five,
    marginHorizontal: Dimens.five,
    fontSize: Dimens.eighteen,
    color: 'black',
  },
});
