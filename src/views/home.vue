<script lang="ts" setup>
  import { IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
  import labels from '../data/labels'
  import { colors } from '../data/config'
  import useDepartmentStore from '../data/departmentStore'

  const store = useDepartmentStore()
  let i = 0
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>{{labels.appTitle}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large" class='ion-no-padding'>{{labels.appTitle}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button 
        routerLink="/employees/a/0"
        expand="block"
        shape="round"
        :class="colors[i++ % 10].name"
        class="btn"
      >
        {{labels.allEmployees}}
      </ion-button>
      <ion-loading :is-open="store.departments.length === 0" />
      <ion-button v-for="d in store.departments"
        :routerLink="`/employees/d/${d.id}`"
        expand="block"
        shape="round"
        :class="colors[i++ % 10].name"
        class="btn"
        :key="d.id"
      >
        {{d.name}}
      </ion-button>
    </ion-content>
  </ion-page>
</template>
<style scoped>
  .btn {
    margin: 0.9rem;
  }
</style>