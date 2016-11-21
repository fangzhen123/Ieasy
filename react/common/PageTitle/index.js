/**
 * 页面头部组件
 * Created by fangzhen on 2016/11/18.
 */

export default class PageTitle extends Component{

    static propTypes = {
        title:React.PropTypes.string.isRequired,                //标题
        navigator:React.PropTypes.object.isRequired,            //导航器
    };


    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={[{flexDirection:'row'},styles.title_background]}>

                <View style={{flex:1}}>
                    <TouchableOpacity onPress={()=> {
                        this.props.navigator.jumpBack()
                    }}>
                        <View>
                            <Image style={{
                                width: 20,
                                height: 20,
                                marginLeft: 16,
                                tintColor: 'white',
                            }} source={require('./../../../static/images/back.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{flex:5,alignItems:'center',marginRight:50}}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
    },
    title_background:{
        backgroundColor:'#ee7c66',
        height:56,
        justifyContent:'center',
        alignItems:'center'
    }
});