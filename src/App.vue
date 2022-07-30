<template>
  <ion-app>
    <ion-split-pane content-id="main">
      <Panel />
      <ion-router-outlet id="main"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts" setup>
  import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
  import { ref, onUnmounted } from 'vue';
  import { archiveOutline, archiveSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
  import useAuth from './data/useAuth'
  import { collection, query, onSnapshot, doc } from "firebase/firestore";
  import { db } from './data/firebase';
  import useDepartmentStore from './data/departmentStore'
  import useEmployeeStore from './data/employeeStore'
  import Panel from './views/panel.vue';
  import { Employee } from './data/types';

  const unsubscribeDepartments = onSnapshot(doc(db, "lookups", "d"), doc => {
    const store = useDepartmentStore()
    store.setDepartments(doc.data()?.values)
  })
  const q = query(collection(db, "employees"));
  const unsubscribeEmployees = onSnapshot(q, (querySnapshot) => {
    let employees: Employee[] = []
    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        name: doc.data().name,
        departmentId: doc.data().departmentId,
        job: doc.data().job,
        gender: doc.data().gender,
        salary: doc.data().salary,
        birthDate: doc.data().birthDate,
        joinDate: doc.data().joinDate,
        mobile: doc.data().mobile,
        address: doc.data().address,
        image: doc.data().image
      })
    })
    const store = useEmployeeStore()
    store.setEmployees(employees)
  }, err => {
    unsubscribeEmployees()
  })  
  onUnmounted(() => {
    unsubscribeDepartments()
    unsubscribeEmployees()
  })

    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Inbox',
        url: '/folder/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Login',
        url: '/login',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      },
      {
        title: 'Favorites',
        url: '/folder/Favorites',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Archived',
        url: '/folder/Archived',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
      {
        title: 'Trash',
        url: '/folder/Trash',
        iosIcon: trashOutline,
        mdIcon: trashSharp
      },
      {
        title: 'Spam',
        url: '/folder/Spam',
        iosIcon: warningOutline,
        mdIcon: warningSharp
      }
    ];
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      console.log('selected index ... ')
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const { user } = useAuth()
    console.log('updated...')
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
