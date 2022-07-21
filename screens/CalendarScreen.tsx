import React, { useState, Fragment, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import testIDs from '../testIDs';

const INITIAL_DATE = '2022-07-06';

export default function CalendarScreen() {

    const [selected, setSelected] = useState(INITIAL_DATE);
    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);
    
    const renderCalendarWithMultiPeriodMarking = () => {
        return (
            <Fragment>
                <Calendar
                    style={styles.calendar}
                    current={'2022-07-19'}
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
                    }}
                    onDayPress={onDayPress}
                />
            </Fragment>
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
            <View style={styles.header}>
                <View style={styles.first}>
                    <Text style={styles.title}> Calendar </Text>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={25} style={styles.notification} />
                    </TouchableOpacity>
                </View>
            </View>
            <Fragment>
                {renderCalendarWithMultiPeriodMarking()}
            </Fragment>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    first: {
        height: 210,
        width: 400,
        backgroundColor: '#FF9900',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        paddingTop: 160,
        flexDirection: 'row',
    },
    title: {
        fontSize: 25,
        color: "white",
        fontWeight: 'bold',
        paddingLeft: 60,
    },
    notification: {
        color: "white",
        fontWeight: 'bold',
        paddingTop: 3,
        paddingLeft:144,
    },
});
