/**
 * Created by fangzhen on 2016/11/2.
 */

import React,{
    Component
} from 'react';

import {
    AppRegistry,
    Navigator,
    DrawerLayoutAndroid,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    ListView,
    TextInput,
    TouchableOpacity,
    WebView,
    ToastAndroid,
    ProgressBarAndroid,
    ActivityIndicator,
    Animated,
    Platform,
    StatusBar,
    TouchableWithoutFeedback,
    Easing,
    BackAndroid,
    Alert,
    ViewPagerAndroid,
    RefreshControl,
    Dimensions,
    InteractionManager,
    Share,
} from 'react-native';


global.React = React;
global.Component = Component;
global.AppRegistry = AppRegistry;
global.Navigator = Navigator;
global.DrawerLayoutAndroid = DrawerLayoutAndroid;
global.View = View;
global.Text = Text;
global.ScrollView = ScrollView;
global.StyleSheet = StyleSheet;
global.Image = Image;
global.ListView = ListView;
global.TextInput = TextInput;
global.TouchableOpacity = TouchableOpacity;
global.WebView = WebView;
global.ToastAndroid = ToastAndroid;
global.ProgressBarAndroid = ProgressBarAndroid;
global.ActivityIndicator = ActivityIndicator;
global.Animated = Animated;
global.Platform = Platform;
global.StatusBar = StatusBar;
global.TouchableWithoutFeedback = TouchableWithoutFeedback;
global.TouchableWithoutFeedback = TouchableWithoutFeedback;
global.Easing = Easing;
global.BackAndroid = BackAndroid;
global.Alert = Alert;
global.ViewPagerAndroid = ViewPagerAndroid;
global.RefreshControl = RefreshControl;
global.InteractionManager = InteractionManager;
global.Share = Share;

//var {height, width} = Dimensions.get('window');

global.SceneWidth = Dimensions.get('window').width;
global.SceneHeight= Dimensions.get('window').height;


/**
 * 接口url
 */
import URL from './URL';
global.URL = URL;


/**
 * 相关配置密钥
 */
import KEY from './constant';
global.KEY = KEY;


/**
 * 获取当时日期
 * @type {Date}
 */
var date = new Date();
global.nowYear      = date.getFullYear();
global.nowMonth     = date.getMonth()+1;
global.nowDay       = date.getDay()<10?('0'+date.getDay()):date.getDay();
global.nowHour      = date.getHours()<10?('0'+date.getHours()):date.getHours();
global.nowMinute    = date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes();
global.nowSecond    = date.getSeconds()<10?('0'+date.getMinutes()):date.getSeconds();
global.nowDateTime  = nowYear+'-'+nowMonth+'-'+nowDay+' '+nowHour+':'+nowMinute+':'+nowSecond;
global.nowDate  = nowYear+'-'+nowMonth+'-'+nowDay;
global.nowTime  = nowHour+':'+nowMinute+':'+nowSecond;

/**
 * 网络请求
 */
import FetchUtil from './../util/FetchUtil';

global.FetchUtil = FetchUtil;