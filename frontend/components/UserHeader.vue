<!-- UserHeader.vue -->
<template>
	<v-row class="mb-4 align-start" no-gutters>
		<!-- avatar -->
		<v-col cols="auto" class="pr-3">
			<v-avatar size="48">
				<v-img :src="userData.avatar" :alt="userData.name" />
			</v-avatar>
		</v-col>

		<!-- name + timestamps -->
		<v-col>
			<div class="d-flex align-center flex-wrap">
				<h3 class="text-subtitle-2 font-weight-medium mr-1 mb-0"
					:style="{ color: baseRoleColors[userData.baseRole] }">
					{{ userData.name }}
				</h3>
				<v-icon size="x-small" :style="{ color: baseRoleColors[userData.baseRole] }">
					{{ baseRoleIcons[userData.baseRole] }}
				</v-icon>
			</div>

			<div class="d-flex flex-column align-start mt-1 gap-1" style="overflow: visible">
				<v-chip v-if="contentCreatedAt" pill size="x-small" density="compact" color="success lighten-3"
					variant="text" prepend-icon="mdi-plus" class="ma-0 pa-0" label style="overflow: visible">
					{{ formatDate(contentCreatedAt) }}
				</v-chip>

				<v-chip v-if="contentUpdatedAt && contentUpdatedAt !== contentCreatedAt" pill size="x-small"
					density="compact" color="secondary lighten-3" variant="text" prepend-icon="mdi-pencil"
					class="ma-0 pa-0" label style="overflow: visible">
					{{ formatDate(contentUpdatedAt) }}
				</v-chip>
			</div>
		</v-col>
	</v-row>
</template>


<script setup lang="ts">
const baseRoleIcons: Record<BaseRole, string> = {
	'admin': 'mdi-shield',
	'mod': 'mdi-star',
	'user': 'mdi-account'
}

const baseRoleColors: Record<BaseRole, string> = {
	'admin': 'red',
	'mod': 'green',
	'user': 'light-gray'
}

function formatDate(timestamp: number): string {
	return new Date(timestamp).toLocaleString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

const props = defineProps<{
	readonly userData: User
	readonly contentCreatedAt: UnixMs | undefined
	readonly contentUpdatedAt: UnixMs | undefined
}>()
</script>