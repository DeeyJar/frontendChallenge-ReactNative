import { useMemo, useState } from "react";
import { ITask } from "../../modal/dto/ITask";

type FilterType = "priorities" | "categories" | "statuses";

export const useTaskManager = () => {
	const [listTask, setListTask] = useState<ITask[]>([]);
	const [listTaskFilter, setListTaskFilter] = useState<ITask[]>([]);
	const [loading, setLoading] = useState(false);
	const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
	const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
	const [activeFilters, setActiveFilters] = useState<{
		priorities: string[];
		categories: string[];
		statuses: string[];
	}>({ priorities: [], categories: [], statuses: [] });

	const computeFiltered = (
		source: ITask[],
		filters: { priorities: string[]; categories: string[]; statuses: string[] }
	) => {
		let filtered = [...source];
		if (filters.priorities.length > 0) {
			filtered = filtered.filter((task) =>
				filters.priorities.includes(String(task.priority).toLowerCase())
			);
		}
		if (filters.categories.length > 0) {
			filtered = filtered.filter((task) =>
				filters.categories.includes(String(task.category).toLowerCase())
			);
		}
		if (filters.statuses.length > 0) {
			filtered = filtered.filter((task) =>
				filters.statuses.includes(String(task.status).toLowerCase())
			);
		}
		return filtered;
	};

	const setTasks = (tasks: ITask[]) => {
		setListTask(tasks);
		setListTaskFilter(computeFiltered(tasks, activeFilters));
	};

	const applyFilters = (filters: {
		priorities: string[];
		categories: string[];
		statuses: string[];
	}) => {
		setActiveFilters(filters);
		setListTaskFilter(computeFiltered(listTask, filters));
	};

	const toggleFilter = (type: FilterType, value: string) => {
		setActiveFilters((prev) => {
			const currentValues = prev[type];
			const alreadySelected = currentValues.includes(value);
			const newValues = alreadySelected
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];
			const updated = { ...prev, [type]: newValues } as typeof prev;
			setListTaskFilter(computeFiltered(listTask, updated));
			return updated;
		});
	};

	const clearAllFilters = () => {
		const cleared = { priorities: [], categories: [], statuses: [] };
		setActiveFilters(cleared);
		setListTaskFilter(listTask);
	};

		const addTask = (task: ITask): ITask[] => {
			let next: ITask[] = [];
			setListTask((prev) => {
				next = [task, ...prev];
				return next;
			});

			const filtered = computeFiltered([task, ...listTask], activeFilters);
			setListTaskFilter(filtered);
			return [task, ...listTask];
		};

	const isUpdating = (id: number) => updatingIds.has(String(id));
	const isDeleting = (id: number) => deletingIds.has(String(id));

	const beginUpdating = (id: number) => setUpdatingIds((p) => new Set(p).add(String(id)));
	const endUpdating = (id: number) =>
		setUpdatingIds((p) => {
			const n = new Set(p);
			n.delete(String(id));
			return n;
		});

	const beginDeleting = (id: number) => setDeletingIds((p) => new Set(p).add(String(id)));
	const endDeleting = (id: number) =>
		setDeletingIds((p) => {
			const n = new Set(p);
			n.delete(String(id));
			return n;
		});

	return {
		listTask,
		listTaskFilter,
		loading,
		activeFilters,
		setLoading,
		setTasks,
		applyFilters,
		toggleFilter,
		clearAllFilters,
		addTask,
		isUpdating,
		isDeleting,
		beginUpdating,
		endUpdating,
		beginDeleting,
		endDeleting,
	};
};
