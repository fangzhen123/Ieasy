/**
 * Created by fangzhen on 2016/12/21.
 */
import {Linking} from 'react-native';

class CustomButton extends Component {

    constructor(props){
        super(props);
    }

    static propTypes =  {
        url: React.PropTypes.string,
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={()=>Linking.canOpenURL(this.props.url).then(supported => {
                    if (supported) {
                        Linking.openURL(this.props.url);
                    } else {
                        alert('无法打开该URI: ' + this.props.url);
                    }
                })}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}


export default class LinkingDemo extends Component {

    // componentDidMount() {
    //     var url = Linking.getInitialURL().then((url) => {
    //         ifurl) {
    //             console.log('捕捉的URL地址为: ' + url);
    //         }
    //     }).catch(err => console.error('错误信息为:', err));
    // }


    render() {
        return (
            <View>
                <CustomButton url={'http://www.lcode.org'}  text="点击打开http网页"/>
                <CustomButton url={'https://www.baidu.com'} text="点击打开https网页"/>
                <CustomButton url={'smsto:13602457495'}  text="点击进行发送短信"/>
                <CustomButton url={'tel:13602457495'} text="点击进行打电话"/>
                <CustomButton url={'mailto:1090572028@qq.com'} text="点击进行发邮件"/>
                <CustomButton url={'geo:37.484847,-122.148386'} text="位置信息12"/>
                <CustomButton url={'weixin://'} text="微信"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});

