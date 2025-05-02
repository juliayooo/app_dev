<template>
    <Page>
        <ActionBar>
            <Label text="Search"></Label>
        </ActionBar>

        <StackLayout class="page__content">
            <Label v-for="label in labels" :text="label" />
        </StackLayout>
    </Page>
</template>

<script setup>
import { ref } from "vue";

const model = defineModel();
const searchTerm = ref("");

const labels = [
    "first label",
    "second label",
    "third label",
    "fourth label"
];

</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
