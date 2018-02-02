import firebase from "firebase"
import { pwa, isOnLine } from "./helpers/init"
import app from "./app.js"

const d = document,
  c = console.log

const githubSignIn = () => {
  const provider = new firebase.auth.GithubAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(response =>
      c(`${response.user.email} ha iniciado sesion con Github`, response)
    )
    .catch(err => c(`Error: ${err.code}:${err.message}`))
}
const githubSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => c("Te has desconectado correctamente de Github"))
    .catch(() => c("Ocurrio un error en la desconexion"))
}

const signIn = () => {
  d.addEventListener("click", e => {
    if (e.target.matches(".Sign-button")) {
      githubSignIn()
    }
  })
  return `
  <div class="Sign">
    <h1 class="Sign-title">EDgram</h1>
    <button class="Sign-button">
      <i class="fa fa-sign-in"></i>
      Ingresa con
      <i class="fa fa-github"></i>
    </button>
  </div>
  `
}
export const signOut = () => {
  d.addEventListener("click", e => {
    if (e.target.matches(".logout")) {
      githubSignOut()
    }
  })
  return `
  <button class="logout" title="Salir">
    <i class="logout fa fa-sign-out"></i>
  </button>
  `
}
export const isAuth = () => {
  firebase.auth().onAuthStateChanged(user => {
    const EdGram = d.querySelector(".EDgram")
    c(user)

    if (user) {
      EdGram.innerHTML = app()
      EdGram.classList.add("u-jc-flex-start")
      pwa()
    } else {
      EdGram.innerHTML = signIn()
      EdGram.classList.remove("u-jc-flex-start")
    }
    isOnLine()
  })
}
