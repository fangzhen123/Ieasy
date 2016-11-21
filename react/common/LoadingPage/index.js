/**
 * 加载页组件
 * Created by fangzhen on 16/11/21.
 */

export default class LoadingPage extends Component{

    static defaultProps = {
        title:'加载中...',
    }

    static propTypes = {
        title:React.PropTypes.string,
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',}}>
                <ActivityIndicator
                    color="#9DE2A1"
                    size="large"
                />
                <Text>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}