<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="item.name"></Label>
        </ActionBar>

        <ScrollView>
            <StackLayout orientation="vertical">
                <Image :src="item.image" />

                <Label
                    class="m-10 h3"
                    :text="item.description"
                    verticalAlignment="top"
                    textWrap="true"
                />

                <Label class="h1 m-10" text="Ingredients" />
                <Label class="m-10" v-for="ingredient in item.ingredients"
                    :text="ingredient"
                    textWrap="true"
                />

                <Label class="h1 m-10" text="Instructions" />
                <Label class="m-10" v-for="instruction in item.instructions"
                    :text="instruction"
                    textWrap="true"
                />

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
export default {
    props: ['item'],
    setup(props){

    }
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
