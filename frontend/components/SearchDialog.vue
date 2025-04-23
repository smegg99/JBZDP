<!-- components/SearchDialog.vue -->
<template>
	<div>
		<v-btn text class="mx-3" @click="dialog = true">
			<v-icon start>mdi-magnify</v-icon>
			Szukaj
		</v-btn>

		<v-dialog v-model="dialog" max-width="500">
			<v-card class="pa-4 rounded-lg elevation-10">
				<v-card-title class="d-flex justify-space-between align-center pb-0">
					<div class="d-flex align-center">
						<v-icon class="me-2">mdi-magnify</v-icon>
						<span class="text-h6">Wyszukiwarka</span>
					</div>
					<v-btn icon @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>

				<v-divider class="my-3" />

				<v-form ref="formRef" @submit.prevent="onSearch" validate-on="submit" lazy-validation>
					<v-row class="gap-y-2">
						<v-col cols="12">
							<v-select v-model="form.searchType" :items="SEARCH_TYPES" item-title="label"
								item-value="value" label="Typ wyszukiwania" variant="outlined" density="comfortable"
								prepend-icon="mdi-filter" />
						</v-col>

						<v-col cols="12">
							<v-text-field v-model.trim="form.query" :rules="queryRules"
								label="Wyszukaj po nazwie / tytule" variant="outlined" density="comfortable"
								append-inner-icon="mdi-magnify" @click:append-inner="onSearch"
								@keyup.enter="onSearch" />
						</v-col>

						<v-col v-if="isPosts" cols="12">
							<v-text-field v-model.trim="form.tags" :rules="tagRules" label="Tagi (oddziel przecinkami)"
								variant="outlined" density="comfortable" append-inner-icon="mdi-tag-multiple" />
						</v-col>

						<v-col cols="12">
							<v-select v-model="form.sort" :items="sortOptions" item-title="label" item-value="value"
								:label="sortLabel" variant="outlined" density="comfortable" prepend-icon="mdi-sort">
								<template #item="{ props, item }">
									<v-list-item v-bind="props">
										<template #prepend>
											<v-icon>{{ item.raw.icon }}</v-icon>
										</template>
									</v-list-item>
								</template>
							</v-select>
						</v-col>

						<v-col cols="12">
							<v-btn block color="primary" variant="elevated" size="large" type="submit">
								<v-icon start>mdi-magnify</v-icon>
								Szukaj
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'

const router = useRouter()

const SEARCH_TYPES = [
	{ label: 'Posty', value: 'posts' },
	{ label: 'Użytkownicy', value: 'users' }
] as const

const DEFAULT_SORT = {
	posts: 'created_desc',
	users: 'upvotes_desc'
} as const

const dialog = ref(false)
const formRef = ref<VForm | null>(null)

const SORTS = {
	posts: [
		{ label: 'Plusy malejąco', value: 'upvotes_desc', icon: 'mdi-thumb-up-outline' },
		{ label: 'Minusy malejąco', value: 'downvotes_desc', icon: 'mdi-thumb-down-outline' },
		{ label: 'Data dodania (najnowsze)', value: 'created_desc', icon: 'mdi-clock-fast' },
		{ label: 'Data dodania (najstarsze)', value: 'created_asc', icon: 'mdi-clock-outline' },
		{ label: 'Tytuł A → Z', value: 'title_asc', icon: 'mdi-sort-alphabetical-ascending' },
		{ label: 'Tytuł Z → A', value: 'title_desc', icon: 'mdi-sort-alphabetical-descending' }
	],
	users: [
		{ label: 'Plusy malejąco', value: 'upvotes_desc', icon: 'mdi-thumb-up-outline' },
		{ label: 'Minusy malejąco', value: 'downvotes_desc', icon: 'mdi-thumb-down-outline' },
		{ label: 'Data dołączenia (najnowsi)', value: 'join_desc', icon: 'mdi-calendar-arrow-right' },
		{ label: 'Data dołączenia (najstarsi)', value: 'join_asc', icon: 'mdi-calendar-arrow-left' }
	]
} as const

const form = reactive<{ searchType: SearchType; query: string; tags: string; sort: string }>({
	searchType: 'posts',
	query: '',
	tags: '',
	sort: DEFAULT_SORT.posts
})

const isPosts = computed(() => form.searchType === 'posts')
const sortOptions = computed(() => SORTS[form.searchType])
const sortLabel = computed(() =>
	form.searchType === 'users' ? 'Sortuj użytkowników według' : 'Sortuj posty według'
)

const queryRules = [(v: string) => !!v?.trim() || 'Wpisz frazę wyszukiwania']
const tagRules = computed(() =>
	isPosts.value ? [(v: string) => !!v?.trim() || 'Podaj co najmniej jeden tag'] : []
)

watch(
	() => form.searchType,
	newType => {
		form.sort = DEFAULT_SORT[newType]
	}
)

async function onSearch() {
	const { valid } = await (formRef.value?.validate() ?? { valid: false })
	if (!valid) return

	const params = new URLSearchParams({
		type: form.searchType,
		q: form.query.trim(),
		sort: form.sort
	})

	if (isPosts.value && form.tags.trim()) {
		params.set('tags', form.tags.trim())
	}

	dialog.value = false
	router.push(`/search?${params.toString()}`)
}
</script>

<style scoped>
:deep(.v-btn--variant-elevated) {
	outline-offset: 3px;
}
</style>