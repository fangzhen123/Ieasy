/**
 * 战绩详情
 * Created by fangzhen on 2016/11/30.
 */

export default class GameDetail extends Component{

    constructor(props){
        super(props);
    }

    _getGameDetail=()=>{

    }

    render(){
        return (
            <View>
                <Text>战绩详情</Text>
                <Text>{this.props.qquin}</Text>
                <Text>{this.props.vaid}</Text>
                <Text>{this.props.gameid}</Text>
            </View>
        );
    }
}