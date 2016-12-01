/**
 * 战绩详情
 * Created by fangzhen on 2016/11/30.
 */
import PageTitle from './../../common/PageTitle/index';

import LoadingPage from './../../common/LoadingPage/index';

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

    render(){

        if(!this.state.loaded){
            return (
                <LoadingPage title="战绩加载中..."/>
            );
        }
        return (
            <View style={{flex:1}}>
                <PageTitle title="比赛详情" navigator={this.props.navigator}/>

                <Text>{this.props.qquin}</Text>
                <Text>{this.props.vaid}</Text>
                <Text>{this.props.gameid}</Text>
            </View>
        );
    }
}