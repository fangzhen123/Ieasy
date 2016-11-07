/**
 * 便签记录组件
 * Created by fangzhen on 2016/11/4.
 */

import {
    AsyncStorage,
} from 'react-native';

export default class NoteComponent extends Component{

    constructor(props){
        super(props);
        //放在state中的数据，一旦有变化，都会更新Dom
        this._getAllNoteItems(data => this.setState({data}));
    }
    state = {
        data: [],
        textInput:<Text></Text>,
        inputContent:'',
        btnText:
            <View
                style={{
                    alignItems:'center',
                    backgroundColor:'#37b44a',
                    borderRadius:5,
                    height:30,
                    justifyContent:'center',
                    margin:10,
                    width:100
                }}>
                <Text style={{color:'#fff'}}>添加</Text>
            </View>,
    }

    render(){

        const viewout = this.state.data.map((item, i) =>
            <TouchableOpacity key={i} onLongPress={()=>this._handleRemoveAction(item.key)}>
                <View style={noteStyles.row}>
                    <Text>{item.value}</Text>
                    <Text style={{textAlign: 'right', fontSize: 10}}>{item.key}</Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={()=>{

                        this.setState({
                            textInput:
                                <View style={noteStyles.row}>
                                    <TextInput
                                        onChangeText={(text)=>this._handleInput(text)}
                                        onBlur={()=>this._handleMissBlur()}
                                        multiline={true}
                                        placeholder='想要记录点什么呢~'
                                    ></TextInput>
                                </View>,
                            btnText:
                                <View style={{
                                    alignItems:'center',
                                    backgroundColor:'#eaa04d',
                                    borderRadius:5,
                                    height:30,
                                    justifyContent:'center',
                                    margin:10,
                                    width:100
                                }}>
                                    <Text style={{color:'#fff'}}>保存</Text>
                                </View>,
                        });
                    }}>
                        <View style={{alignItems:'center'}}>{this.state.btnText}</View>

                    </TouchableOpacity>


                </View>
                <View>
                    {this.state.textInput}
                </View>
                <View>{viewout}</View>
            </View>
        );
    }


    /**
     * 保存便签内容
     * @param key
     * @param value
     * @private
     */
    _setNoteItem = (key,value)=>{
        AsyncStorage.setItem(key,value);
    }

    /**
     * 获取便签内容
     * @param key
     * @private
     */
    _getNoteItem= (key)=>{
        AsyncStorage.getItem(key).then(
            (result)=>{
                //拿到便签的内容

            }
        ).catch((error)=>{
            ToastAndroid.show(error.message,ToastAndroid.SHORT);
        });
    }

    /**
     * 删除便签内容
     * @param key
     * @param callback
     * @private
     */
    _removeItem = (key,callback)=>{
        AsyncStorage.removeItem(key).then(
          callback()
        ).catch(
            (error)=>ToastAndroid.show(error.message,ToastAndroid.SHORT)
        ).done();
    }

    /**
     * 获取所有的便签内容
     * @private
     */
    _getAllNoteItems = (callback)=>{
        AsyncStorage.getAllKeys((err,keys)=>{
            AsyncStorage.multiGet(keys,(err,stores)=>{
                var data = [];
                stores.map((result,i,store)=>{
                    data.push({key:store[i][0],value:store[i][1]});
                });
                //倒序排列
                data.reverse();
                callback(data);
            });
        });
    }

    /**
     * 处理用户输入
     * @param text
     * @private
     */
    _handleInput = (text)=>{
        this.setState(
            {
                inputContent:text,
            }
        );
    }

    /**
     * 处理输入框失去焦点
     * @param key
     * @private
     */
    _handleMissBlur = ()=>{
        var date = new Date();
        var nowYear      = date.getFullYear();
        var nowMonth     = date.getMonth()+1;
        var nowDay       = date.getDay()<10?('0'+date.getDay()):date.getDay();
        var nowHour      = date.getHours()<10?('0'+date.getHours()):date.getHours();
        var nowMinute    = date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes();
        var nowSecond    = date.getSeconds()<10?('0'+date.getSeconds()):date.getSeconds();
        var nowDateTime  = nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute+':'+nowSecond;

        if(this.state.inputContent){
            this._setNoteItem(nowDateTime,this.state.inputContent);
        }

        this.setState({
            textInput:<Text></Text>,
            btnText:
                <View style={{
                    alignItems:'center',
                    backgroundColor:'#37b44a',
                    borderRadius:5,
                    height:30,
                    justifyContent:'center',
                    margin:10,
                    width:100
                }}>
                    <Text style={{color:'#fff'}}>添加</Text>
                </View>,
            inputContent:'',
        });
        this._getAllNoteItems(data => this.setState({data}));
    }

    _handleRemoveAction = (key)=>{
        Alert.alert('温馨提醒','确认删除该便签吗?',[
            {text:'取消',onPress:()=>ToastAndroid.show('取消了删除',ToastAndroid.SHORT)},
            {text:'确定',onPress:()=>{
                this._removeItem(key,()=>{
                    ToastAndroid.show('删除成功',ToastAndroid.SHORT);
                    //更新数据
                    this._getAllNoteItems(data => this.setState({data}));
                });
            }}
        ]);
    }
}

const noteStyles = StyleSheet.create({
    row: {
        padding: 10,
        margin: 10,
        backgroundColor: '#eee',
        borderRadius:5,
    },
});