import React, { useState } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import { Picker } from '@react-native-community/picker'


import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import { Feather } from '@expo/vector-icons'

import styles from './styles'
import { useFocusEffect } from '@react-navigation/native'

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    const [isFiltersVisible, setIsFiltersVisible] = useState(true)

    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)

                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachersId)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day: Number(weekDay),
                time
            }
        })
        setTeachers(response.data)
        setIsFiltersVisible(false)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys Disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={30} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        placeholderTextColor="#c1bccc"
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        onChangeText={text => setSubject(text)}
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock1}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <View style={styles.input}>
                                <Picker
                                    prompt="Que dia?"
                                    selectedValue={weekDay}
                                    onValueChange={item => setWeekDay(String(item))}>
                                    <Picker.Item label="Segunda-feira" value="0" />
                                    <Picker.Item label="Terça-feira" value="1" />
                                    <Picker.Item label="Quarta-feira" value="2" />
                                    <Picker.Item label="Quinta-feira" value="3" />
                                    <Picker.Item label="Sexta-feira" value="4" />
                                    <Picker.Item label="Sábado-feira" value="5" />
                                    <Picker.Item label="Domingo" value="6" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.inputBlock2}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                placeholderTextColor="#c1bccc"
                                style={styles.input}
                                placeholder="Qual horário?"
                                onChangeText={text => setTime(text)}
                            />
                        </View>
                    </View>
                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}
export default TeacherList