/**
 * 新闻首页
 * Created by fangzhen on 16/11/8.
 */

var keyword = ['篮球','足球','羽毛球','乒乓球','游泳','排球','高尔夫','网球','短跑','詹姆斯','加内特','科比'];

var type = ['top','shehui','guonei','guoji','yule','tiyu','junshi','keji','caijing','shishang'];

export default class NewsIndex extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            isRefreshing:false,
        };
        this._getNewsData((data)=>{this.setState({
            data:data
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




    render(){

        const newList = this.state.data.map((item,i)=>
            <View key={i} style={{alignItems:'center'}}>
                <View style={{flexDirection:'row',margin:5,borderBottomWidth:1,borderBottomColor:'#cec8c7'}}>
                    <View style={{flex:3,justifyContent:'space-between',marginBottom:5}}>

                        <View>
                            <Text style={{fontSize:20}}>{item.title}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.small_title}>{item.author_name}</Text>
                            </View>

                            <View style={{flex:1}}>
                                <Text style={styles.small_title}>{item.date}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:2,margin:10}}>
                        <Image source={{uri:item.thumbnail_pic_s03}} style={{width:200,height:100}}/>
                    </View>
                </View>
            </View>
        );


        return(
            <View>
                <View style={styles.title_background}>
                    <Text style={styles.title}>今日头条</Text>
                </View>

                <View>
                    <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
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
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
    },
    small_title:{
        fontSize:8,
    },
    title_background:{
        backgroundColor:'#ee7c66',
        height:40,
        justifyContent:'center'
    }
});