<script lang="ts" setup>
  import { IonContent, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, menuController } from '@ionic/vue'
  import labels from '../data/labels' 
  import useAuth from '../data/useAuth'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue';
  const { user, signOut } = useAuth()

  const router = useRouter()
  const handleLogout = () => {
    signOut()
    router.push('/')
    menuController.close('menu');
  }
</script>
<template>
  <ion-menu content-id="main" type="overlay" menu-id="menu" class="dark">
    <ion-content>
      <ion-list>
        <ion-menu-toggle :autoHide="false">
          <ion-item href="#" @click="handleLogout" v-if="user">
            <ion-label class="label">{{labels.logout}}</ion-label>
          </ion-item>
          <ion-item routerLink="/login" v-else>
            <ion-label>{{labels.login}}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<style scoped>
  .label {
    margin-bottom: 5px;
  }
  </style>