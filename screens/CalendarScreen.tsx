import React, { useState, Fragment, Component } from 'react';
import { SafeAreaView, Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import testIDs from '../testIDs';
import { Ionicons } from '@expo/vector-icons';

interface State {
    items?: AgendaSchedule;
}

export default class AgendaScreen extends Component<State> {
    state: State = {
        items: undefined
    };
    
    render() {
        return (
            <>
                <SafeAreaView style={styles.container}>
                <ScrollView >
                    <View style={styles.header}>
                        <View style={styles.first}>
                            <Text style={styles.title}> 日曆 </Text>
                            <TouchableOpacity>
                                <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.main}>
                    <Agenda
                        testID={testIDs.agenda.CONTAINER}
                        items={this.state.items}
                        loadItemsForMonth={this.loadItems}
                        //selected={'2022-07-27'}
                        renderItem={this.renderItem}
                        rowHasChanged={this.rowHasChanged}
                        showClosingKnob={true}
                        markingType={'multi-period'}
                        markedDates={{
                            '2022-07-20': {
                                periods: [
                                    { startingDay: true, endingDay: false, color: 'green' },
                                    { startingDay: true, endingDay: false, color: 'orange' }
                                ]
                            },
                            '2022-07-21': {
                                periods: [
                                    { startingDay: false, endingDay: true, color: 'green' },
                                    { startingDay: false, endingDay: false, color: 'orange' }
                                ]
                            },
                            '2022-07-22': {
                                periods: [
                                    { startingDay: true, endingDay: true, color: 'pink' },
                                    { startingDay: false, endingDay: true, color: 'orange' }
                                ]
                            }
                        }} />
                    </View>
                </SafeAreaView>
            </>
        );
    }

    loadItems = (day: DateData) => {
        const items = this.state.items || {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 500;
                const strTime = this.timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];
                    items[strTime].push({
                        name: 'abhf',
                        height: Math.max(50, Math.floor(90)),
                        day: strTime
                    });  
                }
            }
            const newItems: AgendaSchedule = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            this.setState({
                items: newItems
            });
        }, 500);
    }
    renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'pink' : '#43515c';

        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: reservation.height }]}
                onPress={() => Alert.alert(reservation.name)}>
                <Text style={{ fontSize, color }}>{reservation.name}</Text>
            </TouchableOpacity>
        );
    }
    rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    }
    timeToString(time: number) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //佔據所有空間
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    first: {
        height: 210,
        width: 420,
        backgroundColor: '#FAE5A4',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingTop: 160,
        flexDirection: 'row',
    },
    title: {
        fontSize: 25,
        color: "#7E6107",
        fontWeight: 'bold',
        paddingLeft: 60,
    },
    notification: {
        color: "#7E6107",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingLeft: 200,
    },
    main: {
        flex: 100,
        backgroundColor: 'white',
    },
});
