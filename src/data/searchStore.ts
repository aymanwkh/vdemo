import { defineStore } from 'pinia'

const useSearchStore = defineStore("search", {
  state: () => ({search: ''}),
  actions: {
    setSearch(payload: string) {
      this.search = payload
    }
  }
})

export default useSearchStore