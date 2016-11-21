/**
 * 封装checkBox组件
 * Created by fangzhen on 2016/11/21.
 */

import Icon from 'react-native-vector-icons/FontAwesome';

export default class CheckBox extends Component{

    static defaultProps = {
        checked:false,
    };

    static PropTypes = {
        checked:React.PropTypes.bool.isRequired,                //是否选中
        onChange:React.PropTypes.func.isRequired,               //回调函数
    };

    constructor(props){
        super(props);
        this.state = {
            checked:props.checked,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checked:nextProps.checked
        });
    }

    onChange(){
        this.setState({
            checked:!this.state.checked
        });
    }

    toggle(){
        this.setState({
            checked:!this.state.checked
        });
        setTimeout(()=>this.props.onChange(this.state.checked),0);
    }


    render(){
        var source = "square-o";
        if(this.state.checked){
            source = "check-square-o";
        }
        var container = (
            <View style={styles.container}>
                <Icon name={source} size={20} style={styles.checkbox} color="#00B4F7" ></Icon>
            </View>
        );
        return (
            <TouchableOpacity ref="checkbox" onPress={this.toggle.bind(this)} underlayColor='white'>
                {container}
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkbox: {
        width: 26,
        height: 26,
    },
});