import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { width } from 'utils/metrics';

export default class HomeView extends React.Component {

    render() {
        console.log(this.props);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>
                    <TouchableOpacity
                        onPress={() => this.props.openDb()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            open db
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.closeDb()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            close db
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.createTable()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            create tb
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.insertData()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            insert db
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.loadData()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            load db
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    style={{ flex: 1 }}
                    data={this.props.data}
                    renderItem={({ item }) =>
                        <Text key={item.id}>{item.id}</Text>
                    }
                    ListEmptyComponent={() => <Text style={{ alignSelf: 'center' }}>empty data</Text>}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'aliceblue',
        width: width / 5,
    },
    buttonText: {
        fontSize: 18,
        marginVertical: 10

    }
})