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

      <ListView :items="items" @itemTap="onItemTap">
          <template #default="{ item }">
              <StackLayout orientation="horizontal">
                  <Label :text="item.name" textWrap="true"></Label>
              </StackLayout>
          </template>
      </ListView>
  </Page>
</template>

<script setup>
import { $navigateTo, reactive, ref } from 'nativescript-vue';
import ItemDetails from "./ItemDetails";
import ItemsForm from "./ItemsForm";

const {items, title} = defineProps(['items', 'title']);

// const onItemTap = (args) => {
// $navigateTo(ItemDetails, {
//   frame: 'items',
//   props: {item: items.getItem(args.index)},
//   animated: true,
//   transition: {
//     name: "slide",
//     duration: 200,
//     curve: "ease"
//   }
// });
// };

const emit = defineEmits(["newRecipe"]);
const addItem = () => {
$navigateTo(ItemsForm, {
  frame: 'items',
  props: {
    onNewRecipe: (recipe) => {
      emit("newRecipe", recipe);
    }
  },
  animated: true,
  transition: {
    name: "slide",
    duration: 200,
    curve: "ease"
  }
});
};
</script>

<style scoped lang="scss">
  // Start custom common variables
  @import "@nativescript/theme/scss/variables/blue";
  // End custom common variables

  // Custom styles

</style>