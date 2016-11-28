/**
 * Created by fangzhen on 2016/11/23.
 */

import PageTitle from './../../common/PageTitle/index';
import LoadingPage from './../../common/LoadingPage/index';

export default class UserInfo extends Component{

    constructor(props){
        super(props);
        this.state = {
            user_basic_info: [],
            user_ext_info: [],
            loaded:false,
        }

        setTimeout(()=>{
            this._getUserBasicInfo();
            this._getUserExtInfo();
        },300);

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

    render(){

        if(!this.state.loaded){
            return (
                <LoadingPage/>
            );
        }
        else {
            return (
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <PageTitle title={this.props.name} navigator={this.props.navigator}/>

                    <View style={{flex:1}}>
                        <Image source={require('./images/background.jpg')} style={{width:SceneWidth,height:150}}>

                            <View style={{flex:1,flexDirection:'row'}}>

                                <View style={{flex:1,flexDirection:'row'}}>

                                    <View style={{marginTop:10,flex:1}}>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <Image source={{uri:URL.LOL_USER_ICON_URL+this.props.icon_id+'.png'}} style={styles.icon_img}></Image>
                                            <View style={{flex:1,flexDirection:'column',marginLeft:5,marginBottom:15,justifyContent:'center'}}>
                                                <Text style={styles.text_style}>{this.props.area}</Text>
                                                <Text style={styles.text_style}>{this.props.name}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>

                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'flex-end',marginRight:15}}>
                                    <View style={{backgroundColor:'#7dc4f4',width:80,alignItems:'center',borderRadius:3}}>
                                        <Text style={{fontSize:15,color:'#fff'}}>段位</Text>
                                    </View>
                                    <View style={{width:80,alignItems:'center',backgroundColor:'#fff',borderRadius:3}}>
                                        <Text style={{fontSize:20,color:'#7dc4f4'}}>{this.props.tier}</Text>
                                    </View>
                                </View>
                            </View>

                        </Image>

                    </View>




                    <View>
                        <Text>最近30天位置:</Text>
                        <Text>打野: {this.state.user_ext_info[0].items[0].recent_position.jungle_win_num}/{this.state.user_ext_info[0].items[0].recent_position.jungle_use_num}</Text>
                        <Text>A D: {this.state.user_ext_info[0].items[0].recent_position.adc_win_num}/{this.state.user_ext_info[0].items[0].recent_position.adc_use_num}</Text>
                        <Text>上单: {this.state.user_ext_info[0].items[0].recent_position.up_win_num}/{this.state.user_ext_info[0].items[0].recent_position.up_use_num}</Text>
                        <Text>中单: {this.state.user_ext_info[0].items[0].recent_position.mid_win_num}/{this.state.user_ext_info[0].items[0].recent_position.mid_use_num}</Text>
                        <Text>辅助: {this.state.user_ext_info[0].items[0].recent_position.aux_win_num}/{this.state.user_ext_info[0].items[0].recent_position.aux_use_num}</Text>
                    </View>
                    <View>
                        <Text>最近30天KDA</Text>
                        <Text>K :{this.state.user_ext_info[0].items[0].recent_kda.k_num}</Text>
                        <Text>D :{this.state.user_ext_info[0].items[0].recent_kda.d_num}</Text>
                        <Text>A :{this.state.user_ext_info[0].items[0].recent_kda.a_num}</Text>
                        <Text>胜利场数 :{this.state.user_ext_info[0].items[0].recent_kda.win_num}</Text>
                        <Text>总场数 :{this.state.user_ext_info[0].items[0].recent_kda.use_num}</Text>
                    </View>

                    <View>
                        <Text>历史荣誉</Text>
                        <Text>三杀：{this.state.user_ext_info[1].triple_kills}</Text>
                        <Text>四杀：{this.state.user_ext_info[1].quadra_kills}</Text>
                        <Text>五杀：{this.state.user_ext_info[1].penta_kills}</Text>
                        <Text>超神：{this.state.user_ext_info[1].god_like_num}</Text>
                        <Text>总击杀：{this.state.user_ext_info[1].kills_total}</Text>
                        <Text>总助攻：{this.state.user_ext_info[1].assists_total}</Text>
                        <Text>匹配mvp：{this.state.user_ext_info[2].total_match_mvps}</Text>
                        <Text>排位mvp：{this.state.user_ext_info[2].total_rank_mvps}</Text>
                        <Text>使用英雄数：{this.state.user_ext_info[3].champion_num}</Text>
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
        width:100,
        height:100,
        borderRadius:3,
        borderWidth:4,
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
        fontSize:20,
        color:'#fff',
    },
    name_style:{
        fontWeight:'bold',
    },

});