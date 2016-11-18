/**
 * Created by fangzhen on 16/10/30.
 */
import PageTitle from './../PageTitle/index';

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

const MySceneStyle = StyleSheet.create({
    pageTitle:{
        fontSize:25,
        marginLeft:50,
        color:'#fff',
    },
    backButton: {
        width: 20,
        height: 20,
        marginLeft: 16,
        tintColor: 'white',
    },
});