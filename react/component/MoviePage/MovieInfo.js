/**
 * Created by fangzhen on 16/10/30.
 */
import PageTitle from './../../common/PageTitle/index';

export default class MovieInfo extends Component{
    render(){
        console.log(this.props);

        return (
            <View style={{flex:1}}>

                <PageTitle title="电影详情" navigator={this.props.navigator}/>

                <WebView source={{uri:this.props.url}}></WebView>
            </View>
        );
    }
}
