import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextProps} from 'react-native/Libraries/Text/Text';
import normalize from 'react-native-normalize';

export const EmptyTitle: FC<TextProps & {text?: string}> = ({
  text,
  ...other
}) => {
  return (
    <View>
      <Text style={styles.text} {...other}>
        {text || 'Sorry, no data available'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    width: '100%',

    textAlign: 'center',

    color: 'black',
    fontSize: normalize(16),
  },
});
