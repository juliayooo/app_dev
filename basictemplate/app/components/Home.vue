<template>
    <Page>
        <Label v-if="showMessage" :text=message></label>
            <Label v-else text="User no longer logged in"></Label>
    </Page>
</template>

<script setup>
import { defineProps, ref } from "@nativescript/core";
const props = defineProps(["username"]);
const message = ref('User ${props.username} logged in');

const showMessage = ref(true);
</script>