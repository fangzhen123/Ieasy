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
        data: []
    }

    render(){

        const viewout = this.state.data.map((item, i) =>
            <TouchableOpacity key={i} onPress={()=>{
            }}>
                <View style={noteStyles.row}>
                    <Text>{item.value}</Text>
                    <Text style={{textAlign: 'right', fontSize: 10}}>{item.key}</Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View>{viewout}</View>
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
                callback(data);
            });
        });
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