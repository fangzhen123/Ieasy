/**
 * Created by fangzhen on 16/11/7.
 */



import {
    StyleSheet,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import ViewPagerComponent from './ViewPagerComponent';


const HOME = '首页';
const HOME_NORMAL = require('./../../../static/images/tabs/home_normal.png');
const HOME_FOCUS = require('./../../../static/images/tabs/home_focus.png');
const CATEGORY = '分类';
const CATEGORY_NORMAL = require('./../../../static/images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./../../../static/images/tabs/category_focus.png');
const FAXIAN = '发现';
const FAXIAN_NORMAL = require('./../../../static/images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./../../../static/images/tabs/faxian_focus.png');
const CART = '购物车';
const CART_NORMAL = require('./../../../static/images/tabs/cart_normal.png');
const CART_FOCUS = require('./../../../static/images/tabs/cart_focus.png');
const PERSONAL = '我的';
const PERSONAL_NORMAL = require('./../../../static/images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./../../../static/images/tabs/personal_focus.png');


export class MallIndex extends Component{
    constructor(props){
        super(props);
        this.state = {selectedTab: HOME}
    }

    render(){
        return (
            <View style={{flex:1}}>
                <ViewPagerComponent/>

                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, this._createChildView(HOME))}
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, this._createChildView(CATEGORY))}
                    {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, this._createChildView(FAXIAN))}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, this._createChildView(CART))}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, this._createChildView(PERSONAL))}
                </TabNavigator>
            </View>
        );
    }



    _renderTabItem(img, selectedImg, tag, childView) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
                onPress={() => this.setState({ selectedTab: tag })}>
                {childView}
            </TabNavigator.Item>
        );
    }


    _createChildView(tag) {
        return (
            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:22}}>{tag}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tab:{
        height:52,
        backgroundColor:'#303030',
        alignItems:'center'
    },
    tabIcon: {
        width: 30,
        height: 35,
        resizeMode: 'stretch',
        marginTop: 10
    }
})