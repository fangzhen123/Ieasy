/**
 * Created by fangzhen on 2016/11/18.
 */

import PageTitle from './../../common/PageTitle/index';

import SearchInput from './../../common/SearchInput/index';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserInfo from './userInfo';

import {TIER} from './../../config/tier';

/**
 * 搜索历史数据表
 * @type {{name: string, properties: {}}}
 */
const search_history = {
    name:'SearchHistory',
    primaryKey:'keyword',
    properties:{
        keyword:'string',
        search_time:'int',
    }
};

export default class SearchUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            area:[],
            firstSearch:true,
        }
        this._getArea();
        this.realm  = new Realm({schema:[search_history]});
    }


    /**
     * 获取LOL大区列表信息
     * @private
     */
    _getArea = ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_AREA)
            .setMethod('GET')
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{
                this.setState({
                    area:data.data
                });
            })
            .catch((error)=>{
                alert('error:'+error);
            })
    }

    /**
     * 搜索召唤师
     * @param text
     * @private
     */
    _handleClick = (text)=>{
        /**
         * realm本地保存搜索记录
         */
        let isExist = this.realm.objects('SearchHistory').filtered('keyword="'+text+'"').length;
        if(!isExist){
            this.realm.write(()=>{
                let date = new Date();
                this.realm.create('SearchHistory',{keyword:text,search_time:date.getTime()});
            });
        }

        this.setState({
            firstSearch:false,
        });

        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_USER_AREA+'?keyword='+text)
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data) => {
              if(data.code==0){
                 this.setState({
                     dataSource:this.state.dataSource.cloneWithRows(data.data)
                 });
              }else{
                    dataSource:this.state.dataSource.cloneWithRows([])
              }
            })
            .catch((error) => {
                console.log('=> catch: ', error);
            });

    }



    _renderRow = (item)=>{
        var dw = '';
        if(item.tier==255){
            dw = '-';
        }
        else {
            dw = TIER[item.tier].title+TIER[item.tier].queue[item.queue]+'   胜点:'+item.win_point;
        }
        return(
            <View style={{flex:1}}>
                <TouchableOpacity style={styles.row} onPress={()=>{
                        this.props.navigator.push({name:'userInfo',component:UserInfo,param:{...item}});
                }}>
                    <View style={{flex:1}}>
                        <Image source={{uri:URL.LOL_USER_ICON_URL+item.icon_id+'.png'}} style={styles.icon_img}></Image>
                    </View>

                    <View style={{flex:3,flexDirection:'column'}}>

                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.icon_style}>
                                <Icon name="paper-plane" size={10}/>
                            </View>
                            <View>
                                <Text style={styles.name_style}>{item.name}</Text>
                            </View>
                            <View style={styles.level_style}>
                                <Text style={styles.level_title}>{item.level}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.icon_style}>
                                <Icon name="map-marker" size={12}/>
                            </View>
                            <View>
                                <Text style={styles.text_style}>{this.state.area[item.area_id-1].isp}</Text>
                            </View>
                            <View>
                                <Text style={styles.text_style}>   {this.state.area[item.area_id-1].name}</Text>
                            </View>

                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.icon_style}>
                                <Icon name="anchor" size={10}/>
                            </View>

                            <View>
                                <Text style={styles.text_style}>{dw}</Text>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render(){

        if(this.state.firstSearch){
            let search_history = this.realm.objects('SearchHistory').sorted('search_time');
            var viewOut = [];
            for(let i in search_history){
                viewOut.push(
                    <TouchableOpacity key={i} onPress={()=>{
                        this._handleClick(search_history[i].keyword);
                    }}>
                        <View  style={styles.search_history}><Text>{search_history[i].keyword}</Text></View>
                    </TouchableOpacity>
                );
            }

            return(
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <PageTitle navigator={this.props.navigator} title="召唤师查询"/>
                    <SearchInput
                        onClick={(text)=>this._handleClick(text)}
                        placeholder='查询召唤师'
                    />

                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={styles.search_history_tips}>
                            <Text>搜索历史</Text>
                        </View>
                        {viewOut}
                    </View>

                </View>
            );
        }
        else {
            return(
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <PageTitle navigator={this.props.navigator} title="召唤师查询"/>
                    <SearchInput
                        onClick={(text)=>this._handleClick(text)}
                        placeholder='查询召唤师'
                    />
                    <View style={{flex:1}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                        ></ListView>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    row:{
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row',
        margin:2,
        borderColor:'#d4d4d3',
        padding:5,
    },
    level_style:{
        backgroundColor:'#f7ac46',
        width:20,
        height:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
    },
    level_title:{
        fontSize:10,
        color:'#fff',
    },
    icon_img:{
        width:60,
        height:60,
        borderRadius:3
    },
    icon_style:{
        width:10,
        height:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:5
    },
    text_style:{
        fontSize:12,
    },
    name_style:{
        fontWeight:'bold',
    },
    search_history:{
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'#e8dfdd',
        justifyContent:'center',
        paddingLeft:20,
    },
    search_history_tips:{
        alignItems:'center',
        backgroundColor:'#fdf5f5',
        margin:5,
    }
});