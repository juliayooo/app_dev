<template>
    <Page>
        <ActionBar>
            <Label text="Search"></Label>
        </ActionBar>

        <StackLayout orientation="vertical">
            <SearchBar hint="Search..." v-model="searchQuery"/>
            <ListView for="item in filteredItems" @itemTap="onItemTap">
                <v-template>
                    <StackLayout orientation="horizontal">
                        <Label :text="item.name" textWrap="true"></Label>
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
import { ref, computed, reactive } from "@vue/composition-api";

export default {
    props: ["items"],
    setup(props){
        // Search bar
        const searchQuery = ref("");

        // For debugging. Return from function and use as event handler in template.
        const searchInput = () => {
          console.log(searchQuery.value);
        };

        const filteredItems = computed(() => {
            // Directly filtering "props.items" prevents reactivity from parent from breaking
            return props.items.filter((item) => {
                // Match item name with search query, both in lower case
                return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());

                // TASK: Can you make it so that it filters both by name and by description?
            });
        });

        return {
            searchQuery,
            filteredItems
        };
    }
};
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
