/**
 * 定位模块
 * Created by fangzhen on 2016/11/11.
 */

export default class GeoLocationComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            initialPosition:'未知',
        };

    }
    componentDidMount() {
        console.log('112');
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                console.log(position);
                var initialPosition = eval('('+JSON.stringify(position)+')');
                console.log(initialPosition);
                var url = URL.POSITION_INFO+'&lat='+initialPosition.coords.latitude+'&lng='+initialPosition.coords.longitude;

                fetch(url,{
                    method:'GET',
                })
                    .then((res)=>res.json())
                    .then((responseData) => {
                        this.setState({
                            initialPosition:responseData.result[0].address,
                        });
                    });
            },
            (error)=>{
                //alert(JSON.stringify(error));
            },
            {
                enableHighAccuracy:true,
                timeout:200000,
                maximumAge:1000,
            }
        );

    }

    render(){
        return (
            <View>
                <Text>所在位置:{this.state.initialPosition}</Text>
            </View>
        );
    }
    // componentWillUnMount() {
    //     navigator.geolocation.clearWatch();
    // }
}