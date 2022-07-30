<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { IonLoading, IonButton, IonButtons, IonContent, IonFooter, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/vue'
  import { patterns } from '../data/config'
  import labels from '../data/labels'
  import { Err } from '../data/types'
  import { getMessage, message } from '../data/actions'
  import useAuth  from '../data/useAuth'
  import { useRouter } from 'vue-router'
  import Header from './header.vue'

  const password = ref('')
  const email = ref('')
  const router = useRouter()
  const passwordInvalid = computed(() => !password.value || !patterns.password.test(password.value))
  const emailInvalid = computed(() => !email.value || !patterns.email.test(email.value))
  const isLoading = ref(false)
  const { signIn } = useAuth()
  const handleLogin = async () => {
    try{
      isLoading.value = true
      await signIn(email.value, password.value)
      isLoading.value = false
      message(labels.loginSuccess)
      router.push('/')
    } catch (error){
      isLoading.value = false
      const err = error as Err
      message(await getMessage(location.pathname, err))
    }
  }
</script>
<template>
  <ion-page>
    <Header :title="labels.login" />
    <ion-loading :is-open="isLoading" />
    <ion-content fullscreen class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="floating" :color="emailInvalid ? 'danger' : 'primary'">
            {{labels.email}}
          </ion-label>
          <ion-input 
            v-model="email"
            type="text" 
            autofocus
            clearInput
            :color="emailInvalid ? 'danger' : ''"
          />
        </ion-item>
        <ion-item>
          <ion-label position="floating" :color="passwordInvalid ? 'danger' : 'primary'">
            {{labels.password}}
          </ion-label>
          <ion-input 
            v-model="password"
            type="text" 
            clearInput
            :color="passwordInvalid ? 'danger' : ''"
          />
        </ion-item>
      </ion-list>
      <div class="ion-padding center" v-if="!emailInvalid && !passwordInvalid">
        <ion-button 
          fill="solid" 
          shape="round"
          class="btn-width"
          @click="handleLogin"
        >
          {{labels.login}}
        </ion-button>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button fill="clear" @click="router.push('/register')">
            {{labels.newUser}}
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="router.push('/change-password')">
            {{labels.changePassword}}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<style scoped>
  .center {
    text-align: center;
  }
  .btn-width {
    width: 10rem;
  }
</style>