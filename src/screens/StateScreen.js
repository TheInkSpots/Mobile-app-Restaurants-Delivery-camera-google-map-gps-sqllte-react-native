import {StyleSheet, View, Text} from 'react-native';

export default function About() {
    return (
        <View sytle={styles.container}>
            <Text>States Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
})
