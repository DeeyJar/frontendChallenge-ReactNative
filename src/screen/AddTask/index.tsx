import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { taskSchema } from './utils';
import { usePriorityContext } from '../../context/PriorityContext';
import { useCategoryContext } from '../../context/CategoryContext';
import { Field, IFormData } from '../../modal/dto/IFormTask';
import { useCreateTask } from '../../hook/useCreateTask';
import { ValidationError } from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { ButtonComponent } from '../../component/Button';
import { useNavigation } from '@react-navigation/native';

export const AddTask = () => {
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    description: '',
    priority: '',
    category: '',
  });
  const { priorities } = usePriorityContext();
  const { categories } = useCategoryContext();
  const { createTask, loading } = useCreateTask();
  const [errors, setErrors] = useState<Record<Field, string>>({} as Record<Field, string>);
  const [touched, setTouched] = useState<Record<Field, boolean>>({} as Record<Field, boolean>);
  const [openPriority, setOpenPriority] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [itemsPriority, setItemsPriority] = useState(
    priorities.map(p => ({ label: p.level, value: p.level }))
  );
  const [itemsCategory, setItemsCategory] = useState(
    categories.map(c => ({ label: c.name, value: c.name }))
  );

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

  const handleSubmit = async () => {
    const allTouched = (Object.keys(formData) as Field[]).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<Field, boolean>);

    setTouched(allTouched);

    try {
      const validated = await taskSchema.validate(formData, { abortEarly: false });
      await createTask({
        ...validated,
        description: validated.description ?? '',
      });

      setFormData({
        title: '',
        description: '',
        priority: '',
        category: '',
      });
      setErrors({} as Record<Field, string>);
      setTouched({} as Record<Field, boolean>);

      Alert.alert('Success', 'Task created successfully!', [{
        text: 'OK', onPress: () => {
          navigation.goBack();
        }
      }]);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        const validationErrors: Partial<Record<Field, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as Field] = err.message;
          }
        });
        setErrors(validationErrors as Record<Field, string>);
      } else {
        Alert.alert('Error', 'There was a problem creating the task.');
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>

      {/* Title Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          placeholder="Task title"
          value={formData.title}
          onChangeText={(value) => handleChange('title', value)}
          onBlur={() => handleBlur('title')}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      {/* Description Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.description && styles.inputError]}
          placeholder="Description (optional)"
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
          onBlur={() => handleBlur('description')}
          multiline
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      {/* Priority Input */}
      <View style={styles.inputContainer}>
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
        {errors.priority && <Text style={styles.errorText}>{errors.priority}</Text>}
      </View>

      {/* Category Input */}
      <View style={styles.inputContainer}>
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
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      {/* Submit Button */}
      <ButtonComponent title={loading ? 'Saving...' : 'Create Task'} onPress={handleSubmit} disabled={loading} />
    </View>
  );
};

