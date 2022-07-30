import { ref, onUnmounted } from 'vue'
import { auth } from './firebase'
import firebase from 'firebase/auth'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function useAuth() {
  const user = ref<firebase.User | null>(null)
  const unsubscribe = auth.onAuthStateChanged(_user => {
    user.value = _user
  })
  onUnmounted(unsubscribe)

  const signIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log('error ==== ', error)
      })
  }
  const signOut = () => auth.signOut()

  return { user, signIn, signOut }
}