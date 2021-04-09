import * as React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';

interface Props {
  onPress: () => void;
  style: any;
}

const Button: React.FC<Props> = (props) => {
  const {style, children, onPress} = props;
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={{...style}}>{children}</View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Button;
