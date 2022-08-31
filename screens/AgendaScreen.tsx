import React, {useState, Fragment, useCallback, useMemo, useRef, Component, memo} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextStyle} from 'react-native';
import {Calendar, CalendarUtils} from '../node_modules/react-native-calendars/src';
import testIDs from '../testIDs';
import { Ionicons } from '@expo/vector-icons';
import { textColor } from '../components/react-native-calendars/src/style';


class AgendaScreen extends Component {

  currentDateStr = () => {
    let currentDate = new Date();
    const offset = currentDate.getTimezoneOffset()
    currentDate = new Date(currentDate.getTime() - (offset*60*1000))
    return currentDate.toISOString().split('T')[0]
  };

  state = {
    selected: this.currentDateStr(),
    // marked: {}
  };
  
  render() {
    const {selected} = this.state;

    return (
      <Fragment>
        <View style={styles.header}>
          <View style={styles.first}>
            <Text style={styles.title}> 日曆 </Text>
            <TouchableOpacity>
                <Ionicons name="notifications-outline" size={25} style={styles.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <Calendar
          style={styles.calendar}
          renderHeader={this.renderCustomHeader}
          enableSwipeMonths={true}
          onDayPress={this.handleDayPress}
          theme={{
            arrowColor: 'orange',
            todayTextColor: 'orange',
            selectedDayBackgroundColor: 'orange',
            selectedDayTextColor: 'white',
          }}
          markingType={'multi-period'}
          markedDates={{
            [selected]: {selected: true, disableTouchEvent: true}
          }}
        />
        <View style={styles.agenda}>
          <View style={styles.agendaLeft}>
            {this.renderDateBox(selected)}
          </View>
          <View style={styles.agendaRight}>
            {this.renderMemo()}
          </View>
        </View>
      </Fragment>
    );
  }

  renderCustomHeader = (date: any) => {
    const monthMapping: {[key:string]: string} = {
      'Jan': '1 月', 'Feb': '2 月', 'Mar': '3 月', 'Apr': '4 月',
      'May': '5 月', 'Jun': '6 月', 'Jul': '7 月', 'Aug': '8 月',
      'Sep': '9 月', 'Oct': '10 月', 'Nov': '11 月', 'Dec': '12 月'
    };
    const dateList = date.toDateString().split(" ");
    const month:string = monthMapping[dateList[1]];
    const year:string = dateList[3] + ' 年 ';
    const textStyle: TextStyle = {
      fontSize: 18,
      fontWeight: '300',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#2d4150',
      paddingRight: 5
    };
  
    return (
      <View>
        <Text style={textStyle}>{year + month}</Text>
      </View>
    );
  }

  handleDayPress = (day: any) => {
    this.setState({ selected: day.dateString});
  }

  renderDateBox = (date: string) => {
    const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let day: any = new Date(date);
    day = weekDay[day.getDay()];

    const textStyle: TextStyle = {
      color: '#2D4150',
      textAlign: 'center',
    }

    return (
      <View style={styles.dateBox}>
        <Text style={[textStyle, {fontSize: 26, fontWeight: '200'}]}>
          {date.split('-')[2]}
        </Text>
        <Text style={[textStyle, {fontSize: 10, fontWeight:'400'}]}>{day}</Text>
      </View>
    );
  }

  renderMemo = () => {
    return (
      <View style={styles.memo}>

      </View>
    );
  }
}

export default AgendaScreen;



const styles = StyleSheet.create({
  calendar: {
    // marginBottom: 10
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
  agenda: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
  },
  agendaLeft: {
    flex: 1,
    alignItems: 'center'
  },
  agendaRight: {
    flex: 4,
    paddingVertical: 10,
    paddingRight: 10
    // backgroundColor: "white"
  },
  dateBox: {
    height: 60,
    width: 60,
    padding: 5,
    marginTop: 16,
  },
  memo: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16
  }
});