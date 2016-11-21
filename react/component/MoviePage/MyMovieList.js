/**
 * Created by fangzhen on 2016/10/26.
 */

import MovieInfo from './MovieInfo';

import Icon from 'react-native-vector-icons/FontAwesome';

import SearchInput from './../../common/SearchInput/index';

import PageTitle from './../../common/PageTitle/index';

import LoadingPage from './../../common/LoadingPage/index';

export default class MyMovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            navigator:this.props.navigator,
            dataSource:new ListView.DataSource({
                rowHasChanged:(a,b)=>a!==b,
            }),
            loaded:false,
            pageSize:10,
            page:1,
            start:0,
            data:[],
            keyword:'周星驰'
        };
        this.fetchData = this.fetchData.bind(this);
        this.renderMovies = this.renderMovies.bind(this);
        this.setKeyWord = this.setKeyWord.bind(this);
    }


    componentDidMount() {
        this.fetchData(URL.SEARCH_MOVIE+this.state.keyword);
    }


    /**
     * 搜索时设置关键词
     * @param keyword
     */
    setKeyWord(keyword){
        if(keyword){
            this.setState({
                keyword:keyword,
                page:1,
                start:0,
                data:[],
            },function () {
                this.fetchData(URL.SEARCH_MOVIE+keyword);
            });
        }else {
            ToastAndroid.show('搜索内容不能为空哦~',ToastAndroid.SHORT);
        }

    }

    fetchData(url) {
        url += '&count=10&start=' + this.state.start;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                let newData = this.state.data.concat(responseData.subjects);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newData),
                    loaded: true,
                    data: newData,
                });
            });
    }
    renderMovies(movies) {
        return (
            <View style={MySceneStyle.container}>
                <Image
                    source={{uri: movies.images.large}}
                    style={MySceneStyle.thumbnail}
                />
                <View style={MySceneStyle.rightContainer}>
                    <Text style={MySceneStyle.title}>电影:   {movies.title}</Text>
                    <Text style={MySceneStyle.title}>评分:   {movies.rating.average}</Text>
                    <Text style={MySceneStyle.title}>时间:   {movies.year}</Text>
                    <Text style={MySceneStyle.title}>类型:   <Text style={{color:'#00D0CF'}}>{movies.genres.join(' / ')}</Text></Text>
                    <TouchableOpacity onPress={()=>{
                        this.state.navigator.push({name:'movieInfo',param:{url:URL.MOVIE_INFO(movies.id)},component:MovieInfo});
                    }}>
                        <View style={MySceneStyle.viewInfo}>
                            <Text style={MySceneStyle.viewText}>查看详情</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    static defaultProps = {
        title:'我的电影',
    }


    render(){

        if(!this.state.loaded){
            return <LoadingPage/>;
        }

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>

                <PageTitle title="我的电影" navigator={this.props.navigator}/>

                <SearchInput
                    onClick={(text)=>this.setKeyWord(text)}
                    placeholder="查找电影"
                />

                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMovies}
                        style={MySceneStyle.listView}
                        onEndReached={()=>{
                            let page = this.state.page+1;
                            this.setState({
                                page:page,
                                start:this.state.pageSize*(page-1),
                            },function () {
                                this.fetchData(URL.SEARCH_MOVIE+this.state.keyword);
                            });
                        }}
                    />
                </View>
            </View>

        );
    }

}


const MySceneStyle = StyleSheet.create({
    pageTitle:{
        fontSize:25,
        marginLeft:50,
        color:'#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container_loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rightContainer: {
        flex: 1,
        // marginTop:20,
    },
    title: {
        fontSize: 15,
        margin: 8,
        textAlign: 'left',
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 150,
        height:210,
        margin:3,
        borderRadius:5,
    },
    listView: {
       // paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },

    viewInfo:{
        width:150,
        height:50,
        backgroundColor:'#00D0CF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:10,
    },
    viewText:{
        fontSize:15,
        color:'#fff'
    }
});