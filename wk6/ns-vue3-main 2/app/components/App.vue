<template>
  <Frame id="main">
    <Page>
      <GridLayout rows="*, *, *" columns="*, 3*, *">
        <StackLayout row="1" col="1">
          <Label class="title" text="Login" textAlignment="center"/>
          <Label :text="message" />
          <TextField 
            v-model="username"
            hint="Username" 
            autocapitalizationType="none" 
          />
          <TextField 
            v-model="password"
            hint="Password" 
            secure="true" 
            autocapitalizationType="none" 
          />
          <Button class="submit-btn" text="Submit" @tap="login"></Button>
        </StackLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>

<script setup>
import { ref, $navigateTo } from "nativescript-vue";
import Home from "./Home.vue";
import { knownFolders, path, File, ObservableArray } from "@nativescript/core";

const username = ref("");
const password = ref("");

const correctUsername = "user";
const correctPassword = "pass";

const message = ref("");

const login = () => {
  if(
    correctUsername === username.value &&
    correctPassword === password.value
  ){
    console.log("User logged in");
    $navigateTo(Home, {
      frame: "main",
      clearHistory: true,
      transition: {
          name: "slide"
      },
      props: {
        username: username.value
      }
    });
  }else{
    console.log("Login failed");
    message.value = "Login failed";
  }
};

const documents= knownFolders.documents();
</script>

<style lang="scss">
.title{
  margin: 50px;
  font-size: 30px;
}
.submit-btn{
  font-size: 20px;
  background: black;
  color: white;
  border-radius: 20px;
  width: 200px;
}
</style>
