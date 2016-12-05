/**
 * 比赛列表组件
 * Created by fangzhen on 2016/11/30.
 */
import PageTitle from './../../common/PageTitle/index';

import LoadingPage from './../../common/LoadingPage/index';

import GameDetail from './gameDetail';

const game_type = ['','自定义','新手关','匹配赛','排位赛','战队赛','大乱斗','人机','统治战场','大对决'];
game_type[11] = '匹配赛';
game_type[24] = '火力赛';
game_type[25] = '匹配赛';


export default class GameList extends Component{

    constructor(props){
        super(props);
        this.state = {
            game_data:[],
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            page:0,
            loaded:false,
        };

        setTimeout(()=>{
            this._getGameListData();
        },300);
    }


    _getGameListData=()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_BAT_LIST+'?qquin='+this.props.qquin+'&vaid='+this.props.vaid+'&p='+this.state.page+'&pageSize=20')
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
                let newData = this.state.game_data.concat(data.data[0].battle_list);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(newData),
                    game_data:newData,
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
        return str.substring(5,str.length);
    }

    _renderGameRow = (game)=>{
        var gameRes;
        if(game.win==1){
            gameRes=<Text style={{color:'green'}}>胜利</Text>;
        }else {
            gameRes=<Text style={{color:'red'}}>失败</Text>;
        }
        return (
            <TouchableOpacity onPress={()=>{
                this.props.navigator.push({name:'gameDetail',component:GameDetail,param:{qquin:this.props.qquin,vaid:this.props.vaid,gameid:game.game_id}});
            }}>
                <View style={{borderBottomWidth:1, borderBottomColor:'#7dc4f4', flexDirection:'row',}}>
                    <View style={{flex:1,justifyContent:'center',margin:5}}>
                        <Image
                            source={{uri: 'http://cdn.tgp.qq.com/pallas/images/champions_id/' + game.champion_id + '.png'}}
                            style={{width: 30, height:30}}></Image>
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                        <Text>{game_type[game.game_type]}</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                        {gameRes}
                    </View>
                    <View style={{flex:3,justifyContent:'center'}}>
                        <Text>{this._cut_time(game.battle_time)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }



    render(){
        if(!this.state.loaded){
            return(
                <LoadingPage title="比赛加载中..."/>
            );
        }

        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <PageTitle title="全部比赛" navigator={this.props.navigator}/>
                <View style={{flex:1}}>
                    <View style={{flex:1,borderWidth:1,margin:10,borderColor:'#7dc4f4',borderRadius:5}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderGameRow}
                        onEndReached={()=>{
                            let page = this.state.page+1;
                            this.setState({
                                page:page,
                            },()=>{
                                this._getGameListData();
                            });
                        }}
                    />
                        </View>
                </View>
            </View>
        );
    }
}