<!-- Post.vue -->
<template>
	<v-card class="post-card px-6 py-6 mb-16" rounded="xl" elevation="4">
		<!-- top row -->
		<UserHeader :userData="postData.user" :contentCreatedAt="postData.createdAt"
			:contentUpdatedAt="postData.updatedAt" />

		<!-- badges -->
		<div class="d-flex align-center flex-nowrap overflow-x-auto mb-2">
			<BadgeButton v-for="(count, type) in postData.stats.badges" :key="type" :badge="{ type, count }"
				:given="userInteractions.badgesGiven[type]" :canGive="canInteract"
				@badge="emit('badge', { type, count })" />
		</div>

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

		<!-- body -->
		<div ref="contentRef" v-html="postData.bodyHtml" class="text-body-2" />

		<!-- actions -->
		<ContentActions :contentData="postData" />

		<!-- pinned comments -->
		<section v-if="postData.pinnedComments?.length" class="mt-6">
			<v-divider class="mb-3" />
			<h3 class="text-sm font-medium mb-2 flex items-center gap-1">
				<v-icon size="16">mdi-pin</v-icon>Pinned
			</h3>
			<Thread :comments="postData.pinnedComments" :maxDepth="5" />
		</section>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Thread from './Thread.vue'
import UserHeader from './UserHeader.vue'
import BadgeButton from './BadgeButton.vue'

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