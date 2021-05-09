import React, { useState } from 'react'
import { StyleSheet, View, Button, Alert, Modal, TextInput } from 'react-native';
import { THEME } from './../theme';
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { AppButton } from './ui/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error', `Minimum length of title must be 3 characters!!!`)
        }
        else {
            onSave(title)
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Enter text'
                    autoCorrect={false}
                    autoCapitalize='none'
                    maxLength={80} />
                    
                <View style={styles.buttons}>
                    <AppButton
                        onPress={onCancel}
                        color={THEME.GREY_COLOR} >
                        Cancel
                    </AppButton>
                    <AppButton
                        style={styles.save}
                        onPress={saveHandler} >
                        Save
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10

    }
})

