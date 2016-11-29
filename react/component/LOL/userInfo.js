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

            var KDA = (this.state.user_ext_info[0].items[0].recent_kda.k_num+this.state.user_ext_info[0].items[0].recent_kda.a_num)/(this.state.user_ext_info[0].items[0].recent_kda.d_num)*3;
            var K = this.state.user_ext_info[0].items[0].recent_kda.k_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var D = this.state.user_ext_info[0].items[0].recent_kda.d_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var A = this.state.user_ext_info[0].items[0].recent_kda.a_num/this.state.user_ext_info[0].items[0].recent_kda.use_num;
            var win_rate = (this.state.user_ext_info[0].items[0].recent_kda.win_num/this.state.user_ext_info[0].items[0].recent_kda.use_num)*100;

            return (
                <View style={{flex:1,backgroundColor:'#fff',flexDirection:'column'}}>

                    <PageTitle title={this.props.name} navigator={this.props.navigator}/>

                    <View>
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

                                <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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
                    <ScrollView>
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View>
                                <Text>最近表现</Text>
                            </View>

                            <View style={{flex:1,flexDirection:'row'}}>
                                <View style={{flex:1}}>
                                    <View>
                                        <Text>KDA</Text>
                                        <Text>{KDA.toFixed(1)}    {K.toFixed(1)}/{D.toFixed(1)}/{A.toFixed(1)}</Text>
                                    </View>

                                    <View>
                                        <Text>胜率/场次</Text>
                                        <Text>{win_rate.toFixed(1)}%/{this.state.user_ext_info[0].items[0].recent_kda.use_num}场</Text>
                                    </View>

                                </View>

                                <View style={{flex:1,marginRight:20}}>
                                    <Text>位置</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>上单</Text>
                                        </View>
                                        <View style={{flex:4}}>
                                            <ProgressBarAndroid color="#f24a29" styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.up_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>中单</Text>
                                        </View>
                                        <View style={{flex:4}}>
                                            <ProgressBarAndroid color="#e3af5c" styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.mid_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>打野</Text>
                                        </View>
                                        <View style={{flex:4}}>
                                            <ProgressBarAndroid color="#2cce55" styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.jungle_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>ADC</Text>
                                        </View>
                                        <View style={{flex:4}}>
                                            <ProgressBarAndroid color="#2796c7" styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.adc_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text>辅助</Text>
                                        </View>
                                        <View style={{flex:4}}>
                                            <ProgressBarAndroid color="#be15c9" styleAttr="Horizontal" progress={this.state.user_ext_info[0].items[0].recent_position.aux_use_num/this.state.user_ext_info[0].items[0].recent_kda.use_num} indeterminate={false}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{flex:1}}>

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

                    </ScrollView>





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

});