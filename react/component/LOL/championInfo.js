/**
 * 英雄详情组件
 * Created by fangzhen on 2016/11/21.
 */
import PageTitle from './../../common/PageTitle/index';
import LoadingPage from './../../common/LoadingPage/index';
import SkinInfo from './championSkinVideo';
import Swiper from 'react-native-swiper';
import HtmlView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ChampionInfo extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[],
            skins:[],
            loaded:false,
        }

        setTimeout(()=>{
            this._getChampionInfo((data)=>this._getChampionSkins(data));
        },200);
    }


    /**
     * 获取英雄详情
     * @private
     */
    _getChampionInfo = (cb)=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_CHAMPION_DETAIL+'?champion_id='+this.props.id)
            .setMethod('GET')
            .setOvertime(30 * 1000)
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{
                //回调
                cb(data.data[0].skins);
               // console.log(data.data[0]);
                this.setState({
                    data:data.data[0],
                    loaded:true
                });
            })
            .catch((error)=>{
                console.log('error:'+error);
            })

    }

    /**
     * 去除左右空格
     * @param s
     * @returns {string|void|*|XML}
     */
    trim = (s)=>{
        return s.replace(/(^\s*)|(\s*$)/g, "");
    }


    /**
     * 获取英雄皮肤信息
     * @param data
     * @private
     */
    _getChampionSkins = (data)=>{
        var url_arr = [];
        for(var i in data){
            var pic_name = this.props.id+'-'+data[i].id+'.jpg';
            url_arr.push({'id':data[i].id,'url':URL.LOL_CHAMPION__SKIN_URL+pic_name});
        }
        this.setState({
            skins:url_arr,
        });
    }

    _renderImg = ()=>{
        var imageViews=[];
        /**
         * 坑爹的作用域
         */
        for(let i in this.state.skins){
            imageViews.push(
                    <View key={i} style={styles.slide}>
                        <TouchableOpacity style={{flex:1}} onPress={()=>{
                            this.props.navigator.push({name:'SkinInfo',component:SkinInfo,param:{'url':this.state.data.skins[i].displayUrl,'skins_name':this.state.data.skins[i].name}});
                        }}>
                            <Image
                                resizeMode='stretch'
                                key={i}
                                style={styles.image}
                                source={{uri:this.state.skins[i].url}}
                            />
                        </TouchableOpacity>
                    </View>
            );
        }
        return imageViews;
    }

    render(){
        if(!this.state.loaded){
            return <LoadingPage/>;
        }
        else {
            return(
                <View style={{flex:1,backgroundColor:'#fff'}}>
                    <PageTitle title="英雄详情" navigator={this.props.navigator}/>
                    <View>
                        <Swiper height={200}
                                loop={true}
                                index={0}
                                autoplay={true}
                                horizontal={true}
                                showsButtons={true}
                        >
                            {this._renderImg()}
                        </Swiper>
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView style={{flex:1}}>
                            <View style={{flex:1,flexDirection:'row',marginTop:5}}>

                                <View style={{flex:3,flexDirection:'row'}}>
                                    <View>
                                        <Image source={{uri:'http://cdn.tgp.qq.com/pallas/images/champions_id/'+this.props.id+'.png'}} style={styles.img}/>
                                    </View>

                                    <View style={styles.title}>
                                        <Text>{this.state.data.name}</Text>
                                        <Text style={styles.small_txt}>{this.state.data.title}</Text>
                                    </View>
                                </View>

                                <View style={{flex:3,flexDirection:'column',marginRight:10}}>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={styles.small_txt}>攻</Text>
                                        </View>

                                        <View style={{flex:8}}>
                                            <ProgressBarAndroid color="#f95a3a" styleAttr="Horizontal" progress={this.state.data.info.attack/10} indeterminate={false}/>
                                        </View>
                                    </View>

                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={styles.small_txt}>法</Text>
                                        </View>

                                        <View style={{flex:8}}>
                                            <ProgressBarAndroid color="#2ea2fd" styleAttr="Horizontal" progress={this.state.data.info.magic/10} indeterminate={false}/>
                                        </View>
                                    </View>

                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={styles.small_txt}>防</Text>
                                        </View>

                                        <View style={{flex:8}}>
                                            <ProgressBarAndroid color="#6aa548" styleAttr="Horizontal" progress={this.state.data.info.defense/10} indeterminate={false}/>
                                        </View>
                                    </View>

                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={styles.small_txt}>难</Text>
                                        </View>

                                        <View style={{flex:8}}>
                                            <ProgressBarAndroid color="#fb800c" styleAttr="Horizontal" progress={this.state.data.info.difficulty/10} indeterminate={false}/>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{flex:1}}>

                                <View style={{flex:1,flexDirection:'row',margin:5}}>
                                    <Icon name="legal" size={20}/>
                                    <Text style={{marginLeft:3,fontWeight:'bold'}}>技能介绍</Text>
                                </View>

                                <View style={{flex:1,margin:5}}>

                                    <View style={styles.spell_view}>
                                        <Text>{this.state.data.passive.name}</Text>
                                        <View>
                                            <Text>{this.state.data.passive.description}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.spell_view}>
                                        <Text>{this.state.data.spells[0].name}</Text>
                                        <View>
                                            <HtmlView value={this.state.data.spells[0].tooltip}/>
                                        </View>
                                    </View>

                                    <View style={styles.spell_view}>
                                        <Text>{this.state.data.spells[1].name}</Text>
                                        <View>
                                            <HtmlView value={this.state.data.spells[1].tooltip}/>
                                        </View>
                                    </View>

                                    <View style={styles.spell_view}>
                                        <Text>{this.state.data.spells[2].name}</Text>
                                        <View>
                                            <HtmlView value={this.state.data.spells[2].tooltip}/>
                                        </View>
                                    </View>

                                    <View style={styles.spell_view}>
                                        <Text>{this.state.data.spells[3].name}</Text>
                                        <View>
                                            <HtmlView value={this.state.data.spells[3].tooltip}/>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            );
        }


    }
}

var styles = StyleSheet.create({
    slide:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        flex: 1
    },
    img:{
        width:80,
        height:80,
        margin:5,
    },
    title:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around'
    },
    small_txt:{
        fontSize:12,
        color:'#988f8e'
    },
    spell_title:{

    },
    spell_view:{
        marginTop:10,
        backgroundColor:'#d4d1d1',
        padding:10,
        borderRadius:5
    }
});