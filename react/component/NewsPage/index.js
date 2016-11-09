/**
 * 新闻首页
 * Created by fangzhen on 16/11/8.
 */

import NewsInfo from './NewsInfo';

var keyword = ['篮球','足球','羽毛球','乒乓球','游泳','排球','高尔夫','网球','短跑','詹姆斯','加内特','科比'];

var type = ['top','shehui','guonei','guoji','yule','tiyu','junshi','keji','caijing','shishang'];

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            isRefreshing:false,
            navigator:this.props.navigator,
            loaded:false,
        };
        this._getNewsData((data)=>{this.setState({
            data:data,
            loaded:true,
        });})
    }


    /**
     * 获取新闻数据
     * @param cb
     * @private
     */
    _getNewsData(cb){

        var s = type[Math.floor((Math.random()*type.length))];

        // var url = URL.BAIDU_NEWS+'?num=10&page=1&word='+s;
        var url = URL.JUHE_NEWS+'?key='+KEY.JUHE_API_KEY+'&type='+s;

        fetch(url,{
            method:'GET',
        }).then((res)=>res.json())
            .then((data)=>{
                if(data.reason=='成功的返回'){
                    cb(data.result.data);
                }else cb([]);
            })
            .catch((error)=>{
                console.log(error.message);
            });
    }


    _onRefresh = ()=>{
        this.setState({
            isRefreshing:true,
        });

        this._getNewsData((data)=>this.setState({
            data:data,
            isRefreshing:false,
        }));
    }

    _renderLoadingView() {
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
                    加载中...
                </Text>
            </View>
        );
    }


    render(){

        if(!this.state.loaded){
            return this._renderLoadingView();
        }

        const newList = this.state.data.map((item,i)=>
            <TouchableOpacity onPress={()=> {
                this.props.navigator.push({name:'newsInfo',component:NewsInfo,param:{url:item.url}});
            }}>
                <View key={i} style={{alignItems: 'center', backgroundColor: '#fff'}}>

                    <View style={{flexDirection: 'row', margin: 5, borderBottomWidth: 1, borderBottomColor: '#cec8c7'}}>
                        <View style={{flex: 3, justifyContent: 'space-between', marginBottom: 5}}>

                            <View>
                                <Text style={{fontSize: 20}}>{item.title}</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.small_title}>{item.author_name}</Text>
                                </View>

                                <View style={{flex: 1}}>
                                    <Text style={styles.small_title}>{item.date}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 2, margin: 10}}>
                            <Image source={{uri: item.thumbnail_pic_s03}} style={{width: 200, height: 100}}/>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );


        return(
            <View>
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
                        <Text style={styles.title}>今日头条</Text>
                    </View>
                </View>

                <View>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }>
                        {newList}
                    </ScrollView>
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
    small_title:{
        fontSize:10,
    },
    title_background:{
        backgroundColor:'#ee7c66',
        height:56,
        justifyContent:'center',
        alignItems:'center'
    }
});