/**
 * 搜索框组件
 * Created by fangzhen on 2016/11/18.
 */
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SearchInput extends Component{

    static propTypes = {
        onClick      :   React.PropTypes.func.isRequired,            //点击搜索处理函数
        placeholder  :   React.PropTypes.string,                     //搜索框提示
    }

    constructor(props){
        super(props);

        this.state = {
            textInput:'',
        }
    }

    render(){
        return (
                <View style={styles.backStyle}>
                    <View style={{flex:1}}>
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>this.props.onClick(this.state.textInput)}
                            >
                                <Icon name="search" size={30} color="#CCC"></Icon>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{flex:10}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputs}
                            placeholder={this.props.placeholder}
                            placeholderTextColor="#CCC"
                            onChangeText={(text)=>this.setState({textInput:text})}
                        ></TextInput>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    inputs: {
        marginLeft: 5,
        paddingLeft: 5,
    },
    backStyle:{
        flexDirection:'row',
        height:40,
        borderWidth:0.5,
        borderColor:'#CCC',
        borderRadius:4,
        margin:2,
        alignItems:'center',justifyContent:'center'
    },
});