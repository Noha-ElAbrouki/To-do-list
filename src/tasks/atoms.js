import { atomWithStorage } from 'jotai/utils'

export const tasksAtom = atomWithStorage('tasks', [])
export const searchedTasksAtom = atomWithStorage('searchedTsks', [])
export const serachedValueAtom = atomWithStorage('searchedValue', '')