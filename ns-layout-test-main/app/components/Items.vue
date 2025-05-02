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
import ItemForm from "./ItemForm";

const {items, title, ingredients, steps} = defineProps(['items', 'title', 'ingredients', 'steps']);

const onItemTap = (args) => {
  $navigateTo(ItemDetails, {
    frame: 'items',
    props: {item: items.getItem(args.index)},
    animated: true,
    transition: {
      name: "slide",
      duration: 200,
      curve: "ease"
    }
  });
};


const addItem = () => {
  $navigateTo(ItemForm, {
    frame: 'items',
  
    animated: true,
    transition: {
      name: "slide",
      duration: 200,
      curve: "ease"
    }
  });
  // emit("newRecipe", {name: "new item", description: "Description for new item"});
  // items.push({
  //   name: "New item",
  //   description: "Description for New item"

  // });
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
