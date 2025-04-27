<!-- MenuButton.vue -->
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
						<v-btn variant="text" style="text-transform: none;" @click="navigateTo(category.route + item.route)">
							{{ item.label }}
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
interface MenuItem {
	label: string
	route: string
}

interface Category {
	title: string
	route: string
	items: MenuItem[]
}

const menuOpen: Ref<boolean> = ref(false)
const router = useRouter()

const categories: Category[] = [
	{
		title: 'Humor',
		route: '/humor',
		items: [
			{ label: 'Memy', route: '/memy' },
			{ label: 'Demoty', route: '/demoty' },
			{ label: 'Video', route: '/video' },
			{ label: 'Komiksy', route: '/komiksy' },
			{ label: 'Screeny', route: '/screeny' },
			{ label: 'Templatki', route: '/templatki' },
		],
	},
	{
		title: 'Polityka',
		route: '/polityka',
		items: [
			{ label: 'Humor', route: '/humor' },
			{ label: 'Informacje', route: '/informacje' },
		],
	},
	{
		title: 'Motoryzacja',
		route: '/motoryzacja',
		items: [
			{ label: 'News', route: '/news' },
			{ label: 'Ciekawostki', route: '/ciekawostki' },
		],
	},
]

function navigateTo(route: string): void {
	menuOpen.value = false
	void router.push(route)
}
</script>