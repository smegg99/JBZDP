<template>
	<v-menu v-model="menuOpen" :close-on-content-click="false" transition="scale-transition" offset-y>
		<template #activator="{ props }">
			<v-btn text v-bind="props" class="mx-3" :append-icon="menuOpen ? 'mdi-menu-up' : 'mdi-menu-down'">
				Menu
			</v-btn>
		</template>

		<v-card>
			<v-row class="ma-2" style="max-width: 700px;">
				<v-col v-for="(category, cIndex) in categories" :key="cIndex" cols="12" sm="4" class="px-2">
					<strong>{{ category.title }}</strong>
					<v-divider class="my-2"></v-divider>
					<div v-for="(item, iIndex) in category.items" :key="iIndex" class="my-1">
						<v-btn variant="text" style="text-transform: none;" @click="navigateTo(item.route)">
							{{ item.label }}
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
const router = useRouter()

const categories = [
	{
		title: 'Humor',
		items: [
			{ label: 'Memy', route: '/humor/memy' },
			{ label: 'Demoty', route: '/humor/demoty' },
			{ label: 'Video', route: '/humor/video' },
			{ label: 'Komiksy', route: '/humor/komiksy' },
			{ label: 'Screeny', route: '/humor/screeny' },
			{ label: 'Templatki', route: '/humor/templatki' },
		],
	},
	{
		title: 'Polityka',
		items: [
			{ label: 'Humor', route: '/polityka/humor' },
			{ label: 'Informacje', route: '/polityka/informacje' },
		],
	},
	{
		title: 'Motoryzacja',
		items: [
			{ label: 'News', route: '/motoryzacja/news' },
			{ label: 'Ciekawostki', route: '/motoryzacja/ciekawostki' },
		],
	},
]

function navigateTo(route) {
	menuOpen.value = false
	router.push(route)
}
</script>
