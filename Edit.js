import React, {useState} from 'react';
import {Alert, StyleSheet, Button, Text, View, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {datasource} from './Data.js';

const styles = StyleSheet.create({
    bottonsbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },

    text: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        padding: 10,
        color: '#292623',
    },

    textinput: {
        borderWidth: 1,
        borderheight: 40,
        margin: 10,
        padding: 5,
        height: 40,
        color: '#292623',
        backgroundColor: '#D7D261',
    },

    box: {
        marginTop: 300,
    },

    container: {
        backgroundColor: '#white',
        height: '100%',
    }
});

const Edit = ({navigation, route}) => {
    const [name, setName] = useState(route.params.name);
    const [image, setImage] = useState(route.params.image);
    const [status, setStatus] = useState(route.params.status);

    return (
        <View style={styles.container}>
            <View style={styles.box}>

            <Text style={styles.text}>Name:</Text>
            <TextInput
            value={name}
            style={styles.textinput}
            onChangeText={ (text) => setName(text)}>
            </TextInput>

            <Text style={styles.text}>Image:</Text>
            <TextInput
            value={image} 
            style={styles.textinput}
            onChangeText={ (image) => setImage(image)}>
            </TextInput>

            <RNPickerSelect
            onValueChange={(status) => setStatus(status)}
            items= {[
                {label: 'Watched', value: 'Watched'},
                {label: 'Not watched', value: 'Not watched'},
            ]}/>

            </View>
           
            <View style={styles.bottonsbox}>
                <View style={{flex: 1, marginRight: 20}}>
                    <Button title='Save'
                    color="blue"
                    onPress={ () => {
                        let indexnum = 1;
                        if (route.params.type === 'Horror') {
                            indexnum = 0;
                        }

                        datasource[indexnum].data[route.params.index].name = name;
                        datasource[indexnum].data[route.params.index].image = image;
                        datasource[indexnum].data[route.params.index].status = status;
                        navigation.navigate("Home");
                    }}/>
                </View>
                
                <View style={{flex: 1}}>
                    <Button title='Delete'
                    color="red"
                    onPress={() => {
                        let indexnum = 1;
                        if (route.params.type === 'Horror') {
                            indexnum = 0;
                        }

                        Alert.alert("Are you sure you want to delete this movie from your watchlist?", '',
                        [{text: 'Yes', onPress: () => {
                            datasource[indexnum].data.splice(route.params.index, 1);
                            navigation.navigate("Home");
                        }},
                        {text: 'No'}]);
                    }}/>
                </View>
            </View>
        </View>
    );
};

export default Edit;