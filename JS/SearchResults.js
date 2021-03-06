/**
 * Created by TJY on 16/11/11.
 */
'use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    ListView,
    Text,
} from 'react-native';

import {propertyView} from './propertyView'
export class  SearchResults extends Component{
    constructor(props){
        super(props);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1.guid!== r2.guid});
        this.state = {
            dataSource:dataSource.cloneWithRows(this.props.listings)
        };
    }
    rowPressed(img_url){
        //console.log(propertyGuid);
        var property = this.props.listings.filter(prop => prop.img_url ===img_url)[0];
        console.log(property);
        this.props.navigator.push({
                title:'Property',
                component:propertyView,
                passProps:{property:property},
        });
    }
    renderRow(rowData,secitonID,rowID){
        var price = rowData.price_formatted.split(' ')[0];
        return(

            <TouchableHighlight
                onPress={() => this.rowPressed(rowData.img_url)}
                underlayColor='red'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{url:rowData.img_url}} />
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title}numberOfLines={1}>{rowData.title}</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    render(){
        return(
           <ListView
               dataSource={this.state.dataSource}
               renderRow = {this.renderRow.bind(this)} />

        );
    }
}
const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color:'#656565'
    },
    rowContainer: {
        flexDirection:'row',
        padding: 10
    },
});