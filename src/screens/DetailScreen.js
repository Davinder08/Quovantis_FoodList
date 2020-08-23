import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

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
            if (!data.success) {
              this.setState({
                foodList: [],
                filterFoodList: [],
                isLoading: false,
              });
              return;
            }

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
            this.setState(
              {
                isLoading: false,
              },
              () => console.log(error),
            );
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

  _renderBarHeader = (obj, index) => {
    const {selectedIndex} = this.state;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.updateIndex(index)}
        style={styles.categoryHeader}>
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
          name={selectedIndex.includes(index) ? 'caret-up' : 'caret-down'}
          size={Dimens.thirty}
          color="silver"
        />
      </TouchableOpacity>
    );
  };

  _renderContent = (obj) => {
    return (
      <Animatiable.View animation={'slideInDown'} duration={500}>
        {obj.subcategories.map((categoryObj, index) => {
          return (
            <SubCategoryComponent
              key={index}
              headerText={categoryObj.subCategoryname}
              headerColor={{color: obj.colorCode}}
              childenArr={categoryObj.items}
              quote={obj.quote}
            />
          );
        })}

        {obj.quote != '' && <FooterComponent quotes={obj.quote} />}
      </Animatiable.View>
    );
  };

  _renderBar = (obj, index) => {
    const {selectedIndex} = this.state;
    return (
      <>
        <View
          key={index}
          style={[styles.barContainer, {marginTop: Dimens.fifteen}]}>
          {this._renderBarHeader(obj, index)}
          {selectedIndex.includes(index) && this._renderContent(obj)}
        </View>

        {selectedIndex.includes(index) && obj.protip != '' && (
          <TipView proTip={obj.protip} />
        )}
      </>
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

    let searchedArray = foodListAvailable.map((foodObj) => {
      return foodObj.category.subcategories.filter((item) => {
        return item.items.filter((itemm) => {
          if (itemm.toUpperCase().indexOf(keyWord.toUpperCase()) !== -1)
            return itemm;
        });
      });
    });

    console.log(searchedArray);

    let abc = {...filterFoodList.category.subcategories, items: searchedArray};

    this.setState({filterFoodList: abc});
  };

  _renderFoodList = () => {
    return filterFoodList.map((obj, index) => {
      return this._renderBar(obj.category, index);
    });
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
