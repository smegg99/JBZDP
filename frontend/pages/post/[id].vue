<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { nextTick, ref, onMounted } from 'vue'
import Post from '~/components/Post.vue'
import Comment from '~/components/Comment.vue'

const route = useRoute()
const router = useRouter()
const commentSection = ref<HTMLElement | null>(null)
const postId = route.params.id as string

const post = {
	id: +postId,
	title: `Mocked Post #${postId}`,
	subtitle: '#trending #mock',
	bodyHtml: `
		<p>This is a <strong>mocked full post</strong> to demonstrate a separate post page with comments.</p>
		<div style="text-align:center;">
			<img src="https://picsum.photos/seed/${postId}/600/300" style="width: 100%; border-radius: 8px;" />
		</div>
		<p>${'<p>More content to test scroll behavior.</p>'.repeat(8)}</p>
	`,
	user: {
		name: 'MockUser',
		avatar: `https://i.pravatar.cc/150?img=${+postId % 70}`
	},
	pinnedComments: [
		{ author: 'Moderator', text: 'Pinned for quality.' },
		{ author: 'Community', text: 'Great post!' }
	]
}

const comments = ref([
	{
		user: { name: 'CoolDev', avatar: 'https://i.pravatar.cc/150?img=20' },
		html: 'I really like this explanation.',
		upvotes: 12,
		downvotes: 0
	},
	{
		user: { name: 'CodeMaster', avatar: 'https://i.pravatar.cc/150?img=25' },
		html: 'Super useful content, thanks!',
		upvotes: 8,
		downvotes: 1
	}
])

const newComment = ref('')

function addComment() {
	if (!newComment.value.trim()) return
	comments.value.push({
		user: {
			name: 'You',
			avatar: 'https://i.pravatar.cc/150?img=12'
		},
		html: newComment.value,
		upvotes: 0,
		downvotes: 0
	})
	newComment.value = ''
}

onMounted(async () => {
	if (route.hash === '#comments' && commentSection.value) {
		await nextTick()
		commentSection.value.scrollIntoView({ behavior: 'smooth' })
	}
})
</script>

<template>
	<v-container class="py-6">
		<Post :title="post.title" :subtitle="post.subtitle" :body-html="post.bodyHtml" :user="post.user"
			:pinned-comments="post.pinnedComments" full />

		<v-divider class="my-6" />

		<!-- Comments Section -->
		<div ref="commentSection">
			<h3 class="text-subtitle-1 mb-4">💬 All Comments</h3>

			<v-list density="compact" class="mb-4">
				<Comment v-for="(comment, i) in comments" :key="i" :comment="comment" />
			</v-list>

			<!-- Add Comment -->
			<v-textarea v-model="newComment" label="Add a comment" auto-grow rows="2" outlined class="mb-2" />
			<v-btn @click="addComment" :disabled="!newComment.trim()" color="primary">
				Post Comment
			</v-btn>
		</div>
	</v-container>
</template>
