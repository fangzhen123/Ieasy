/**
 * Created by fangzhen on 2016/10/31.
 */
import MyMovieList from '../MoviePage/MyMovieList';
import {MallIndex} from '../MallPage/index';
import NewsIndex from '../NewsPage/index';

import TestIndex from '../Test/index';

import LolIndex from '../LOL/index';
//图标
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DrawerLayOutComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showContent: this.props.showContent,
            navigator: this.props.navigator,
        };
    }

    render() {
        //抽屉导航的内容
        var layOutView = (
            <View style={drawLayoutStyle.backStyle}>
                <View>
                    <Text style={drawLayoutStyle.title}>导航栏</Text>
                </View>

                <ScrollView>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            this.props.navigator.push({name: 'myMovieList', component: MyMovieList, param: {}});
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="film" size={20} color="#7ce889"/>&nbsp;电影</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            this.props.navigator.push({name: 'newsIndex', component: NewsIndex, param: {}});
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="newspaper-o" size={20} color="#7ce889"/>&nbsp;新闻</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            this.props.navigator.push({name: 'mallIndex', component: MallIndex, param: {}});
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="shopping-cart" size={20} color="#7ce889"/>&nbsp;商城</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            this.props.navigator.push({name:'LolIndex',component:LolIndex,param:{}});
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="gamepad" size={20} color="#7ce889"/>&nbsp;电竞</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            ToastAndroid.show('还没做～～', ToastAndroid.SHORT);
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="music" size={20} color="#7ce889"/>&nbsp;音乐</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            this.props.navigator.push({name: 'testIndex', component: TestIndex, param: {}});
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="book" size={20} color="#7ce889"/>&nbsp;测试</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            ToastAndroid.show('还没做～～', ToastAndroid.SHORT);
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="sticky-note-o" size={20} color="#7ce889"/>&nbsp;日记</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            ToastAndroid.show('还没做～～', ToastAndroid.SHORT);
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="soccer-ball-o" size={20} color="#7ce889"/>&nbsp;体育</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={drawLayoutStyle.itemGround}>
                        <TouchableOpacity onPress={()=> {
                            ToastAndroid.show('还没做～～', ToastAndroid.SHORT);
                        }}>
                            <Text style={drawLayoutStyle.drawItem}><Icon name="newspaper-o" size={20} color="#7ce889"/>&nbsp;小说</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                drawerPosition={DrawerLayoutAndroid.positions.right}
                drawerWidth={150}
                renderNavigationView={()=>layOutView}>
                {this.state.showContent}
            </DrawerLayoutAndroid>
        );
    }
}

const drawLayoutStyle = StyleSheet.create({
    backStyle: {
        flex: 1,
        backgroundColor: '#fff',
        shadowOpacity: 0.5,
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 10,
    },
    titleGround: {
        backgroundColor: '#fcfc9f',
    },
    drawItem: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        padding: 5,
        color: '#fff',
    },
    itemGround: {
        backgroundColor: '#1491e3',
        margin: 15,
        width: 120,
        borderRadius: 5,
    }
});