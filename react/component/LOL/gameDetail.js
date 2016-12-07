/**
 * 战绩详情
 * Created by fangzhen on 2016/11/30.
 */
import PageTitle from './../../common/PageTitle/index';

import LoadingPage from './../../common/LoadingPage/index';

import Icon from 'react-native-vector-icons/FontAwesome';

import ChampionInfo from './championInfo';

import UserInfo from './userInfo';

const game_type = ['','自定义','新手关','匹配赛','排位赛','战队赛','大乱斗','人机','统治战场','大对决'];
game_type[11] ='匹配赛';
game_type[24] = '火力赛';
game_type[25] = '匹配赛';

export default class GameDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            game_detail: [],
            loaded: false,
            item_is_extend:Array.from({length:10},(v,k)=>false),
        };

        setTimeout(()=>{
            this._getGameDetail();
        },300);
    }

    /**
     * 获取比赛详情数据
     * @private
     */
    _getGameDetail=()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_BAT_DETAIL+'?qquin='+this.props.qquin+'&vaid='+this.props.vaid+'&gameid='+this.props.gameid)
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
                this.setState({
                    game_detail:data.data[0].battle,
                    loaded:true,
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
        return str.substring(11,str.length-3);
    }

    render(){

        if(!this.state.loaded){
            return (
                <LoadingPage title="战绩加载中..."/>
            );
        }

        var win_players = [];
        var failed_players = [];

        this.state.game_detail.gamer_records.map((item, i)=> {
            let extend_icon = this.state.item_is_extend[i]?"angle-up":"angle-down";
            let extend_view = this.state.item_is_extend[i]?(<View style={{flex:1,flexDirection:'column',backgroundColor:'#eee',marginRight:5,marginLeft:5}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>补刀  {item.minions_killed}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>推塔  {item.turrets_killed}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>总伤害 {item.total_damage_dealt}</Text></View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>对英雄总伤害 {item.total_damage_dealt_to_champions}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>对英雄物理伤害 {item.physical_damage_dealt_to_champions}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>对英雄魔法伤害 {item.magic_damage_dealt_to_champions}</Text></View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>最大连杀人次数 {item.largest_killing_spree}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>最大多杀次数 {item.largest_multi_kill}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>被塔杀死次数 {item.barracks_killed}</Text></View>
                    </View>

                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>插眼 {item.ward_placed}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>反眼 {item.largest_multi_kill}</Text></View>
                        <View style={{flex:1}}><Text style={{fontSize:10}}>杀龙次数 {item.super_monster_killed}</Text></View>
                    </View>
                </View>)
                :null;


            //胜利队伍
            if(item.win==1){
                win_players.push(
                    <View key={i} style={{flex:1,flexDirection:'column',margin:5,borderBottomWidth:1,borderBottomColor:'#eee'}}>

                        <View key={i} style={{flex: 1, flexDirection: 'row',margin:5}}>
                            <TouchableOpacity style={{flex:1}} onPress={()=>{
                                this.props.navigator.push({name:'championInfo',component:ChampionInfo,param:{id:item.champion_id,navigator:this.props.navigator}});
                            }}>
                                <View style={{flex: 1,alignItems:'center'}}>
                                    <Image
                                        source={{uri: 'http://cdn.tgp.qq.com/pallas/images/champions_id/' + item.champion_id + '.png'}}
                                        style={{width: 70, height: 70,marginRight:5}}></Image>
                                </View>
                            </TouchableOpacity>

                            <View style={{flex:3,flexDirection:'column'}}>

                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2}}>
                                        <TouchableOpacity onPress={()=>{
                                            this.props.navigator.push({name:'userInfo',component:UserInfo,param:{qquin:item.qquin,area_id:this.props.vaid}});
                                        }}>
                                            <Text style={{fontSize:18}}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flex:1,alignItems:'center'}}>
                                        <Text style={{fontSize:15}}>Lv {item.level}</Text>
                                    </View>

                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                        <Text style={{fontSize:15}}>{item.champions_killed}/{item.num_deaths}/{item.assists}</Text>
                                    </View>

                                </View>

                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item0+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item1+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item2+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item3+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item4+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item5+'.png'}}></Image>
                                    </View>

                                </View>
                                <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} onPress={()=> {
                                    let arr = this.state.item_is_extend;
                                    arr[i] = !arr[i];
                                    this.setState({
                                        item_is_extend: arr
                                    });
                                }}>
                                    <View>
                                        <Icon name={extend_icon} size={20}/>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {extend_view}
                    </View>
                );
            }
            else {
                failed_players.push(
                    <View key={i} style={{flex:1,flexDirection:'column',margin:5,borderBottomWidth:1,borderBottomColor:'#eee'}}>

                        <View key={i} style={{flex: 1, flexDirection: 'row',margin:5}}>

                            <TouchableOpacity style={{flex:1}} onPress={()=>{
                                this.props.navigator.push({name:'championInfo',component:ChampionInfo,param:{id:item.champion_id,navigator:this.props.navigator}});
                            }}>
                                <View style={{flex: 1,alignItems:'center'}}>
                                    <Image
                                        source={{uri: 'http://cdn.tgp.qq.com/pallas/images/champions_id/' + item.champion_id + '.png'}}
                                        style={{width: 70, height: 70,marginRight:5}}></Image>
                                </View>
                            </TouchableOpacity>

                            <View style={{flex:3,flexDirection:'column'}}>

                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:2}}>
                                        <TouchableOpacity onPress={()=>{
                                            this.props.navigator.push({name:'userInfo',component:UserInfo,param:{qquin:item.qquin,area_id:this.props.vaid}});
                                        }}>
                                            <Text style={{fontSize:18}}>{item.name}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flex:1,alignItems:'center'}}>
                                        <Text style={{fontSize:15}}>Lv {item.level}</Text>
                                    </View>

                                    <View style={{flex:1,alignItems:'flex-end'}}>
                                        <Text style={{fontSize:15}}>{item.champions_killed}/{item.num_deaths}/{item.assists}</Text>
                                    </View>

                                </View>

                                <View style={{flex:1,flexDirection:'row'}}>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item0+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item1+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item2+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item3+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item4+'.png'}}></Image>
                                    </View>
                                    <View style={{borderWidth:1,borderColor:'#bbb4b4',margin:2}}>
                                        <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item5+'.png'}}></Image>
                                    </View>
                                </View>
                                <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} onPress={()=> {
                                    let arr = this.state.item_is_extend;
                                    arr[i] = !arr[i];
                                    this.setState({
                                        item_is_extend: arr
                                    });
                                }}>
                                    <View>
                                        <Icon name={extend_icon} size={20}/>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        {extend_view}
                    </View>
                );
            }


        });

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <PageTitle title="比赛详情" navigator={this.props.navigator}/>
                <View style={{flex:1,flexDirection:'column'}}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center'}}><Text>开始时间  {this._cut_time(this.state.game_detail.start_time)}</Text></View>
                            <View style={{flex:1,alignItems:'center'}}><Text>历时  {parseInt(this.state.game_detail.duration/60)}分钟</Text></View>
                            <View style={{flex:1,alignItems:'center'}}><Text>模式  {game_type[this.state.game_detail.game_type]}</Text></View>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <ScrollView>
                            <View style={{flex:1,flexDirection:'column'}}>
                                <View style={{width:100,height:40,backgroundColor:'#3dbbab',alignItems:'center',justifyContent:'center',marginTop:10}}>
                                    <Text style={{color:'#fff',fontSize:20}}>胜利方</Text>
                                </View>
                                {win_players}
                                <View style={{width:100,height:40,backgroundColor:'#cc3d37',alignItems:'center',justifyContent:'center',marginTop:10}}>
                                    <Text style={{color:'#fff',fontSize:20}}>失败方</Text>
                                </View>
                                {failed_players}
                            </View>

                            <View></View>

                        </ScrollView>

                    </View>
                </View>
            </View>
        );
    }
}