import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ADatePicker = ({ placeholder, onDateChange, textColor, borderColor, backgroundColor, borderRadius, borderWidth, width, height, fontSize}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  return (
    <View style={[styles.datePickerContainer, { borderColor, borderRadius, borderWidth, backgroundColor, width, height }]}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={[styles.dateText, { color: textColor, fontSize }]}>
          {selectedDate ? selectedDate.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default ADatePicker;
