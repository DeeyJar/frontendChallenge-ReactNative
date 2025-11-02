import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { styles as addStyles } from '../AddTask/styles';
import { taskSchema } from '../AddTask/utils';
import { Field, IFormData } from '../../modal/dto/IFormTask';
import { useTaskContext } from '../../context/TaskContext';
import { usePriorityContext } from '../../context/PriorityContext';
import { useCategoryContext } from '../../context/CategoryContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { ButtonComponent } from '../../component/Button';

export const TaskDetail: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params || {};
  const { listTask, updateTask, isUpdating } = useTaskContext();
  const { priorities } = usePriorityContext();
  const { categories } = useCategoryContext();

  const task = useMemo(() => listTask.find(t => t.id === id), [listTask, id]);
  const [formData, setFormData] = useState<IFormData>({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || '',
    category: task?.category || '',
  });
  const [errors, setErrors] = useState<Record<Field, string>>({} as Record<Field, string>);
  const [touched, setTouched] = useState<Record<Field, boolean>>({} as Record<Field, boolean>);
  const [openPriority, setOpenPriority] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [itemsPriority, setItemsPriority] = useState(priorities.map(p => ({ label: p.level, value: p.level })));
  const [itemsCategory, setItemsCategory] = useState(categories.map(c => ({ label: c.name, value: c.name })));

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        category: task.category,
      });
    }
  }, [task]);

  const validateField = async (field: Field, value: string) => {
    try {
      await taskSchema.validateAt(field as string, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [field]: error.message }));
    }
  };

  const handleChange = (field: Field, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: Field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSave = async () => {
    const allTouched = (Object.keys(formData) as Field[]).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<Field, boolean>);
    setTouched(allTouched);

    try {
      const validated = await taskSchema.validate(formData, { abortEarly: false });
      await updateTask(id, {
        title: validated.title,
        description: validated.description ?? '',
        priority: validated.priority,
        category: validated.category,
      });
      Alert.alert('Saved', 'Task updated successfully', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationErrors: Partial<Record<Field, string>> = {};
        error.inner.forEach((err: any) => {
          if (err.path) validationErrors[err.path as Field] = err.message;
        });
        setErrors(validationErrors as Record<Field, string>);
      } else {
        Alert.alert('Error', 'There was a problem updating the task.');
        console.error('Error updating task:', error);
      }
    }
  };

  if (!task) {
    return (
      <View style={[addStyles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Loading task...</Text>
      </View>
    );
  }

  return (
    <View style={addStyles.container}>
      <Text style={addStyles.title}>Task Detail</Text>

      {/* Title */}
      <View style={addStyles.inputContainer}>
        <TextInput
          style={[addStyles.input, errors.title && addStyles.inputError]}
          placeholder="Task title"
          value={formData.title}
          onChangeText={(v) => handleChange('title', v)}
          onBlur={() => handleBlur('title')}
        />
        {errors.title && <Text style={addStyles.errorText}>{errors.title}</Text>}
      </View>

      {/* Description */}
      <View style={addStyles.inputContainer}>
        <TextInput
          style={[addStyles.input, errors.description && addStyles.inputError, { minHeight: 80 }]}
          placeholder="Description"
          value={formData.description}
          onChangeText={(v) => handleChange('description', v)}
          onBlur={() => handleBlur('description')}
          multiline
        />
        {errors.description && <Text style={addStyles.errorText}>{errors.description}</Text>}
      </View>

      {/* Priority */}
      <View style={addStyles.inputContainer}>
        <DropDownPicker
          open={openPriority}
          value={formData.priority}
          items={itemsPriority}
          setOpen={setOpenPriority}
          setValue={(val: any) => {
            const newValue = typeof val === 'function' ? val(formData.priority) : val;
            handleChange('priority', String(newValue));
          }}
          setItems={setItemsPriority}
          placeholder={'Choose a priority.'}
          zIndex={3000}
          zIndexInverse={1000}
        />
        {errors.priority && <Text style={addStyles.errorText}>{errors.priority}</Text>}
      </View>

      {/* Category */}
      <View style={addStyles.inputContainer}>
        <DropDownPicker
          open={openCategory}
          value={formData.category}
          items={itemsCategory}
          setOpen={setOpenCategory}
          setValue={(val: any) => {
            const newValue = typeof val === 'function' ? val(formData.category) : val;
            handleChange('category', String(newValue));
          }}
          setItems={setItemsCategory}
          placeholder={'Choose a category.'}
          zIndex={2000}
          zIndexInverse={2000}
        />
        {errors.category && <Text style={addStyles.errorText}>{errors.category}</Text>}
      </View>

      <ButtonComponent title={isUpdating(id) ? 'Saving...' : 'Save Changes'} onPress={handleSave} disabled={isUpdating(id)} />
    </View>
  );
};
