/**
 * Created by fangzhen on 2016/11/2.
 */
export default URL = {

    SEARCH_MOVIE:'http://api.douban.com/v2/movie/search?q=',                //搜索电影api

    MOVIE_INFO:(id)=>'https://movie.douban.com/subject/'+id+'/mobile',      //电影详情api

    BAIDU_NEWS:'http://apis.baidu.com/txapi/tiyu/tiyu',                     //百度体育新闻api

    JUHE_NEWS:'http://v.juhe.cn/toutiao/index',                             //聚合新闻api

    POSITION_INFO:'http://www.gpsspg.com/apis/maps/geo/?output=json&type=0',//经纬度查地址api

    LOL_USER_AREA:'http://lolapi.games-cube.com/UserArea'                   //LOL用户大区信息
};