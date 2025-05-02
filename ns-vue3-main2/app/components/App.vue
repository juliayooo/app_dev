<template>
  <Frame id="main">
    <Page>
      <GridLayout rows="*, 2*, *" columns="*, 3*, *">
        <StackLayout row="1" col="1">
          <Image src="~/assets/recipes.png" height="200" />
          <Label class="title" text="Login" textAlignment="center" />
          <Label :text="message" />
          <TextField 
            class="username-input input-field"
            v-model="username"
            hint="Username" 
            autocapitalizationType="none" 
          />
          <TextField 
            class="password-input input-field"
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

const username = ref("");
const password = ref("");

const correctUsername = "qwerty";
const correctPassword = "asdfgh";

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
</script>

<style lang="scss">
.title{
  font-size: 30px;
  margin-bottom: 50px;
}

.submit-btn{
  font-size: 20px;
  background: black;
  color: white;
  font-weight: bold;
  width: 50%;
}
</style>
