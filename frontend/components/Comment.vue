<!-- Comment.vue -->
<template>
	<v-row no-gutters align="start" class="mb-4">
		<v-avatar size="32">
			<v-img :src="comment.user.avatar" :alt="comment.user.name" />
		</v-avatar>
		<div class="ml-3 flex-1 overflow-hidden">
			<div class="text-sm font-medium leading-none">{{ comment.user.name }}</div>
			<div class="prose prose-sm prose-slate dark:prose-invert mt-1 max-w-none" v-html="comment.bodyHtml" />
			<v-btn variant="text" size="x-small" density="compact" @click="$emit('reply', comment.id)">
				Odpowiedz
			</v-btn>
		</div>
	</v-row>
</template>

<script setup lang="ts">

defineProps<{ comment: CommentCore }>()

defineEmits<{ (e: 'reply', id: Id): void }>()
</script>