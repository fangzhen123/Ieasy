/**
 * 英雄详情组件
 * Created by fangzhen on 2016/11/21.
 */
import PageTitle from './../../common/PageTitle/index';

export default class ChampionInfo extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <PageTitle title="英雄详情" navigator={this.props.navigator}/>
                <Text>英雄{this.props.id}</Text>
            </View>
        );
    }
}