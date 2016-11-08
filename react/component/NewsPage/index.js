/**
 * 新闻首页
 * Created by fangzhen on 16/11/8.
 */

var keyword = ['篮球','足球','羽毛球','乒乓球','游泳','排球','高尔夫','网球','短跑','詹姆斯','加内特','科比'];

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

        var s = keyword[Math.floor((Math.random()*keyword.length))];

        var url = URL.BAIDU_NEWS+'?num=10&page=1&word='+s;
        fetch(url,{
            method:'GET',
            headers:{
                'apikey':KEY.BAIDU_API_KEY,
            },
        }).then((res)=>res.json())
            .then((data)=>{
                if(data.code==200){
                    cb(data.newslist);
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
            <View style={{alignItems:'center'}}>
                <Image source={{uri:item.picUrl}} style={{width:400,height:200}}/>
                <Text style={{fontSize:15,}}>{item.title}</Text>
            </View>
        );


        return(
            <View>
                <Text style={styles.title}>新闻页</Text>
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
    },
});