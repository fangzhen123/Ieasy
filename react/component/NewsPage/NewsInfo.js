/**
 * Created by fangzhen on 16/11/9.
 */


export default class NewsInfo extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>

                <View style={{flexDirection:'row',height:56,alignItems:'center',backgroundColor:'#ee7c66'}}>

                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{this.props.navigator.jumpBack()}}>
                            <View>
                                <Image style={{width: 20,
                                    height: 20,
                                    marginLeft: 16,
                                    tintColor: 'white',}} source={require('./../../../static/images/back.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                <WebView source={{uri:this.props.url}}></WebView>
            </View>

        );
    }
}