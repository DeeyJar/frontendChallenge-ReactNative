import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Image, Text, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardComponent } from "../../component/Card";
import { style } from "./style";
import { useTaskContext } from "../../context/TaskContext";
import { BoxDrawer } from "../../component/BoxDrawer";
import { useCategoryContext } from "../../context/CategoryContext";
import { usePriorityContext } from "../../context/PriorityContext";
import { ButtonComponent } from "../../component/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NoTasksImg from '../../../assets/no-tasks.png';
import TaskNotFound from '../../../assets/task-not-found.png';

export const Home = () => {
    const navigation = useNavigation<any>();
    const {
        listTask,
        listTaskFilter,
        fetchListTask,
        loading,
        updateTaskCompleted,
        deleteTaskById,
        isUpdating,
        isDeleting,
    } = useTaskContext();
    const { fetchCategories } = useCategoryContext();
    const { fetchPriorities } = usePriorityContext();
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    const bottomListPadding = useMemo(() => {
        return Math.round(height * 0.06) + insets.bottom;
    }, [height, insets.bottom]);

    useEffect(() => {
        fetchListTask();
        fetchCategories();
        fetchPriorities();
    }, []);

    if (loading && listTask.length === 0) {
        return <ActivityIndicator size="large" color="#ff0000ff" />;
    }

    if (listTask.length === 0) {
        return (
            <View style={style.noTaskArea}>
                <Text style={style.title}>No tasks available. Please add a new task.</Text>
                <Image source={NoTasksImg} style={style.noTaskImage} resizeMode="contain" />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <ButtonComponent title="Add Task" onPress={() => navigation.navigate('AddTask')} />
            
            {listTaskFilter.length === 0 ? (
                <View style={style.noTaskArea}>
                    <Text style={style.title}>Not task found.</Text>
                    <Image source={TaskNotFound} style={style.noTaskImage} resizeMode="contain" />
                </View>
            ) :
                <View style={style.listArea}>
                    <CardComponent
                        data={listTaskFilter}
                        emptyMessage="No tasks available"
                        onToggleComplete={(id, next) => updateTaskCompleted(id, next)}
                        onRequestDelete={(id) => deleteTaskById(id)}
                        onPressItem={(task) => navigation.navigate('TaskDetail', { id: task.id })}
                        separateCompleted
                        bottomPadding={bottomListPadding}
                        isCompleting={isUpdating}
                        isDeleting={isDeleting}
                        refreshing={loading}
                        onRefresh={fetchListTask}
                    />
                </View>
            }
            <BoxDrawer />
        </View >
    )
}