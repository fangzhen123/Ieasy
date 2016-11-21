/**
 * Created by fangzhen on 2016/11/18.
 */

import PageTitle from './../PageTitle/index';

import SearchInput from './../SearchInput/index';

import {TIER} from './../../config/tier';

export default class LolIndex extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            area:[]
        }

        this._getArea();
        console.log(TIER);
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


    _getUserIcon = (id)=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_USER_ICON+'?iconid='+id)
            .setMethod('GET')
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{

            })
            .catch((error)=>{
                alert('error:'+error);
            })
    }


    _handleClick = (text)=>{

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
            dw = '无';
        }
        else {
            dw = TIER[item.tier].title+TIER[item.tier].queue[item.queue]+'   胜点:'+item.win_point;
        }
        return(
            <View style={styles.row}>

                <View style={{flex:1}}>

                </View>

                <View style={{flex:3,flexDirection:'column'}}>
                    <View >
                        <Text>{item.name}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>{this.state.area[item.area_id-1].isp}   {this.state.area[item.area_id-1].name}</Text>
                        <Text>{item.level}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text>{dw}</Text>
                    </View>

                </View>
            </View>
        );
    }

    render(){
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

const styles = StyleSheet.create({
    row:{
        borderBottomWidth:1,
        flex:1,
        flexDirection:'row'
    }
});