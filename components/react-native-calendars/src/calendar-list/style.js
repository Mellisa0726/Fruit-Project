import { Platform, StyleSheet } from 'react-native';
import * as defaultStyle from '../style';
export default function getStyle(theme = {}) {
    const appStyle = { ...defaultStyle, ...theme };
    return StyleSheet.create({
        flatListContainer: {
            flex: Platform.OS === 'web' ? 1 : undefined,
            // height: 300
        },
        container: {
            backgroundColor: appStyle.calendarBackground
        },
        placeholder: {
            backgroundColor: appStyle.calendarBackground,
            alignItems: 'center',
            justifyContent: 'center',
        },
        placeholderText: {
            fontSize: 30,
            fontWeight: '200',
            color: appStyle.dayTextColor
        },
        calendar: {
            paddingLeft: 15,
            paddingRight: 15
        },
        staticHeader: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: appStyle.calendarBackground
        },
        // @ts-expect-error
        ...(theme['stylesheet.calendar-list.main'] || {})
    });
}
