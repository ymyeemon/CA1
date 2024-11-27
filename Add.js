import React, {useState} from 'react';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import {datasource} from './Data.js';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
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
        marginTop: 270,
    },

    container: {
        backgroundColor: 'white',
        height: '100%',
    }
    
});

const Add = ({navigation}) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');

    return (
        <View style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.text}>Name:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (text) => setName(text)}>
            </TextInput>

            <Text style={styles.text}>Image:</Text>
            <TextInput 
            style={styles.textinput}
            onChangeText={ (image) => setImage(image)}>
            </TextInput>

            <RNPickerSelect
            onValueChange={(status) => setStatus(status)}
            items= {[
                {label: 'Watched', value: 'Watched'},
                {label: 'Not watched', value: 'Not watched'},
            ]}/>

            <RNPickerSelect
            onValueChange={(value) => setType(value)}
            items= {[
                {label: 'Horror', value: 'Horror'},
                {label: 'Thriller', value: 'Thriller'},
            ]}/>

            <Button title='Submit'
            color="blue"
            onPress={ () => {
                let movie = {name: name, image: image, status: status};
                let indexnum = 1;
                if (type === 'Horror') {
                    indexnum = 0;
                }
                datasource[indexnum].data.push(movie);
                navigation.navigate("Home");
            }}/>
        </View>
        </View>
    );
};

export default Add;