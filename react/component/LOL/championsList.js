/**
 * 英雄列表
 * Created by fangzhen on 2016/11/21.
 */

import ChampionInfo from './championInfo';
import LoadingPage from './../../common/LoadingPage/index';

export default class ChampionList extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            loaded:false,
        }
        setTimeout(function () {
            this._getData();
        }.bind(this),100);

    }

    /**
     * 获取英雄列表数据
     * @private
     */
    _getData(){
        fetch(URL.LOL_CHAMPION,{
            method:'GET',
            headers:{
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            }
        }).then((res)=>res.json())
            .then((data)=>{
                //需要将数据分组
                    var res = [];
                    for(var i in data.data){
                        var temp = [];
                        if(data.data[i*2+1]){
                            temp.push(data.data[i*2],data.data[i*2+1]);
                            res.push(temp);
                        }else if(data.data[i*2]){
                            temp.push(data.data[i*2]);
                            res.push(temp);
                        }
                    }
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(res),
                        loaded:true,
                    });

            })
            .catch((error)=>{
                console.log(error.message);
            });
    }


    _renderChampionList = (item)=>{
        if(item[1]){
            var viewOut = (
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({name:'championInfo',component:ChampionInfo,param:{id:item[0].id,navigator:this.props.navigator}});
                        }}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View>
                                    <Image source={{uri:'http://cdn.tgp.qq.com/pallas/images/champions_id/'+item[0].id+'.png'}} style={styles.img}/>
                                </View>

                                <View style={styles.title}>
                                    <Text>{item[0].title}</Text>
                                    <Text style={styles.small_txt}>{item[0].cname}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({name:'championInfo',component:ChampionInfo,param:{id:item[1].id,navigator:this.props.navigator}});
                        }}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View>
                                    <Image source={{uri:'http://cdn.tgp.qq.com/pallas/images/champions_id/'+item[1].id+'.png'}} style={styles.img}/>
                                </View>

                                <View style={styles.title}>
                                    <Text>{item[1].title}</Text>
                                    <Text style={styles.small_txt}>{item[1].cname}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        else {
            var viewOut = (
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigator.push({name:'championInfo',component:ChampionInfo,param:{id:item[0].id,navigator:this.props.navigator}});
                        }}>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <View>
                                    <Image source={{uri:'http://cdn.tgp.qq.com/pallas/images/champions_id/'+item[0].id+'.png'}} style={styles.img}/>
                                </View>

                                <View style={styles.title}>
                                    <Text>{item[0].title}</Text>
                                    <Text style={styles.small_txt}>{item[0].cname}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return(
            <View>
                {viewOut}
            </View>
        );

    }

    render(){

        if(!this.state.loaded){
            return <LoadingPage title="英雄加载中..."/>
        }
        else {
            return (
                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderChampionList}
                        initialListSize={20}
                        pageSize={20}>
                    </ListView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    img:{
        width:60,
        height:60,
        margin:10,
    },
    title:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around'
    },
    small_txt:{
        fontSize:12,
        color:'#988f8e'
    }
});