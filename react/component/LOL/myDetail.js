
import PageTitle from './../../common/PageTitle/index';

import ModalDropdown from 'react-native-modal-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Kohana } from 'react-native-textinput-effects';


var Modal   = require('react-native-modalbox');

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

export default class Demo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            swipeToClose:true,
        };

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
                                    <ModalDropdown options={DEMO_OPTIONS_1}  dropdownStyle={{backgroundColor:'#f9f5ed',width:200}} >
                                        <View style={{backgroundColor: '#f9f5ed',borderWidth:1,borderRadius:5,borderColor:'#d4d4d3',height:50,justifyContent:'center'}}>
                                            <Text style={{color:'#91627b',fontSize:18,fontWeight:'bold',marginLeft:15}}>选择大区</Text>
                                        </View>
                                    </ModalDropdown>
                                </View>

                            </View>


                            <View>
                                <TouchableOpacity onPress={()=>{this.closeModal()}} style={styles.btn}><Text>确定</Text></TouchableOpacity>
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