/**
 * Created by fangzhen on 2016/11/10.
 */
var tabItem = [
    {key:'头条',value:'top'},
    {key:'体育',value:'tiyu'},
    {key:'科技',value:'keji'},
    {key:'社会',value:'shehui'},
    {key:'娱乐',value:'yule'},
    {key:'国际',value:'guoji'},
    {key:'国内',value:'guonei'},
    {key:'军事',value:'junshi'},
    {key:'财经',value:'caijing'},
    {key:'时尚',value:'shishang'}
];

export default class TopTab extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedItem:'头条',
        }
    }

    render(){
        var tabView = tabItem.map((item,i)=>
            <TouchableOpacity
                key={i}
                onPress={()=>{
                    console.log('1');
                    this.props.selectedValue(item.value);
                    this.setState({
                        selectedItem:item.key,
                    });
                }}>

                <View style={(item.key==this.state.selectedItem)?styles.tabSelected:styles.tab}>
                    <Text style={(item.key==this.state.selectedItem)?styles.tabItemSelected:styles.tabItem}>{item.key}</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
                {tabView}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
   tab:{
       width:60,
       height:40,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'#f4e6e4',
   },
    tabSelected:{
        width:60,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:5,
    },
    tabItem:{
        fontSize:15,
    },
    tabItemSelected:{
        fontSize:15,
        color:'#f07c65',
    }
});