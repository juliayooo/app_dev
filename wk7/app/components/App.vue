<template lang="html">
    <Frame id="main">
        <Page>
            <GridLayout rows="*, *, *" columns="*, 2*, *">
                <StackLayout orientation="vertical" row="1" col="1">
                    <Label text="Login" />
                    <TextField
                        hint="Username"
                        autocorrect="false"
                        autocapitalizationType="none"
                        v-model="username"
                    />
                    <TextField
                        hint="Password"
                        secure="true"
                        v-model="password"
                    />
                    <Button text="Submit" @tap="login" />
                </StackLayout>
            </GridLayout>
        </Page>
    </Frame>
</template>

<script>
import Vue from 'nativescript-vue';
import {reactive, ref, computed} from "@vue/composition-api";
import Main from "./Main.vue";

export default {
    components: {
        Main
    },
    setup(){
        const correctUsername = "test";
        const correctPassword = "pass";
        const username = ref("");
        const password = ref("");

        const login = () => {
            if(username.value == correctUsername && password.value == correctPassword){
                Vue.navigateTo(Main, {
                    frame: "main",
                    clearHistory: true,
                    transition: {
                        name: "slide"
                    }
                });
            }
        };

        return {
            username,
            password,
            login
        };
    }
};
</script>

<style lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
