/**
 * Created by TJY on 16/11/10.
 */
' use strict'
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    ActivityIndicator,
} from 'react-native';
import {SearchResults} from './SearchResults'

function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    }
    data[key] = value;
    var querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');
    return 'http://api.nestoria.co.uk/api?' + querystring;
}
 class SearchPage extends Component{
     constructor(props){
         super(props)
             this.state = {
                 searchString: 'london',
                 isLoading:false,
                 message:''
             };


     }
     onSearchTextChange(event){
         this.setState({
             searchString:event.nativeEvent.text
         });

     }
     _executeQuery(query){
         console.log(query);
         this.setState({isLoading:true});
         fetch(query)
             .then((response) => response.json())
             .then((responseJson) =>{
                 console.log(responseJson);
                this._handleResponse(responseJson.response);
             })
             .catch((error) =>
                 this.setState({
                     isLoading: false,
                     message: 'Something bad happened ' + error
                 }));
     }
     _handleResponse(response) {
         this.setState({ isLoading: false , message: '' });
         if (response.application_response_code.substr(0, 1) === '1') {
             console.log('Properties found: ' + response.listings.length);
             this.props.navigator.push({
                 title:'Results',
                 component:SearchResults,
                 passProps:{listings: response.listings}
             })
         } else {
             this.setState({ message: 'Location not recognized; please try again.'});
         }
     }
     onSearchPressed(){
         var query = urlForQueryAndPage('place_name',this.state.searchString,1);
         this._executeQuery(query);
     }
     //定位服务
     onLocationPressed(){
         navigator.geolocation.getCurrentPosition(
             location => {
                 var search = location.coords.latitude + ',' + location.coords.longitude;
                 this.setState({searchString:search});
                 var query = urlForQueryAndPage('centre_point', search, 1);
                 this._executeQuery(query);

             },
             error => {
                 this.setState({
                     message: 'There was a problem with obtaining your location:  ' + error
                 });
             }
         );
     }
     render(){
        var spinner = this.state.isLoading?(
            <ActivityIndicator
                hidden='true'
                size='large' />):(<Text>没有记录</Text>);

        return(
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy
                </Text>
                <Text>
                    Search by place_name,postcode or seach near your location
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChange.bind(this)}
                        placeholder='Search via name of postcode' />
                <TouchableHighlight                     onPress={this.onSearchPressed.bind(this)}
                                                        style={styles.button} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Go</Text>
                </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.locationButton}
                                    underlayColor='red'
                                    activeOpacity={0.5}
                                    onPress={this.onLocationPressed.bind(this)}
                >

                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                <Image source={require('../img/1.jpg')}
                       style={styles.image} />
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        flex:1,
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height:36,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    locationButton: {
        height:36,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width:200,
        height:250,
    }
});
module.exports = SearchPage;