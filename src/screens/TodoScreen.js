import React, { useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native';
import { THEME } from './../theme';
import { AppCard } from './../components/ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from './../components/ui/AppTextBold';
import { AppButton } from './../components/ui/AppButton';
import { FontAwesome, AntDesign } from '@expo/vector-icons'


export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
    const [modal, setModal] = useState(false)

    const saveHandler = (title) => {
        onSave(todo.id, title)
        setModal(false)
    }
    return (
        <View>
            <EditModal visible={modal} onCancel={() => setModal(false)} value={todo.title} onSave={saveHandler} />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)} >
                    <FontAwesome name='edit' size={20} />
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={goBack}
                        color={THEME.GREY_COLOR} >
                        <AntDesign name='back' size={20} color='#fff' />
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)} >
                        <FontAwesome name='remove' size={20} color='#fff' />
                    </AppButton>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    },
    card: {
        marginBottom: 20,
        padding: 15
    },

})