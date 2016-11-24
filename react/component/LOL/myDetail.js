
import PageTitle from './../../common/PageTitle/index';

import ModalDropdown from 'react-native-modal-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';


var Modal   = require('react-native-modalbox');


export default class Demo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            swipeToClose:true,
            selected_title:'选择大区',
            selected_area_id:'',
            area_list:[],
        };

        this._getAreaList();

        setTimeout(()=>{
            this.openModal();
        },500);
    }

    openModal = ()=>{
        this.refs.modal.open();
    }

    closeModal =()=>{
        this.refs.modal.close();
    }


    /**
     * 获取LOL大区列表
     * @private
     */
    _getAreaList = ()=>{
        let fetchUtil = new FetchUtil();
        fetchUtil.init()
            .setUrl(URL.LOL_AREA)
            .setMethod('GET')
            .setHeader({
                'DAIWAN-API-TOKEN':KEY.LOL_API_KEY
            })
            .dofetch()
            .then((data)=>{
                let area_arr = [];

                for(let item of data.data){
                    area_arr.push(item.name);
                }

                this.setState({
                    area_list:area_arr,
                });
            })
            .catch((error)=>{
                alert('error:'+error);
            })
    }

    /**
     * 选中大区
     * @param index
     * @param value
     * @private
     */
    _handleSelected=(index,value)=>{
        this.setState({
            selected_title:value,
            selected_area_id:index,
        });
    }

    _handleSure = ()=>{
        if(this.state.selected_area_id&&this.state.selected_title){
            this.refs.modal.close();
        }
        else {
            ToastAndroid.show('请选择ID和大区',ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <PageTitle title="我的账户" navigator={this.props.navigator}/>
                <View style={{flex:1}}>
                    <Modal
                        position='center'
                        style={styles.modal}
                        ref={"modal"}
                        swipeToClose={this.state.swipeToClose}
                        onOpened={this.onOpen}
                        onClosingState={this.onClosingState}
                        backdropOpacity={0.1}
                        backdropContent={<Text></Text>}
                        animationDuration={800}
                        backdropPressToClose={false}
                        entry="top"
                    >
                        <View style={{flex:1}}>

                            <View style={{flexDirection:'column',height:130}}>

                                <View style={{flex:1,margin:5}}>
                                    <Kohana
                                        style={{ backgroundColor: '#f9f5ed',borderWidth:1,borderRadius:5,borderColor:'#d4d4d3'}}
                                        label={'游戏ID'}
                                        iconClass={FontAwesome}
                                        iconName={'anchor'}
                                        iconColor={'#f4d29a'}
                                        labelStyle={{ color: '#91627b' }}
                                        inputStyle={{ color: '#91627b',fontSize:15}}
                                    />
                                </View>

                                <View style={{flex:1,margin:5}}>
                                    <ModalDropdown
                                        options={this.state.area_list}
                                        dropdownStyle={{backgroundColor:'#f9f5ed',flex:1,width:SceneWidth-10,alignItems:'center',justifyContent:'center'}}
                                        onSelect={this._handleSelected}
                                        textStyle={{fontSize:20}}
                                    >
                                        <View style={{backgroundColor: '#f9f5ed',borderWidth:1,borderRadius:5,borderColor:'#d4d4d3',height:50,justifyContent:'center'}}>
                                            <Text style={{color:'#91627b',fontSize:18,fontWeight:'bold',marginLeft:15}}>{this.state.selected_title}</Text>
                                        </View>
                                    </ModalDropdown>
                                </View>

                            </View>

                            <View style={{alignItems:'center',margin:10}}>
                                <View style={{width:300,height:50,alignItems:'center',backgroundColor:'#6bbb58',justifyContent:'center',borderRadius:10}}>
                                    <TouchableOpacity onPress={()=>{this._handleSure()}}><Text style={{fontSize:25,color:'#fff'}}>绑定</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Modal>
                </View>
            </View>
        );
    }


}
var styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        height:200,
        borderRadius:5,
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        fontSize: 22
    }

});