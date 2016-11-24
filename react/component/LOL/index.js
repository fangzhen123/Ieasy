/**
 * Created by fangzhen on 2016/11/15.
 */

import SearchUser from './SearchUser';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from './../../common/TabBar/index';
import ChampionList from './championsList';
import MyDetail from './myDetail';

var tabNames = ['查询','英雄','排行','我'];
var tabIconNames = ['search','legal','bar-chart-o','user'];

export default class Index extends Component{

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{flex:1}}>
                    <ScrollableTabView
                        renderTabBar={() => <CustomTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                        tabBarPosition='bottom'
                    >
                        <View style={{flex:1}}><SearchUser navigator={this.props.navigator}/></View>
                        <View style={{flex:1}}><ChampionList navigator={this.props.navigator}/></View>
                        <Text>排行</Text>
                        <View style={{flex:1}}><MyDetail navigator={this.props.navigator}/></View>
                    </ScrollableTabView>
                </View>

            </View>
        );
    }
}
