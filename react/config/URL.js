/**
 * Created by fangzhen on 2016/11/2.
 */
export default URL = {

    SEARCH_MOVIE:'http://api.douban.com/v2/movie/search?q=',                //搜索电影api

    MOVIE_INFO:(id)=>'https://movie.douban.com/subject/'+id+'/mobile',      //电影详情api

    BAIDU_NEWS:'http://apis.baidu.com/txapi/tiyu/tiyu',                     //百度体育新闻api

    JUHE_NEWS:'http://v.juhe.cn/toutiao/index',                             //聚合新闻api

    POSITION_INFO:'http://www.gpsspg.com/apis/maps/geo/?output=json&type=0',//经纬度查地址api

    /**
     * LOL用户大区
     * method GET
     * header DAIWAN-API-TOKEN
     * param  keyword:搜索关键词
     */
    LOL_USER_AREA:'http://lolapi.games-cube.com/UserArea',                   //LOL用户大区信息
    /**
     * LOL大区信息
     * method GET
     * header DAIWAN-API-TOKEN
     */
    LOL_AREA:'http://lolapi.games-cube.com/Area',                            //LOL用户大区信息

    /**
     * LOL用户头像
     * method GET
     * header DAIWAN-API-TOKEN
     * param  iconid:图标id
     */
    LOL_USER_ICON:'http://lolapi.games-cube.com/GetUserIcon',                 //LOL用户头像

    /**
     * LOL英雄数据
     * method GET
     * header DAIWAN-API-TOKEN
     * param
     */
    LOL_CHAMPION:'http://lolapi.games-cube.com/Champion',              //LOL英雄数据

    /**
     * LOL英雄详情
     * method GET
     * header DAIWAN-API-TOKEN
     * param champion_id:英雄id
     */
    LOL_CHAMPION_DETAIL:'http://lolapi.games-cube.com/GetChampionDetail',    //LOL英雄详情

    /**
     * LOL技能图标
     * method GET
     * header DAIWAN-API-TOKEN
     * param summonspellid:技能id
     */
    LOL_SPELL_ICON:'http://lolapi.games-cube.com/GetSummonSpellIcon',
    /**
     * LOL英雄皮肤
     * method GET
     * header DAIWAN-API-TOKEN
     * param champion_id:英雄id  skinid:皮肤id
     */
    LOL_CHAMPION_SKIN:'http://lolapi.games-cube.com/GetChampionSkin',
};