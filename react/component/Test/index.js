/**
 * Created by fangzhen on 2016/11/15.
 */

import GiftedChatComponent from './../GiftedChat/index';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class TestComponent extends Component{

    render(){
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigator.jumpBack();
                    }}>
                        <Icon name="arrow-left" size={20} color="green"/>
                    </TouchableOpacity>
                </View>
                <GiftedChatComponent/>
            </View>
        );
    }
}