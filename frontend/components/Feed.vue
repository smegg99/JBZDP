<!-- Feed.vue -->
<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="10" md="8" lg="6">
				<Post v-for="post in posts" :key="post.id" :postData="post" @upvote="() => {}" @downvote="() => {}" @favorite="() => {}" @share="() => {}" @comments="() => {}" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Post from './Post.vue'

function b(the_finger = 0, stone = 0, silver = 0, gold = 0): Badges {
	return { the_finger, stone, silver, gold }
}

const now = Date.now() as UnixMs

const posts = ref<PostCore[]>([
	{
		id: 1 as Id,
		createdAt: now,
		updatedAt: now + 1000000 as UnixMs,
		user: {
			id: 100 as Id,
			name: 'NiggAssaurus88',
			avatar: 'https://i.pravatar.cc/150?img=69',
			joinedAt: now,
			badges: b(),
			isVerified: true,
			currency: 0 as Currency,
			baseRole: 'user' as BaseRole,
		},
		badges: b(14, 312, 123, 2253) as Badges,
		stats: { upvoteCount: 42, downvoteCount: 2 } as VoteStats,
		viewerInteraction: {
			isFavorited: true,
			hasUpvoted: true,
			hasDownvoted: true
		} as ViewerInteraction,
		sectionId: 0 as unknown as SectionId,
		subsectionId: 0 as unknown as SubsectionId,
		title: 'Black men in tight shorts twerking to the beat of the music',
		subtitle: 'Big black oiled up men twerking',
		tags: ['black', 'men', 'twerking'] as Tag[],
		bodyHtml: `
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

			<img
				src="https://placehold.co/600x400?text=Black+Oiled+Up+Men+Twerking"
				alt="Black Oiled Up Men Twerking"
				class="rounded-lg my-4"
				style="display: block; margin: 0 auto; width: 100%; height: auto;"
			/>

			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		`,
		isEdited: false,
		pinnedComments: [] as CommentCore[],
	}
])
</script>
