<template>
	<v-menu v-model="menuOpen" close-on-content-click transition="slide-y-transition" :open-on-hover="!smAndDown">
		<template #activator="{ props }">
			<v-btn text v-bind="props" class="mx-3 top-bar-button"
				:append-icon="menuOpen ? 'mdi-menu-up' : 'mdi-menu-down'">
				Działy
			</v-btn>
		</template>

		<v-card>
			<v-row class="ma-2">
				<v-col v-for="(category, cIndex) in categories" :key="cIndex" cols="12" sm="4" class="px-2">
					<!-- top-level section -->
					<v-btn block variant="text" :color="category.explicit ? 'error' : ''"
						class="d-flex justify-space-between align-center"
						style="text-transform: none; font-weight: 600;" @click="navigateTo(category.route)"
						:append-icon="category.explicit ? 'mdi-lock' : ''">
						{{ category.title }}
					</v-btn>

					<v-divider class="my-2" />

					<!-- subsections -->
					<div v-for="(item, iIndex) in category.items" :key="iIndex" class="my-1">
						<v-btn block variant="text" :color="category.explicit ? 'error' : ''"
							class="d-flex justify-space-between align-center" style="text-transform: none;"
							@click="navigateTo(category.route + item.route)">
							{{ item.label }}
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const menuOpen: Ref<boolean> = ref(false)
const router = useRouter()

interface MenuItem {
	label: string
	route: string
}

interface Category {
	title: string
	route: string
	explicit: boolean
	items: MenuItem[]
}

const categories: Category[] = [
	{
		title: 'Humor',
		route: '/humor',
		explicit: false,
		items: [
			{ label: 'Memy', route: '/memy', },
			{ label: 'Demoty', route: '/demoty', },
			{ label: 'Video', route: '/video', },
			{ label: 'Komiksy', route: '/komiksy', },
			{ label: 'Screeny', route: '/screeny', },
			{ label: 'Templatki', route: '/templatki', },
		],
	},
	{
		title: 'Polityka',
		route: '/polityka',
		explicit: true,
		items: [
			{ label: 'Humor', route: '/humor', },
			{ label: 'Informacje', route: '/informacje', },
		],
	},
	{
		title: 'Motoryzacja',
		route: '/motoryzacja',
		explicit: false,
		items: [
			{ label: 'News', route: '/news', },
			{ label: 'Ciekawostki', route: '/ciekawostki' },
		],
	},
]

function navigateTo(route: string): void {
	menuOpen.value = false
	void router.push(route)
}
</script>
