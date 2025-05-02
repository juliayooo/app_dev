<template>
    <Page>
        <ActionBar>
            <Label text="Home"></Label>
            <ActionItem
              ios.systemIcon="4" ios.position="right"
              text="+" android.position="popup"
              @tap="addItem"
            />
        </ActionBar>

        <ListView for="item in items" @itemTap="onItemTap">
            <v-template>
                <StackLayout orientation="horizontal">
                    <Label :text="item.name" textWrap="true"></Label>
                </StackLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
import Vue from 'nativescript-vue';
import {reactive, ref, computed} from "@vue/composition-api";
import ItemDetails from "./ItemDetails";
import ItemsNew from "./ItemsNew";

export default {
  props: ["items"],
  setup(props, ctx){
    const items = props.items;

    const onItemTap = (args) => {
      Vue.navigateTo(ItemDetails, {
        frame: 'items',
        props: {item: items[args.index]},
        animated: true,
        transition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    };

    const addItem = () => {
      // Emit an event to the parent about new item to add
      // ctx.emit("addItem", {
      //   name: `Item ${items.length + 1}`,
      //   description: `Description for Item ${items.length + 1}`,
      //   image: ""
      // });
      Vue.navigateTo(ItemsNew, {
        frame: 'items',
        animated: true,
        transition: {
          name: "slide",
          duration: 200,
          curve: "ease"
        }
      });
    };

    return {
      items,
      onItemTap,
      addItem
    }
  }
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
