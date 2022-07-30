
<script lang="ts" setup>
  import { ref, defineProps } from 'vue'
  import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonSearchbar, IonTitle, IonToolbar } from '@ionic/vue'
  import { searchOutline } from 'ionicons/icons'
  import labels from '../data/labels'
  import useSearchStore from '@/data/searchStore'
  type Props = {
    title?: string,
    withSearch?: boolean
  }
  const props = defineProps<Props>()
  const visible = ref(false)
  const store = useSearchStore()
</script>
<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button :text="labels.back" />
      </ion-buttons>
      <ion-buttons slot="end" @click="visible = !visible" v-if="props.withSearch">
        <ion-button>
          <ion-icon 
            :icon="searchOutline"
            size="small" 
            slot="icon-only"
          />
        </ion-button>
      </ion-buttons>
      <ion-title>{{props.title}}</ion-title>
    </ion-toolbar>
    <ion-toolbar v-show="visible">
      <ion-searchbar
        :placeholder="labels.search"
        v-model="store.search"
      />
    </ion-toolbar>
  </ion-header>
</template>
