/**
 * Created by fangzhen on 2016/11/2.
 */

//配置文件
import './config/config';

import HomePage from './component/HomePage/HomePage';

class NavigatorController extends Component{
    constructor(props){
        super(props);
        this.state = {
            backCount:2,//返回按键的次数
        };

        this._onPressBack = this._onPressBack.bind(this);
    }
    render(){
        //初始化路由页面
        let initialRoute = {
            name:'homePage',
            component:HomePage,
            param:{
                sceneConfig:Navigator.SceneConfigs.PushFromRight,
            },//可传递参数
        };


        return (
            <Navigator
                initialRoute={initialRoute}
                renderScene={(route,navigator)=>this._renderScene(route,navigator)}
                configureScene={route=>this._configureScene(route)}
            />
        )
    }

    _renderScene(route,navigator){
        const Component = route.component;
        return (
            <Component
                {...route.param}
                navigator={navigator}
            />
        );
    }


    /**
     * 返回屏幕显示形式
     * @param route
     * @returns {*}
     * @private
     */
    _configureScene = (route)=>{
        if(route.param.sceneConfig){
            return route.param.sceneConfig;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress',this._onPressBack);
    }


    _onPressBack(){
        this.setState({
            backCount:6,
        },function () {
            if(this.state.backCount){
                ToastAndroid.show(this.state.backCount+'再按一次退出应用',ToastAndroid.SHORT);
                return true;
            }
            else return false;//退出应用
        });
    }
}
AppRegistry.registerComponent('Ieasy', () => NavigatorController);