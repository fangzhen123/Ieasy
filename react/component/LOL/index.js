/**
 * Created by fangzhen on 2016/11/18.
 */

import PageTitle from './../PageTitle/index';

import SearchInput from './../SearchInput/index';

export default class LolIndex extends Component{

    constructor(props){
        super(props);
    }


    _handleClick = (text)=>{
        alert(text);
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <PageTitle navigator={this.props.navigator} title="召唤师查询"/>
                <SearchInput
                    onClick={(text)=>this._handleClick(text)}
                    placeholder='查询召唤师'
                />
            </View>
        );
    }
}
