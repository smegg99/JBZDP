<!-- Post.vue -->
<template>
	<v-card class="post-card px-6 py-6 mb-16" rounded="xl" elevation="4">
		<!-- top row -->
		<UserHeader :userData="postData.user" :contentCreatedAt="postData.createdAt"
			:contentUpdatedAt="postData.updatedAt" />

		<!-- badges -->
		<div class="d-flex align-center flex-nowrap overflow-x-auto mb-4 gap-2">
			<v-btn v-for="b in badgeList" :key="b.type" rounded="xl" variant="outlined" size="small" :color="b.color"
				class="flex-shrink-0 pa-1 mr-2 d-inline-flex align-center h-9">
				<template #prepend>
					<v-img :src="b.src" width="24" height="24" class="mr-1" />
				</template>
				{{ b.count }}
			</v-btn>
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
		<div class="d-flex align-center mt-4 flex-nowrap overflow-x-auto">
			<!-- upvote -->
			<v-btn rounded="xl" variant="outlined" :color="upvoted ? 'green' : undefined" @click="toggleUp"
				class="mr-2 flex-shrink-0 h-10" :prepend-icon="upvoted ? 'mdi-plus-circle' : 'mdi-plus-circle-outline'">
				{{ upvoteCount }}
			</v-btn>

			<!-- downvote -->
			<v-btn rounded="xl" variant="outlined" :color="downvoted ? 'red' : undefined" @click="toggleDown"
				class="mr-2 flex-shrink-0 h-10"
				:prepend-icon="downvoted ? 'mdi-minus-circle' : 'mdi-minus-circle-outline'">
				{{ downvoteCount }}
			</v-btn>

			<div class="flex-grow-1" />

			<!-- favorite -->
			<v-btn rounded="xl" variant="text" :color="favorited ? 'yellow-darken-2' : undefined" @click="toggleFav"
				:icon="favorited ? 'mdi-star' : 'mdi-star-outline'" class="flex-shrink-0 h-10 w-10" />

			<!-- comments -->
			<v-btn rounded="xl" variant="outlined" @click="$emit('comments')" class="ml-2 flex-shrink-0 h-10"
				:prepend-icon="'mdi-comment-outline'">
				{{ commentCount }}
			</v-btn>
		</div>

		<!-- pinned comments -->
		<section v-if="postData.pinnedComments?.length" class="mt-6">
			<v-divider class="mb-3" />
			<h3 class="text-sm font-medium mb-2 flex items-center gap-1">
				<v-icon size="16">mdi-pin</v-icon>Pinned
			</h3>
			<Thread :comments="postData.pinnedComments" />
		</section>
	</v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Thread from './Thread.vue'
import UserHeader from './UserHeader.vue'

import theFinger from '@/assets/badges/the_finger.svg'
import stone from '@/assets/badges/stone.svg'
import silver from '@/assets/badges/silver.svg'
import gold from '@/assets/badges/gold.svg'

const badgeIcons: Record<BadgeType, string> = {
	the_finger: theFinger,
	stone,
	silver,
	gold
}

const badgeColors: Record<BadgeType, string> = {
	the_finger: 'red',
	stone: 'grey',
	silver: 'dark-grey',
	gold: 'yellow'
}

const baseRoleIcons: Record<BaseRole, string> = {
	'admin': 'mdi-shield',
	'mod': 'mdi-star',
	'user': 'mdi-account'
}

const emit = defineEmits(['upvote', 'downvote', 'favorite', 'share', 'comments', 'badge'])

const upvoted = computed(() => props.postData.viewerInteraction?.hasUpvoted ?? false)
const downvoted = computed(() => props.postData.viewerInteraction?.hasDownvoted ?? false)
const favorited = computed(() => props.postData.viewerInteraction?.isFavorited ?? false)

const upvoteCount = computed(() => props.postData.stats.upvoteCount)
const downvoteCount = computed(() => props.postData.stats.downvoteCount)
const commentCount = computed(() => props.postData.pinnedComments?.length ?? 0)

function toggleUp() {
	emit('upvote')
}
function toggleDown() {
	emit('downvote')
}
function toggleFav() {
	emit('favorite')
}

const badgeList = computed(() =>
	(Object.entries(props.postData.badges) as [BadgeType, number][])
		.filter(([, c]) => c > 0)
		.map(([type, count]) => ({ type, count, src: badgeIcons[type], color: badgeColors[type] }))
)

const props = defineProps<{
	readonly postData: PostCore
}>()
</script>