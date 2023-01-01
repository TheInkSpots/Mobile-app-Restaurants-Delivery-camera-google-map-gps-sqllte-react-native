
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


    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
      },

      titleText: {
        //fontFamily: "nunito-bold",
        fontSize: 18,
        color: "#333"
      },
      paragraph: {
        marginVertical: 8,
        lineHeight: 20
      },
      input: {
        borderWidth: 1,
        borderColor: "#003e59",
        padding: 13,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderRadius: 6
      },
      heading: {
        fontSize: 24,
        //fontFamily: "sans-serif",
        fontWeight: "bold",
        color: "#003e59"
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "#56CCF2",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
    
      upload: {
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#003e59"
      },
      imageUpload: {
        alignItems: "flex-start",
        justifyContent: "center",
        width: 200,
        height: 200,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderColor: "#003e59"
      }
})