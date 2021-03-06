/**
 * Created by fangzhen on 2016/12/21.
 */

import React, { Component } from 'react';
import {
    LayoutAnimation,
    TouchableHighlight,
    Platform,
    UIManager
} from 'react-native';
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

var CustomLayoutAnimation = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
        type: LayoutAnimation.Types.easeInEaseOut,
    },
};

export default class LayoutAnimationDemo extends Component {
    constructor(props) {
        super(props);
        this.state={
            views:[],
            num:0,
        }
        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }


    }
    componentWillUpdate() {
        console.log('componentWillUpdate...');
        //LayoutAnimation.easeInEaseOut();
        //LayoutAnimation.spring();
        //LayoutAnimation.linear();
        //或者可以使用如下的自定义的动画效果
        LayoutAnimation.configureNext(CustomLayoutAnimation);
    }
    _onPressAddView() {
        for(let i=0;i<30;i++){
                setTimeout(()=>{
                    this.setState({num:Number.parseInt(this.state.num)+1});
                },i*100);
            }
    }

    _onPressRemoveView() {
        this.setState({num:0 });
    }
    _renderAddedView(i) {
        return (
            <View key={i} style={styles.view}>
                <Text style={{color:'#fff'}}>{i}</Text>
            </View>
        );
    }
    render() {
        this.state.views.length=0;
        for(var i=0;i<this.state.num;i++){
            this.state.views.push(this._renderAddedView(i));
        }
        return (
            <View style={{marginTop:20,margin:10}}>
                <CustomButton text="添加"  onPress={this._onPressAddView.bind(this)}/>
                <CustomButton text="删除"  onPress={this._onPressRemoveView.bind(this)}/>

                        <View style={styles.viewContainer}>
                        {this.state.views}
                        </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    view: {
        height: 50,
        width: 50,
        backgroundColor: 'green',
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});