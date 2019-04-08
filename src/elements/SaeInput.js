//@flow
import React from 'react';
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

type inputProps=  {
    labelString: string | any,
    iconName?: string,
    style?: {},
    onChangeText?: Function,
    value: any
}
const SaeInput = ({ labelString = "", iconName = "pencil", style, onChangeText, value }: inputProps) => (
    <Sae
        label={labelString}
        iconClass={FontAwesomeIcon}
        iconName={iconName}
        labelStyle={{ color: 'chocolate' }}
        iconColor={'black'}
        inputPadding={16}
        labelHeight={24}
        underlineColorAndroid="transparent"
        onChangeText={onChangeText}
        // active border height
        borderHeight={2}
        // TextInput props
        // returnKeyType="send"
        value={value}
        autoCapitalize={'none'}
        inputStyle={{ color: 'black', borderBottomWidth: 1, borderColor: 'red' }}
        autoCorrect={false}
        style={{ borderBottomWidth: 1, width: '100%', marginBottom: 10, borderColor: 'silver' }}
    />
);

export default SaeInput;