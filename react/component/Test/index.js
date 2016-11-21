/**
 * Created by fangzhen on 2016/11/15.
 */

import GiftedChatComponent from './../GiftedChat/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from './../../common/CheckBox/index';

import LOLIndex from './../LOL/index';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './../../common/TabBar/index';
import ChampionList from './../LOL/championsList';

var tabNames = ['查询','英雄','排行','我'];
var tabIconNames = ['search','legal','bar-chart-o','user'];

export default class TestComponent extends Component{


    _handleChange = (state)=>{
        alert(state);
    }

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{flex:1}}>
                    <ScrollableTabView
                        renderTabBar={() => <CustomTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                        tabBarPosition='bottom'
                    >
                        <View style={{flex:1}}><LOLIndex navigator={this.props.navigator}/></View>
                        <View style={{flex:1}}><ChampionList navigator={this.props.navigator}/></View>
                        <Text>排行</Text>
                        <Text>我的</Text>
                    </ScrollableTabView>
                </View>

            </View>
        );
    }
}
