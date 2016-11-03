/**
 * Created by fangzhen on 2016/11/2.
 */

//配置文件
import './config/config';

import HomePage from './component/HomePage/HomePage';

var backCount;

class NavigatorController extends Component{
    constructor(props){
        super(props);
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
        backCount = 1;
        BackAndroid.addEventListener('hardwareBackPress',this._onPressBack);
    }

    _onPressBack(){
        if(backCount){
            this.timer = setTimeout(()=>{
                backCount = 1;
            },3000);

            backCount--;
            ToastAndroid.show('再按一次退出Ieasy',ToastAndroid.SHORT);
            return true;
        }
        else {
            return false;
        }
    }

    componentWillUnMount() {
        this.timer&&clearTimeout(this.timer);
    }
}
AppRegistry.registerComponent('Ieasy', () => NavigatorController);