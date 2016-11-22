/**
 * Created by fangzhen on 2016/11/22.
 */
import PageTitle from './../../common/PageTitle/index';

export default class SkinInfo extends Component{

    render(){
        return (
            <View style={{flex:1}}>
                <PageTitle title={this.props.skins_name} navigator={this.props.navigator}/>
                <WebView source={{uri:this.props.url}}></WebView>
            </View>
        );
    }
}
