
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Home } from './src/screen/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskProvider } from './src/context/TaskContext';
import { AddTask } from './src/screen/AddTask';
import { TaskDetail } from './src/screen/TaskDetail';
import { CategoryProvider } from './src/context/CategoryContext';
import { PriorityProvider } from './src/context/PriorityContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['left','right','bottom']}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TaskProvider>
            <CategoryProvider>
              <PriorityProvider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} options={{ title: "Task Manager" }}/>
                    <Stack.Screen name="AddTask" component={AddTask} />
                    <Stack.Screen name="TaskDetail" component={TaskDetail} options={{ title: 'Task Detail' }} />
                  </Stack.Navigator>
                </NavigationContainer>
              </PriorityProvider>
            </CategoryProvider>
          </TaskProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}