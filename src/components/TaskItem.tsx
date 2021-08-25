import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import closeEdition from '../assets/icons/X.png'
import editing from '../assets/icons/Edit.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskItemProps {
    index: number;
    item: Task
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}


export function TaskItem({ index, toggleTaskDone, item, removeTask, editTask }: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [newTaskEditing, setNewTaskEditing] = useState(item.title)

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTaskEditing(item.title)
        setIsEditing(false)
    }

    function handleSubmitEditing() {
        editTask(item.id, newTaskEditing);
        setIsEditing(false)
    }


    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={newTaskEditing}
                        onChangeText={setNewTaskEditing}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer} >
                {!isEditing
                    ? (
                        <TouchableOpacity
                            onPress={() => handleStartEditing()}
                        >
                            <Image source={editing} />
                        </TouchableOpacity>
                    )
                    : (
                        <TouchableOpacity
                            onPress={() => handleCancelEditing()}
                        >
                            <Image source={closeEdition} />
                        </TouchableOpacity>
                    )
                }

                <View
                    style={{ width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)' }}
                />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: "row"
    }
})