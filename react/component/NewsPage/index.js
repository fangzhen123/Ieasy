/**
 * 新闻首页
 * Created by fangzhen on 16/11/8.
 */

import NewsInfo from './NewsInfo';
import TopTab from './TopTab';

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            isRefreshing:false,
            navigator:this.props.navigator,
            loaded:false,
            tabType:'top',
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
        };

        /**
         * 延迟执行
         */
        // InteractionManager.runAfterInteractions(()=>{
        //
        // });

        /**
         * 300ms后请求数据,保证UI切换流畅
         */
        setTimeout(()=>{
            this._getNewsData(()=>{
                this.setState({
                    loaded:true,
                });
            });
        },300);

    }

    /**
     * 获取新闻数据
     * @param cb
     * @private
     */
    _getNewsData(cb){

        var url = URL.JUHE_NEWS+'?key='+KEY.JUHE_API_KEY+'&type='+this.state.tabType;
        fetch(url,{
            method:'GET',
        }).then((res)=>res.json())
            .then((data)=>{
                if(data.reason=='成功的返回'){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(data.result.data),
                    },()=>cb());
                }
                else {
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows([]),
                    },()=>cb());
                }
            })
            .catch((error)=>{
                console.log(error.message);
            });
    }


    /**
     * 下拉刷新操作
     * @private
     */
    _onRefresh = ()=>{
        console.log('3');
        this.setState({
            isRefreshing:true,
        });

        this._getNewsData(()=>{
            this.setState({
                isRefreshing:false,
            });
        });
    }

    /**
     * 显示加载页面
     * @returns {XML}
     * @private
     */
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


    /**
     * 设置tab选中的值
     * @param value
     * @private
     */
    _getTabType = (value)=>{
        console.log('2');
        this.setState({
            tabType:value,
            isRefreshing:true,
        },function(){
            this._onRefresh()
        });
    }



    _renderNews =(news)=>{
        return (
            <TouchableOpacity  onPress={()=> {
                this.props.navigator.push({name:'newsInfo',component:NewsInfo,param:{url:news.url}});
            }}>
                <View style={{alignItems: 'center', backgroundColor: '#fff'}}>

                    <View style={{flexDirection: 'row', margin: 5, borderBottomWidth: 1, borderBottomColor: '#cec8c7'}}>
                        <View style={{flex: 3, justifyContent: 'space-between', marginBottom: 5}}>

                            <View>
                                <Text style={{fontSize: 20}}>{news.title}</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                                <View style={{flex: 1}}>
                                    <Text style={styles.small_title}>{news.author_name}</Text>
                                </View>

                                <View style={{flex: 1}}>
                                    <Text style={styles.small_title}>{news.date}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 2, margin: 10}}>
                            <Image source={{uri: news.thumbnail_pic_s03}} style={{width: 200, height: 100}}/>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }


    render(){

        if(!this.state.loaded){
            return this._renderLoadingView();
        }

        return(
            <View style={{flex:1}}>
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
                    <TopTab selectedValue={this._getTabType}/>
                </View>



                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderNews}
                        initialListSize={1}
                        pageSize={2}

                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                                progressBackgroundColor="#ffffff"
                            />
                        }
                    >

                    </ListView>
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