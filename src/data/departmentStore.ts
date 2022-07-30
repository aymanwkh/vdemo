import { defineStore } from 'pinia'
import { Department } from './types'

const useDepartmentStore = defineStore("departments", {
  state: () => ({departments: [] as Department[]}),
  actions: {
    setDepartments(payload: Department[]) {
      this.departments.push(...payload)
    }
  }
})

export default useDepartmentStore