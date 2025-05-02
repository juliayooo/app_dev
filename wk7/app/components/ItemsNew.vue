<template>
	<Page id="items-new">
		<ActionBar>
			<NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back" />
			<Label text="New Recipe" />
			<ActionItem
              ios.position="right"
              text="Add" android.position="popup"
              @tap="addItem"
            />
		</ActionBar>

		<StackLayout orientation="vertical" class="page-content">
			<Label text="Name" class="input-label" />
			<TextField v-model="name" />

			<Label text="Description" class="input-label" />
			<TextField v-model="description" />

			<StackLayout orientation="vertical">
				<Label text="Ingredients" class="input-label" />

				<Label
					v-for="ingredient in ingredients"
					:text="ingredient"
				/>

				<StackLayout orientation="horizontal">
					<TextField width="70%" v-model="ingredientInput" />
					<Button width="30%" text="Add" @tap="addIngredient" />
				</StackLayout>
			</StackLayout>

			<StackLayout orientation="vertical">
				<Label text="Instructions" class="input-label" />

				<Label
					v-for="instruction in instructions"
					:text="instruction"
				/>

				<StackLayout orientation="horizontal">
					<TextField width="70%" v-model="instructionInput" />
					<Button width="30%" text="Add" @tap="addInstruction" />
				</StackLayout>
			</StackLayout>

		</StackLayout>
	</Page>
</template>

<script>
import Vue from 'nativescript-vue';
import {reactive, ref, computed} from "@vue/composition-api";
import { eventHub } from "../app.js";

export default {
	emit: ["addItem"],
	setup(props, ctx) {
		const name = ref("");
		const description = ref("");
		const ingredients = reactive([]);
		const instructions = reactive([]);

		const ingredientInput = ref("");
		const addIngredient = () => {
			// Take string value of ingredient text field and push it into the array
			ingredients.push(ingredientInput.value);

			// Clear the ingredient text field
			ingredientInput.value = "";
		}

		const instructionInput = ref("");
		const addInstruction = () => {
			// Take string value of ingredient text field and push it into the array
			instructions.push(instructionInput.value);

			// Clear the ingredient text field
			instructionInput.value = "";
		}

		const addItem = () => {
			eventHub.$emit("addItem", {
				name: name.value,
				description: description.value,
				ingredients: ingredients,
				instructions: instructions,
				image: ""
			});

			Vue.navigateBack({
				frame: "items"
			});
		}

		return {
			name,
			description,
			ingredients,
			instructions,

			ingredientInput,
			addIngredient,

			instructionInput,
			addInstruction,

			addItem
		}
	}
}
</script>

<style lang="scss" scoped>
// .page-content {
// 	font-size: 18px;
// }

// .input-label {
// 	margin: 0 50px;
// 	margin-top: 50px;
// 	font-weight: bold;
// }
// .list-label {
// 	margin: 0 50px;
// }

// TextField {
// 	font-size: 18px;
// }
</style>