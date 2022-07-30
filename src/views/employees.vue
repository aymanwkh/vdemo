<script lang="ts" setup>
import labels from '../data/labels'
import { colors } from '../data/config'
import { Department, Employee, State } from '../data/types'
import { IonContent, IonItem, IonLabel, IonList, IonPage, IonText, IonThumbnail } from '@ionic/vue'
import Header from './header.vue'
import { useFuse } from '@vueuse/integrations/useFuse'
import useEmployeeStore from '@/data/employeeStore'
import useDepartmentStore from '@/data/departmentStore'
import useSearchStore from '@/data/searchStore'
import { useRoute } from 'vue-router'
import { computed, onUnmounted } from 'vue'

  const employeeStore = useEmployeeStore()
  const departmentStore = useDepartmentStore()
  const searchStore = useSearchStore()
  const route = useRoute()
  const department = departmentStore.departments.find(d => d.id === route.params.id)
  const employees = computed(() => employeeStore.employees.filter(e => route.params.type === 'a' || (route.params.type === 'd' && e.departmentId === route.params.id))
                                            .map(e => {
                                              const department = departmentStore.departments.find(d => d.id === e.departmentId)
                                              return {
                                                ...e,
                                                departmentName: department?.name,
                                              }
                                            })
                                            .sort((e1, e2) => e1.name > e2.name ? 1 : -1))
  const title = route.params.type === 'a' ? labels.allEmployees : department?.name
  onUnmounted(() => searchStore.setSearch(''))
    // const { results } = useFuse(searchStore.search, employees)
  // const data = computed(() => {
  //   if (!searchStore.search) {
  //     return employees
  //   }
  //   // const options = {
  //   //   includeScore: true,
  //   //   findAllMatches: true,
  //   //   threshold: 0.1,
  //   //   keys: ['name', 'mobile', 'departmentName', 'job']
  //   // }
  //   // const fuse = new Fuse(employees, options)
  //   // const result = fuse.search(searchStore.search)
  //   return results
  // })
</script>
<template>
  <ion-page>
    <Header :title="title" :withSearch="true" />
    <ion-content fullscreen class="ion-padding">
      <ion-list>
        <ion-item v-if="employees.length === 0"> 
          <ion-label>{{labels.noData}}</ion-label>
        </ion-item>
        <ion-item v-else v-for="p in employees" :key="p.id" :routerLink="`/employee-info/${p.id}`">
          <ion-thumbnail slot="start">
            <img :src="`/assets/images/${p.image}`" alt="labels.noImage" class="img" />
          </ion-thumbnail>
          <ion-label>
            <ion-text :class="colors[0].name">{{p.name}}</ion-text>
            <ion-text :class="colors[1].name">{{p.mobile}}</ion-text>
            <ion-text :class="colors[2].name">{{p.departmentName}}</ion-text>
            <ion-text :class="colors[3].name">{{p.job}}</ion-text>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped>
  .img {
    width: 100%;
  }
</style>