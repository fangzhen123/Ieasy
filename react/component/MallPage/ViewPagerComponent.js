/**
 * Created by fangzhen on 2016/11/8.
 */

var titles_first_data=["美食","电影","酒店","KTV","外卖","优惠买单","周边游","休闲娱乐","今日新单","丽人"];
var titles_second_data=["购物","美容美发","生活服务","旅游","汽车服务","服装","小吃快餐","经典门票","境外游","全部分类"];


export default class ViewPagerComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            page:1,
        };
    }

    /**
     * @param e
     * @private
     */
    _onPageSelected = (e)=>{
        this.setState({
            page:e.nativeEvent.position+1,
        });
    }
    render(){
        return (
            <View style={{backgroundColor:'#fff'}}>
                <ViewPagerAndroid style={styles.pageStyle} initialPage={0}  onPageSelected={this._onPageSelected}>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[0], ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_0.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[0]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>

                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[1],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_1.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[1]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[2],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_2.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[2]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[3],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_3.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[3]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[4],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_4.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[4]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flexDirection:'row',marginTop:10}}>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[5],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_5.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[5]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[6],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_6.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[6]}</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[7],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_7.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[7]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[8],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_8.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[8]}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width:70}}>
                                <TouchableOpacity onPress={()=>{
                                    ToastAndroid.show(titles_first_data[9],ToastAndroid.SHORT);
                                }}>
                                    <Image source={require('./../../../static/images/viewPager/ic_category_9.png')} style={styles.imageStyle} />
                                    <Text style={styles.textStyle}>{titles_first_data[9]}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_10.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[0]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_11.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[1]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_12.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[2]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_13.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[3]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_14.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[4]}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_19.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[5]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_16.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[6]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_17.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[7]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_18.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[8]}</Text>
                            </View>
                            <View style={{width:70}}>
                                <Image source={require('./../../../static/images/viewPager/ic_category_15.png')} style={styles.imageStyle} />
                                <Text style={styles.textStyle}>{titles_second_data[9]}</Text>
                            </View>
                        </View>
                    </View>

                </ViewPagerAndroid>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    pageStyle: {
        marginTop:10,
        alignItems: 'center',
        height:150,
    },
    textStyle:{
        marginTop:5,alignSelf:'center',fontSize:11,color:'#555555',textAlign:'center'
    },
    imageStyle:{
        alignSelf:'center',width:45,height:45
    }
});