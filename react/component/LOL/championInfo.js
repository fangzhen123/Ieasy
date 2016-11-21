/**
 * 英雄详情组件
 * Created by fangzhen on 2016/11/21.
 */
import PageTitle from './../../common/PageTitle/index';
import LoadingPage from './../../common/LoadingPage/index';
import Swiper from 'react-native-swiper';

export default class ChampionInfo extends Component{

    constructor(props){
        super(props);

        this.state = {
            data:[],
            skins:[],
            loaded:false,
        }

        this._getChampionInfo((data)=>this._getChampionSkins(data));

        setTimeout(()=>{
            console.log(this.state.skins);
        },3000);
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
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{
                //回调
                cb(data.data[0].skins);
                console.log(data.data[0]);
                this.setState({
                    data:data.data[0],
                    loaded:true
                });
            })
            .catch((error)=>{
                alert('error:'+error);
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


    _getChampionSkins = (data)=>{

        let fetchUtil = new FetchUtil();
        for(var i in data){
            fetchUtil.init()
                .setUrl(URL.LOL_CHAMPION_SKIN+'?champion_id='+this.props.id+'&skinid='+data[i].id)
                .setMethod('GET')
                .setHeader({
                    'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
                })
                .dofetch()
                .then((data)=>{
                    var url = this.trim(data.data[0].return);
                    this.setState({
                        skins:this.state.skins.concat(url),
                    });
                })
                .catch((error)=>{
                    alert('error:'+error);
                })
        }



    }

    renderImg(){
        var imageViews=[];
        for(var i=0;i<this.state.skins.length;i++){
            imageViews.push(
                <Image
                    key={i}
                    style={{flex:1}}
                    source={{uri:this.state.skins[i]}}
                />
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
                    <View>
                        <Swiper height={200}
                                loop={true}
                            // showsButtons={true}
                                index={0}
                                autoplay={true}
                                horizontal={false}
                        >
                            {this.renderImg()}
                        </Swiper>
                    </View>
                    <View>
                        <Text>{this.state.data.name}</Text>
                        <Text>{this.state.data.title}</Text>
                        <Text>{this.state.data.spells[0].name}</Text>
                        <Text>{this.state.data.spells[0].tooltip}</Text>
                        <Text>{this.state.data.spells[1].name}</Text>
                        <Text>{this.state.data.spells[1].tooltip}</Text>
                        <Text>{this.state.data.spells[2].name}</Text>
                        <Text>{this.state.data.spells[2].tooltip}</Text>
                        <Text>{this.state.data.spells[3].name}</Text>
                        <Text>{this.state.data.spells[3].tooltip}</Text>

                    </View>
                </View>

            );
        }


    }
}