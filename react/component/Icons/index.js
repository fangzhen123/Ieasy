/**
 * Created by fangzhen on 16/11/14.
 */


/**
 * 可用的图标库
 * Entypo
 * EvilIcons
 * FontAwesome
 * Foundation
 * generate-icon
 * generate-material-icons
 * Ionicons
 * MaterialIcons
 * Octicons
 * RNIMigration
 * RNVectorIcons
 * SimpleLineIcons
 * Zocial
 */


import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = (<Icon name="weixin" size={30} color="green" />)


export default class IconComponent extends Component{

    render(){
        return(
            <View>
                {myIcon}
            </View>
        );
    }
}