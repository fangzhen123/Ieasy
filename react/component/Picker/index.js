/**
 * Created by fangzhen on 2016/12/21.
 */
import {Picker} from 'react-native';


export default class PickDemo extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected_value:'',
        };
    }



    render(){
        return (
            <View>
                <Picker
                    prompt="请选择"
                    mode="dropdown"
                    selectedValue={this.state.selected_value}
                    onValueChange={(v)=>{
                        this.setState({
                            selected_value:v
                        });
                    }}
                    style={{margin:10,width:100,borderColor:'red',borderWidth:1}}
                >
                    <Picker.Item label="1" value="1"/>
                    <Picker.Item label="2" value="2"/>
                    <Picker.Item label="2" value="2"/>
                    <Picker.Item label="2" value="2"/>
                </Picker>
            </View>
        );
    }
}