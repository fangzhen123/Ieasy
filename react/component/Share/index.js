/**
 * 分享组件
 * Created by fangzhen on 2016/11/14.
 */

export default class ShareComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            result:'',
        }
    }


    _shareMsg(){
        Share.share(
            {
            message: '我是被分享的本文信息',
            url: 'http://www.lcode.org',
            title: 'React Native'
        }, {
            dialogTitle: '分享博客地址',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        }).then(this._showResult).catch((error)=>ToastAndroid.show(error.message,ToastAndroid.SHORT))
    }

    _showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }
    }

    render(){
        return (
            <View>
                <TouchableOpacity onPress={this._shareMsg}>
                    <Text>按我分享</Text>
                </TouchableOpacity>
            </View>
        )
    }
}