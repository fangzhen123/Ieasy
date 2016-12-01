/**
 * 战绩详情
 * Created by fangzhen on 2016/11/30.
 */
import PageTitle from './../../common/PageTitle/index';

import LoadingPage from './../../common/LoadingPage/index';

const game_type = ['','自定义','新手关','匹配赛','排位赛','战队赛','大乱斗','人机','统治战场','大对决'];
game_type[24] = '火力赛';

export default class GameDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            game_detail: [],
            loaded: false
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
        var players = [];
        this.state.game_detail.gamer_records.map((item, i)=> {
            players.push(
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Image
                            source={{uri: 'http://cdn.tgp.qq.com/pallas/images/champions_id/' + item.champion_id + '.png'}}
                            style={{width: 50, height: 50}}></Image>
                    </View>
                    <View style={{flex:3,flexDirection:'column'}}>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item0+'.png'}}></Image>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item1+'.png'}}></Image>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item2+'.png'}}></Image>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item3+'.png'}}></Image>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item4+'.png'}}></Image>
                            <Image style={{width:30,height:30}} source={{uri:'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/'+item.item5+'.png'}}></Image>
                        </View>
                    </View>
                </View>
            );
        });

        return (
            <View style={{flex:1}}>
                <PageTitle title="比赛详情" navigator={this.props.navigator}/>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',margin:5}}>
                        <View style={{flex:1}}><Text>开始时间  {this._cut_time(this.state.game_detail.start_time)}</Text></View>
                        <View style={{flex:1}}><Text>历时  {parseInt(this.state.game_detail.duration/60)}分钟</Text></View>
                        <View style={{flex:1}}><Text>模式  {game_type[this.state.game_detail.game_type]}</Text></View>
                    </View>

                    <View style={{flex:1}}>
                        <View style={{flex:1,flexDirection:'column'}}>
                            {players}
                        </View>

                        <View></View>
                    </View>
                </View>
            </View>
        );
    }
}