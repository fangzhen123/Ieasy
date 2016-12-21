/**
 * Created by fangzhen on 2016/12/21.
 */
import {Switch} from 'react-native';

export default class SwitchDemo extends Component{

    constructor(props){
        super(props);
        this.state = {
            switch_value:false,
        };
    }


    render(){
        return (
            <View>
                <Switch
                    onValueChange={(value)=>{
                        this.setState({
                            switch_value:value
                        });
                }}
                    value={this.state.switch_value}
                    style={{margin:10}}
                    disabled={false}
                ></Switch>
            </View>
        );
    }
}