<template>
 <Page>
        <ActionBar>
            <Label :text="title"></Label>
            <ActionItem
              position="right"
              text="+"
              @tap="addItem"
            />
        </ActionBar>

      
    </Page>
</template>

<script>
// const emit = defineEmits(["newRecipe"]);
// import { $navigateTo, reactive, ref } from 'nativescript-vue';
// import ItemDetails from "./ItemDetails";
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
