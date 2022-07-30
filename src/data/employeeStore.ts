import { defineStore } from 'pinia'
import { Employee } from './types'

const useEmployeeStore = defineStore("employees", {
  state: () => ({employees: [] as Employee[]}),
  actions: {
    setEmployees(payload: Employee[]) {
      this.employees.push(...payload)
    }
  }
})

export default useEmployeeStore