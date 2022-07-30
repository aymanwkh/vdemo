import { db, auth } from './firebase'
import labels from './labels'
import { Employee, Err } from './types'
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { toastController } from '@ionic/vue';

export const getMessage = async (path: string, error: Err) => {
  const errorCode = error.code ? error.code.replace(/-|\//g, '_') : error.message
  if (!labels[errorCode]) {
    await addDoc(collection(db, "logs"), {
      userId: auth.currentUser?.uid || '',
      error: errorCode,
      page: path,
      time: serverTimestamp()
    })
  }
  return labels[errorCode] || labels['unknownError']
}

export const editEmployee = async (employee: Employee) => {
  const { id, ...others } = employee
  const employeeRef = doc(db, "employees", id);
  await updateDoc(employeeRef, {...others})
}

export const message = async (text: string) => {
  const toast = await toastController.create({
          message: text,
          duration: 2000
        })
  return toast.present();
}
