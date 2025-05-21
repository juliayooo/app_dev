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
    "label 1",
    "label 2",
    "label 3",
]
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
