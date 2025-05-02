<template>
  <Page>
    <GridLayout rows="*, *, *" columns="*, 3*, *">
      <StackLayout row="1" col="1">
      <Label :text="message"></Label>
      <TextField hint="Username" autocapitalizationType="none" v-model="username"/>
      <TextField hint="Password" secure="true" autocapitalizationType="none" v-model="password"/>
        <Button text="submit" @tap="login"></button>
    </StackLayout>

    </GridLayout>

  </Page>
</template>

<script setup>
import { ref, $navigateTo} from "nativescript-vue"
import Home from "./Home.vue"
const username = ref("");
const password = ref(""); 
const correctUsername = "me";
const correctPassword = "123";

const message = ref("")

const login = () => {
  console.log(username.value, password.value)
  if (username.value === correctUsername && password.value === correctPassword) {
    console.log("logged in")
    $navigateTo(Home, {
      frame: "main",
      clearHistory: true,
      transition: {
        name: "slide",
        
      },
      props : {
        username: username.value
      }
    })
  } else {
    console.log("incorrect")
    message.value = "Incorrect username or password"
  }
}
</script>

<style scoped>
</style>