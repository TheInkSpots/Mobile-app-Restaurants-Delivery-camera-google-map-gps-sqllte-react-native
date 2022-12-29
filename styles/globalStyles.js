
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    body: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 100, 
        height: 100, 
        margin: 20,
    },
    headerText: {
        fontSize: 30, 
        color: 'blue',
    }, 
    textInput: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5,
    }, 
    buttonView: {
        margin: 10,
        width: 250
    }, 

})