<!-- Post.vue -->
<template>
	<v-card class="post-card px-5 py-5 mb-16" rounded="xl" elevation="16">
		<!-- top row -->
		<UserHeader :userData="postData.user" :contentCreatedAt="postData.createdAt"
			:contentUpdatedAt="postData.updatedAt" />

		<!-- badges -->
		<div v-if="postData.stats.badges && Object.keys(postData.stats.badges).length"
			class="d-flex align-center flex-nowrap mb-2">
			<BadgeLabel v-for="(count, type) in postData.stats.badges" :key="type" :badge="{ type, count }"
				:given="userInteractions.badgesGiven[type]" :canGive="canInteract" />
		</div>

		<v-divider class="mt-3" />

		<!-- breadcrumbs -->
		<v-breadcrumbs :items="['polityka', 'humor']" class="text-caption font-weight-medium pa-2">
			<template v-slot:prepend>
				<v-icon icon="mdi-label-outline" size="small"></v-icon>
			</template>
			<template v-slot:divider>
				<v-icon icon="mdi-chevron-right"></v-icon>
			</template>
			<template v-slot:title="{ item }">
				{{ item.title.toUpperCase() }}
			</template>
		</v-breadcrumbs>

		<v-divider class="mb-3" />

		<!-- title -->
		<h2 class="text-xl break-words">{{ postData.title }}</h2>

		<!-- subtitle -->
		<h3 class="text-xs text-medium-emphasis mt-1 truncate">{{ postData.subtitle }}</h3>

		<!-- tags -->
		<div class="d-flex flex-wrap mt-2 mb-4 gap-2">
			<v-chip v-for="tag in postData.tags" :key="tag" size="small" variant="outlined" color="primary"
				class="rounded-pill mr-2 text-caption font-weight-medium">
				{{ tag }}
			</v-chip>
		</div>

		<v-divider class="mb-3" />

		<!-- BODY wrapper -->
		<div class="body-wrapper" :class="{ expanded }">
			<!-- the post HTML -->
			<div ref="containerRef" class="content-container" v-html="postData.bodyHtml" />

			<!-- gradient overlay -->
			<div class="gradient-overlay" style="
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 8rem;
				background: linear-gradient(
					to bottom,
					rgba(var(--v-theme-surface), 0),
					rgba(var(--v-theme-surface), 1)
				);
				pointer-events: none;
				z-index: 998;" />

			<!-- overlay “Pokaż więcej” button -->
			<v-btn variant="text" color="primary" class="toggle-btn overlay" @click="toggle"
				append-icon="mdi-chevron-down">
				Pokaż więcej
			</v-btn>
		</div>

		<!-- under “Pokaż mniej” button -->
		<v-btn variant="text" color="secondary" class="toggle-btn under" @click="toggle" append-icon="mdi-chevron-up">
			Pokaż mniej
		</v-btn>

		<!-- actions -->
		<ContentActions :contentData="postData" />

		<!-- pinned comments -->
		<section v-if="postData.pinnedComments?.length" class="mt-6">
			<v-divider class="mb-3" />
			<h3 class="text-sm font-medium mb-2 flex items-center gap-1">
				<v-icon size="16">mdi-pin</v-icon>Przypięte
			</h3>
			<Thread :comments="postData.pinnedComments" :maxDepth="2" />
		</section>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Thread from './Thread.vue'
import UserHeader from './UserHeader.vue'
import BadgeLabel from './BadgeLabel.vue'

const expanded = ref(false)

const defaultInteractions = {
	hasUpvoted: false,
	hasDownvoted: false,
	isFavorited: false,
	badgesGiven: {} as Record<string, boolean>
}

const userInteractions = computed(() =>
	props.postData.userInteractions ?? defaultInteractions
)
const canInteract = computed(() => {
	return props.postData.userInteractions != null
})

const upvoted = computed(() => userInteractions.value?.hasUpvoted ?? false)
const downvoted = computed(() => userInteractions.value?.hasDownvoted ?? false)
const favorited = computed(() => userInteractions.value?.isFavorited ?? false)

const upvoteCount = computed(() => props.postData.stats.upvoteCount)
const downvoteCount = computed(() => props.postData.stats.downvoteCount)
const commentCount = computed(() => props.postData.pinnedComments?.length ?? 0)

function toggle() {
	expanded.value = !expanded.value
}

const emit = defineEmits<{
	(e: 'upvote'): void
	(e: 'downvote'): void
	(e: 'favorite'): void
	(e: 'comments'): void
	(e: 'badge', badge: BadgeEntry): void
}>()

const props = defineProps<{
	readonly postData: PostCore
}>()
</script>

<style scoped>
.body-wrapper {
	position: relative;
	overflow: hidden;
	/* NOTE: Adjust this later */
	max-height: 200px;
	transition: max-height .5s ease-in-out
}

.body-wrapper.expanded {
	max-height: 100vh
}

.body-wrapper.expanded .fade-overlay,
.body-wrapper.expanded .gradient-overlay {
	opacity: 0
}

.gradient-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 8rem;
	background: linear-gradient(to bottom, rgba(var(--v-theme-surface), 0), rgba(var(--v-theme-surface), 1));
	pointer-events: none;
	z-index: 998;
	opacity: 1;
	transition: opacity .5s ease-in-out
}

.toggle-btn.overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	opacity: 1;
	transition: opacity .5s ease-in-out
}

.body-wrapper.expanded .toggle-btn.overlay {
	opacity: 0;
	pointer-events: none
}

.toggle-btn.under {
	display: flex;
	justify-content: center;
	width: 100%;
	opacity: 0;
	pointer-events: none;
	transition: opacity .5s ease-in-out
}

.body-wrapper.expanded+.toggle-btn.under {
	opacity: 1;
	pointer-events: auto
}
</style>