<!-- components/TopBar.vue -->
<template>
	<v-app-bar app height="46">
		<v-row class="align-center" style="width: 100%;">
			<v-col cols="4">
				<SearchDialog />
			</v-col>

			<v-col cols="4" class="d-flex justify-center">
				<v-img :src="logoSrc" height="46" width="auto" contain alt="Logo" @click="navigateTo('/')" />
			</v-col>

			<v-col cols="4" class="d-flex justify-end">
				<MenuButton />
			</v-col>
		</v-row>
	</v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logoSrc from '@/assets/logo.svg'
import MenuButton from '@/components/MenuButton.vue'
import SearchDialog from '@/components/SearchDialog.vue'

const router = useRouter()

function navigateTo(route) {
	router.push(route)
}
</script>
