import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Dimens} from '../Utils/Theme';

export default SubCategoriesComponent = React.memo((props) => {
  const _itemSeperator = (item) => {
    return (
      <View
        style={{
          width: '100%',
          height: StyleSheet.hairlineWidth,
          backgroundColor: 'silver',
        }}
      />
    );
  };

  return (
    <View style={styles.gradientConatiner}>
      {props.headerText != '' && (
        <Text
          style={[styles.textTipStyling, props.headerColor]}
          children={props.headerText}
        />
      )}
      {/* <FlatList
        style={{flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        data={props.childenArr}
        // ItemSeparatorComponent={_itemSeperator}
        renderItem={(item) => { */}
      {props.childenArr.map((item, index) => {
        return (
          <View index={index}>
            <Text style={styles.textTipStyling} children={item} />
            <View
              style={{
                width: '100%',
                height: StyleSheet.hairlineWidth,
                backgroundColor: 'silver',
              }}
            />
          </View>
        );
      })}
      {/* // ); // }} // /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  gradientConatiner: {
    flex: 1,
    backgroundColor: 'white',
  },

  textTipStyling: {
    fontSize: Dimens.eighteen,
    padding: Dimens.ten,
  },
});
