import React, {FC, memo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';

const ViewJSONComponent: FC<{value: unknown}> = ({value}) => {
  return (
    <ScrollView style={{flexGrow: 0}} horizontal={true}>
      <View style={styles.container}>
        {JSON.stringify(value, null, 2)
          .split('\n')
          .map((item, index) => (
            <Text key={`json-${index}`} style={styles.text}>
              {item}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: normalize(8),

    padding: normalize(20),

    backgroundColor: '#e5e4e4',
  },
  text: {
    color: 'black',
  },
});

export const ViewJSON = memo(ViewJSONComponent);
