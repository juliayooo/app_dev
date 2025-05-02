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

<script>
import { ref } from "@vue/composition-api";

export default {
    setup(){
        const message = ref("<!-- Browse page content goes here -->");

        return {message};
    }
}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
