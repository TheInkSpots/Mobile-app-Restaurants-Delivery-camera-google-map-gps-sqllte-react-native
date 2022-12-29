import { StyleSheet, View, Text, Image } from 'react-native';

export default function Home() {
    const myPic = require('../assets/photos/myPic.png')

    return (
        <View style={styles.container}>
            <Image source={myPic} style={{ width: 220, height: 220, marginBottom: 30 }} />
            <Text>Record your jobs everyday...</Text>
            <Text>and know how much you have earned!!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

})
