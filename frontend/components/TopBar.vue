<!-- components/TopBar.vue -->
<template>
	<v-app-bar app height="46">
		<v-img :src="logoSrc" height="46" width="46" contain alt="Logo" @click="navigateTo('/')" />

		<SearchDialog />

		<FollowedButton />
		
		<v-btn class="ml-3 top-bar-button" append-icon="mdi-timer-sand">
			Oczekujące
		</v-btn>


		<SectionsButton />
	</v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logoSrc from '@/assets/logo.svg'
import SectionsButton from '@/components/SectionsButton.vue'
import SearchDialog from '@/components/SearchDialog.vue'

const router = useRouter()

function navigateTo(route) {
	router.push(route)
}
</script>
