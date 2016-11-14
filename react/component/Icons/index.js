/**
 * Created by fangzhen on 16/11/14.
 */

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)


export default class IconComponent extends Component{

    render(){
        return(
            <View>
                {myIcon}
                <View>
                    <Icon name="movies"/>
                </View>
            </View>
        );
    }
}