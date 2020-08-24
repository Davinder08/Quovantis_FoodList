import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import Accordion from 'react-native-collapsible/Accordion';

import Api from '../Api/Apis';
import {Dimens} from '../Utils/Theme';
import * as Animatiable from 'react-native-animatable';

// File imports
import SearchComponent from '../Component/SearchComponent';
import TipView from '../Component/TipView';
import FooterComponent from '../Component/FooterComponent';
import SubCategoryComponent from '../Component/SubCategoryComponent';
import styles from './DetailScreenStyles';
import LoaderComponent from '../Component/LoaderComponent';

class DetailScreen extends React.Component {
  state = {
    isLoading: false,
    foodList: [],
    filterFoodList: [],
    selectedIndex: [-1],
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        this.getDataFromLocalStorage();
        return;
      }
      this.setState({isLoading: true}, () => {
        Api.getCall(
          Api.webService.fetchFoodList,
          async (data) => {
            await AsyncStorage.setItem(
              'FOOD_CATEGORIES',
              JSON.stringify(data.categories),
            );

            this.setState({
              foodList: data.categories,
              filterFoodList: data.categories,
              isLoading: false,
            });
          },
          (error) => {
            console.log(error);
            this.setState({
              isLoading: false,
            });
          },
        );
      });
    });
  }

  getDataFromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('FOOD_CATEGORIES');
      if (value !== null) {
        this.setState({
          foodList: JSON.parse(value),
          filterFoodList: JSON.parse(value),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  updateIndex = (index) => {
    let tempIndex = [...this.state.selectedIndex];
    let foundIndex = tempIndex.findIndex((obj) => {
      return obj == index;
    });

    if (foundIndex > -1) {
      tempIndex.splice(foundIndex, 1);
    } else {
      tempIndex.push(index);
    }
    this.setState({selectedIndex: tempIndex});
  };

  _renderBarHeader = (section, index, isActive) => {
    let obj = section.category;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.updateIndex(index)}
        style={[
          styles.categoryHeader,
          styles.barContainer,
          {borderTopLeftRadius: 5, borderTopRightRadius: 5},
          !isActive && {borderRadius: 5},
        ]}>
        <View style={styles.leftChildContainer}>
          <Image
            style={styles.categoryImageStyle}
            source={{
              uri: obj.imagePath,
            }}
          />
          <Text
            style={[styles.categoryTextStyle, {color: obj.colorCode}]}
            children={obj.categoryName}
          />
          {obj.servingSize && (
            <Text
              style={styles.categoryServingTextStyle}
              children={'(' + obj.servingSize + ')'}
            />
          )}
        </View>
        <FontAwesome5Icon
          style={{marginHorizontal: Dimens.five}}
          name={isActive ? 'caret-up' : 'caret-down'}
          size={Dimens.thirty}
          color="silver"
        />
      </TouchableOpacity>
    );
  };

  // renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <Text style={styles.textTipStyling} children={item.item} />
  //       <View
  //         style={{
  //           width: '100%',
  //           height: StyleSheet.hairlineWidth,
  //           backgroundColor: 'silver',
  //         }}
  //       />
  //     </View>
  //   );
  // };

  // renderSectionHeader = ({section}) => {
  //   if (section.title == '') {
  //     return null;
  //   }
  //   return (
  //     <Text
  //       style={[styles.textTipStyling, section.color]}
  //       children={section.title}
  //     />
  //   );
  // };

  _renderContent = (section, isActive) => {
    let obj = section.category;
    // let array = obj.subcategories.map((item, index) => {
    //   return {
    //     id: index,
    //     title: item.subCategoryname,
    //     data: item.items,
    //     color: obj.colorCode,
    //   };
    // });

    return (
      <Animatiable.View
        animation={'slideInUp'}
        duration={400}
        style={[
          styles.barContainer,
          isActive && {borderBottomLeftRadius: 5, borderBottomRightRadius: 5},
        ]}>
        {/* <SectionList
          style={[styles.container, {backgroundColor: 'white'}]}
          sections={array}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={(item, index) => index}
        /> */}
        {obj.subcategories.map((categoryObj, index) => {
          return (
            <SubCategoryComponent
              index={index}
              isActive={isActive}
              headerText={categoryObj.subCategoryname}
              headerColor={{color: obj.colorCode}}
              childenArr={categoryObj.items}
              quote={obj.quote}
            />
          );
        })}
        {obj.quote != '' && (
          <FooterComponent
            dynamicStyle={
              isActive && {
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }
            }
            quotes={obj.quote}
          />
        )}
        {obj.protip != '' && <TipView proTip={obj.protip} />}
      </Animatiable.View>
    );
  };

  _renderPageHeader = () => {
    return (
      <View style={styles.PageHeaderContainer}>
        <TouchableOpacity
          style={styles.closeButtonContainer}
          onPress={() => this.props.navigation.goBack()}>
          <Icon
            name="close"
            size={Dimens.fourty}
            type="MaterialCommunityIcons"
            color="#517fa4"
          />
        </TouchableOpacity>

        <Text style={styles.staticTextStyle} children={'Approved Food List'} />
      </View>
    );
  };

  searchList = (keyWord) => {
    let foodListAvailable = [...this.state.foodList];

    if (keyWord == '') {
      this.setState({filterFoodList: foodListAvailable});
      return;
    }

    let searchedArray = foodListAvailable.filter((foodObj) => {
      return foodObj.category.subcategories.some((item) => {
        return item.items.some((itemm) => {
          if (itemm.toUpperCase().indexOf(keyWord.toUpperCase()) !== -1) {
            return itemm;
          }
        });
      });
    });

    // console.log(searchedArray);
    // console.log(foodListAvailable1);

    // let abc = {
    //   ...foodListAvailable1.category.subcategories[0],
    //   items: searchedArray,
    // };

    // console.log(abc);

    this.setState({filterFoodList: searchedArray});
  };

  _renderFoodList = (filterFoodList) => {
    const {selectedIndex} = this.state;
    return (
      <Accordion
        activeSections={selectedIndex}
        sections={filterFoodList}
        touchableComponent={TouchableOpacity}
        expandMultiple={true}
        renderHeader={this._renderBarHeader}
        renderContent={this._renderContent}
        duration={400}
        onChange={this.updateIndex}
      />
    );
  };

  _renderEmptyView = () => {
    return (
      <View style={styles.noItemContainer}>
        <Text style={styles.noItemTextStyle} children={'No Data Available'} />
      </View>
    );
  };

  _renderMainView = () => {
    const {filterFoodList} = this.state;
    return (
      <>
        <ScrollView
          style={styles.mainContainer}
          contentInset={{top: 0, bottom: Dimens.ten}}
          contentContainerStyle={{
            paddingBottom: Dimens.ten,
          }}>
          {this._renderPageHeader()}

          <SearchComponent
            updateSearch={(keyWord) => {
              this.searchList(keyWord);
            }}
          />

          {filterFoodList.length > 0
            ? this._renderFoodList(filterFoodList)
            : this._renderEmptyView()}
        </ScrollView>

        <TouchableOpacity style={styles.messageIconContainer}>
          <Icon
            name="message"
            size={Dimens.fourtyFive}
            type="MaterialCommunityIcons"
            color="white"
          />
        </TouchableOpacity>
      </>
    );
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
        {this._renderMainView()}
        {isLoading && <LoaderComponent loadingText={'Please wait...!'} />}
      </View>
    );
  }
}

export default DetailScreen;
