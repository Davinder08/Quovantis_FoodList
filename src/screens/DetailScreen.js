import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNetInfo} from '@react-native-community/netinfo';
import Api from '../Api/Apis';
import {Dimens} from '../Utils/Theme';
import * as Animatiable from 'react-native-animatable';

// File imports
import SearchComponent from '../Component/SearchComponent';
import TipView from '../Component/TipView';
import FooterComponent from '../Component/FooterComponent';
import SubCategoryComponent from '../Component/SubCategoryComponent';
import styles from './DetailScreenStyles';

class DetailScreen extends React.Component {
  state = {
    isLoading: false,
    foodList: [],
    filterFoodList: [],
    selectedIndex: [-1],
  };

  componentDidMount() {
    // if (netInfo.isConnected) {
    Api.getCall(
      Api.webService.fetchFoodList,
      (data) => {
        this.setState({
          foodList: data.categories,
          filterFoodList: data.categories,
        });
      },
      (error) => {
        console.log(error);
      },
    );
    // }
  }

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
    this.setState({selectedIndex: tempIndex}, () =>
      console.log(this.state.selectedIndex),
    );
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
        {obj.subcategories.map((categoryObj) => {
          return (
            <SubCategoryComponent
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
          onPress={() => {}}>
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
    let foodListAvailable = {...this.state.foodList};

    if (keyWord == '') {
      this.setState({filterFoodList: foodListAvailable});
      return;
    }

    let abc = foodListAvailable.category.subcategories.map((subObj) => {
      subObj.items.filter((item) => {
        if (item.indexOf(keyWord) !== -1) {
          return item;
        }
      });
    });
    console.log(abc);
    this.setState({filterFoodList: abc});
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

          {filterFoodList.length > 0 &&
            filterFoodList.map((obj, index) => {
              console.log(obj);
              return this._renderBar(obj.category, index);
            })}
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

  _renderLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.1)',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={'red'} size={'large'} />
      </View>
    );
  };

  render() {
    const {isLoading} = this.state;

    return (
      <>
        <View style={[styles.container, {backgroundColor: 'rgba(0,0,0,0.2)'}]}>
          {isLoading ? this._renderLoader() : this._renderMainView()}
        </View>
      </>
    );
  }
}

export default DetailScreen;
