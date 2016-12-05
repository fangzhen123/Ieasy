/**
 * Created by fangzhen on 2016/11/23.
 */

import PageTitle from './../../common/PageTitle/index';
import LoadingPage from './../../common/LoadingPage/index';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';

import GameDetail from './gameDetail';

import GameList from './gameList';

import {TIER} from './../../config/tier';

const game_type = ['','自定义','新手关','匹配赛','排位赛','战队赛','大乱斗','人机','统治战场','大对决'];
game_type[11] = '匹配赛';
game_type[24] = '火力赛';
game_type[25] = '匹配赛';

export default class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            user_basic_info: [],
            user_ext_info: [],
            user_bat_list:[],
            area:[],
            loaded:false,
        }

        setTimeout(()=>{
            this._getArea();
            this._getUserBasicInfo();
            this._getUserExtInfo();
            this._getUserBatList();
        },300);

    }

    /**
     * 获取LOL大区列表信息
     * @private
     */
    _getArea = ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_AREA)
            .setMethod('GET')
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{
                this.setState({
                    area:data.data
                });
            })
            .catch((error)=>{
                alert('error:'+error);
            })
    }

    /**
     * 获取用户基本信息
     * @private
     */
    _getUserBasicInfo= ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_USER_BASIC_INFO+'?qquin='+this.props.qquin+'&vaid='+this.props.area_id)
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    user_basic_info:data.data[0]
                });
            })
            .catch((error) => {
                console.log('=> catch: ', error);
            });
    }

    /**
     * 获取用户详细信息
     * @private
     */
    _getUserExtInfo = ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_USER_EXT_INFO+'?qquin='+this.props.qquin+'&vaid='+this.props.area_id)
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    user_ext_info:data.data,
                    loaded:true
                });
            })
            .catch((error) => {
                console.log('=> catch: ', error);
            });
    }

    /**
     * 获取用户最近比赛列表
     * @private
     */

    _getUserBatList = ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_BAT_LIST+'?qquin='+this.props.qquin+'&vaid='+this.props.area_id+'&p=0')
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    user_bat_list:data.data[0].battle_list,
                });
            })
            .catch((error) => {
                console.log('=> catch: ', error);
            });
    }


    /**
     *截取时间
     * @param str
     */
    _cut_time = (str)=>{
        return str.substring(5,str.length);
    }

    render(){

        if(!this.state.loaded){
            return (
                <LoadingPage/>
            );
        }
        else {

            var KDA = (this.state.user_ext_info[0].items[0].recent_kda.k_num+this.state.user_ext_info[0].items[0].recent_kda.a_num)/(this.state.user_ext_info[0].items[0].recent_kda.d_num)*3;
            var K = this.state.user_ext_info[0].items[0].recent_kda.k_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var D = this.state.user_ext_info[0].items[0].recent_kda.d_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var A = this.state.user_ext_info[0].items[0].recent_kda.a_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var win_rate = (this.state.user_ext_info[0].items[0].recent_kda.win_num/this.state.user_ext_info[0].items[0].recent_kda.use_num)*100;

            var bat_list_view = [];

            this.state.user_bat_list.map((item, i)=> {
                var gameRes;
                if(item.win==1){
                    gameRes=<Text style={{color:'green'}}>胜利</Text>;
                }else {
                    gameRes=<Text style={{color:'red'}}>失败</Text>;
                }

                    bat_list_view.push(
                        <TouchableOpacity key={i} onPress={()=>{
                            this.props.navigator.push({name:'gameDetail',component:GameDetail,param:{qquin:this.props.qquin,vaid:this.props.area_id,gameid:item.game_id}});
                        }}>
                            <View style={styles.bat_row}>
                                <View style={{flex:1,justifyContent:'center',margin:5}}>
                                    <Image
                                        source={{uri: 'http://cdn.tgp.qq.com/pallas/images/champions_id/' + item.champion_id + '.png'}}
                                        style={{width: 30, height:30}}></Image>
                                </View>
                                <View style={{flex:2,justifyContent:'center'}}>
                                    <Text>{game_type[item.game_type]}</Text>
                                </View>
                                <View style={{flex:2,justifyContent:'center'}}>
                                    {gameRes}
                                </View>
                                <View style={{flex:3,justifyContent:'center'}}>
                                    <Text>{this._cut_time(item.battle_time)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }
            );

            var sw = '';
            if(this.state.user_basic_info.tier==255){
                sw = '-';
            }
            else {
                sw = TIER[this.state.user_basic_info.tier].title+TIER[this.state.user_basic_info.tier].queue[this.state.user_basic_info.queue];
            }

            return (
                <View style={{flex:1,backgroundColor:'#fff',flexDirection:'column'}}>

                    <PageTitle title={this.state.user_basic_info.name} navigator={this.props.navigator}/>

                    <View>
                        <Image source={require('./images/background.jpg')} style={{width:SceneWidth,height:150}}>

                            <View style={{flex:1,flexDirection:'row'}}>

                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{marginTop:10,flex:1}}>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <Image source={{uri:URL.LOL_USER_ICON_URL+this.state.user_basic_info.icon+'.png'}} style={styles.icon_img}></Image>
                                            <View style={{flex:1,flexDirection:'column',marginLeft:5,marginBottom:15,justifyContent:'center'}}>
                                                <Text style={styles.text_style}>{this.state.area[this.state.user_basic_info.area_id-1].name}</Text>
                                                <Text style={styles.text_style}>{this.state.user_basic_info.name}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>

                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                    <View style={{backgroundColor:'#7dc4f4',width:80,alignItems:'center',borderRadius:3}}>
                                        <Text style={{fontSize:15,color:'#fff'}}>段位</Text>
                                    </View>
                                    <View style={{width:80,alignItems:'center',backgroundColor:'#fff',borderRadius:3}}>
                                        <Text style={{fontSize:20,color:'#7dc4f4'}}>{sw}</Text>
                                    </View>
                                </View>
                            </View>

                        </Image>
                    </View>

                    <View>
                        <ScrollableTabView
                            style={{margin: 10,borderWidth:1,height:160,borderColor:'#7dc4f4',borderRadius:5}}
                            renderTabBar={() => <DefaultTabBar />}
                            tabBarUnderlineStyle={{backgroundColor:'#e69138'}}
                            tabBarBackgroundColor='#7dc4f4'
                            tabBarActiveTextColor="#e69138"
                            tabBarInactiveTextColor="#fff"
                            tabBarTextStyle={{fontSize:15}}
                        >
                            <View tabLabel='最近表现' style={{flex:1,justifyContent:'center'}}>

                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{flex:1}}>

                                        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                                            <Text style={{fontSize:15}}>KDA</Text>
                                            <Text style={{fontSize:12}}>{KDA.toFixed(1)}    {K.toFixed(1)}/{D.toFixed(1)}/{A.toFixed(1)}</Text>
                                        </View>

                                        <View style={{alignItems:'center',flex:1,justifyContent:'center'}}>
                                            <Text style={{fontSize:15}}>胜率/场次</Text>
                                            <Text style={{fontSize:12}}>{win_rate.toFixed(1)}%/{this.state.user_ext_info[0].items[0].recent_kda.use_num}场</Text>
                                        </View>
                                    </View>

                                    <View style={{flex:1,marginRight:20}}>

                                        <View style={{alignItems:'center'}}>
                                            <Text>位置</Text>
                                        </View>

                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize:10}}>上单</Text>
                                            </View>
                                            <View style={{flex:4}}>
                                                <ProgressBarAndroid  styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.up_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize:10}}>中单</Text>
                                            </View>
                                            <View style={{flex:4}}>
                                                <ProgressBarAndroid styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.mid_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize:10}}>打野</Text>
                                            </View>
                                            <View style={{flex:4}}>
                                                <ProgressBarAndroid  styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.jungle_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize:10}}>ADC</Text>
                                            </View>
                                            <View style={{flex:4}}>
                                                <ProgressBarAndroid  styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.adc_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize:10}}>辅助</Text>
                                            </View>
                                            <View style={{flex:4}}>
                                                <ProgressBarAndroid  styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.aux_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View tabLabel='历史荣誉' style={{flex:1,justifyContent:'center'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{flexDirection:'column',flex:1}}>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>三杀 : </Text>
                                            </View>

                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].triple_kills}</Text>
                                            </View>

                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>四杀 : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].quadra_kills}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>五杀 : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].penta_kills}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>超神 : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].god_like_num}</Text>
                                            </View>
                                        </View>

                                    </View>


                                    <View style={{flexDirection:'column',flex:1}}>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>总   击  杀 : </Text>
                                            </View>

                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].kills_total}</Text>
                                            </View>

                                        </View>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>总   助  攻 : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[1].assists_total}</Text>
                                            </View>
                                        </View>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>匹配MVP : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[2].total_match_mvps}</Text>
                                            </View>
                                        </View>

                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <View style={{flex:1,alignItems:'flex-end'}}>
                                                <Text style={styles.honor_title}>排位MVP : </Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.user_ext_info[2].total_rank_mvps}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>

                        </ScrollableTabView>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{marginLeft:15}}>
                            <Text>最近比赛</Text>
                        </View>
                        <ScrollView>
                            <View style={{flex:1,flexDirection:'column',borderWidth:1,margin:10,borderColor:'#7dc4f4',borderRadius:5}}>
                                {bat_list_view}

                                <TouchableOpacity onPress={()=>{
                                    this.props.navigator.push({name:'gameList',component:GameList,param:{qquin:this.props.qquin,vaid:this.props.area_id}});
                                }}>
                                    <View style={{justifyContent:'center',alignItems:'center',height:30}}>
                                        <Text style={{fontSize:12}}>查看全部</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    row:{
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row',
        margin:2,
        borderColor:'#d4d4d3',
        padding:5,
    },
    level_style:{
        backgroundColor:'#f7ac46',
        width:20,
        height:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
    },
    level_title:{
        fontSize:10,
        color:'#fff',
    },
    icon_img:{
        width:80,
        height:80,
        borderRadius:3,
        borderWidth:3,
        borderColor:'#fff',
        marginTop:10,
        marginLeft:10,
    },
    icon_style:{
        width:10,
        height:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:5
    },
    text_style:{
        fontSize:15,
        color:'#fff',
    },
    name_style:{
        fontWeight:'bold',
    },
    honor_title:{
        fontSize:12,
        fontWeight:'bold',
    },
    bat_row:{
        borderBottomWidth:1,
        borderBottomColor:'#7dc4f4',
        flexDirection:'row',
    },

});