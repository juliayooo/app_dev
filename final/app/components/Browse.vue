<template>
    <Page>
        <ActionBar>
            <Label text="Browse"></Label>
        </ActionBar>

        <GridLayout class="page__content">
            <Label class="page__content-icon far">&#xf1ea;</Label>
            <Label class="page__content-placeholder" :text="message"></Label>
        </GridLayout>
    </Page>
</template>

<script setup>
import { ref } from "vue";

const message = ref("My Triptychs");
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
