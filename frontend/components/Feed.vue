<!-- Feed.vue -->
<template>
	<v-container>
		<v-row justify="center">
			<v-col cols="12" sm="12" md="10" lg="8" xl="6">
				<Post v-for="post in posts" :key="post.id" :postData="post" @upvote="() => { }" @downvote="() => { }"
					@favorite="() => { }" @share="() => { }" @comments="() => { }" />
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
			countryOfOrigin: 'pl' as CountryCode,
			isBanned: false,
		},
		stats: {
			upvoteCount: 42,
			downvoteCount: 2,
			badges: {
				the_finger: 6742,
				stone: 6553,
				silver: 2243,
				gold: 4544,
			}
		} as VoteStats,
		userInteractions: {
			isFavorited: true,
			hasUpvoted: true,
			hasDownvoted: false,
			badgesGiven: {
				the_finger: true,
				stone: false,
				silver: false,
				gold: true,
			} as BadgesGiven,
		} as UserInteractions,
		sectionId: 0 as unknown as SectionId,
		subsectionId: 0 as unknown as SubsectionId,
		title: 'Black men in tight shorts twerking to the beat of the music',
		subtitle: 'Big black oiled up men twerking',
		tags: ['black', 'men', 'twerking'] as Tag[],
		bodyHtml: `
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

			<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

			<img
				src="https://imageplaceholder.net/600x400"
				alt="Black Oiled Up Men Twerking"
				class="rounded-lg my-4"
				style="display: block; margin: 0 auto; width: 100%; height: auto;"
			/>

			<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		`,
		pinnedComments: [
			{
				id: 1 as Id,
				createdAt: now + 100000 as UnixMs,
				updatedAt: now + 1050000 as UnixMs,
				user: {
					id: 200 as Id,
					name: 'BigBlackMan69',
					avatar: 'https://i.pravatar.cc/150?img=1',
					joinedAt: now,
					badges: b(),
					isVerified: true,
					currency: 0 as Currency,
					baseRole: 'mod' as BaseRole,
					countryOfOrigin: 'pl' as CountryCode,
					isBanned: false,
				},
				bodyHtml: '<p>Cool post mah kneegrow</p>',
				stats: {
					upvoteCount: 22,
					downvoteCount: 1,
					badges: {
						the_finger: 1,
						stone: 7,
						silver: 2,
						gold: 5,
					}
				} as VoteStats,
				userInteractions: {
					isFavorited: false,
					hasUpvoted: true,
					hasDownvoted: false,
					badgesGiven: {
						the_finger: true,
						stone: false,
						silver: false,
						gold: true,
					} as BadgesGiven,
				} as UserInteractions,
				comments: [
					{
						id: 1 as Id,
						createdAt: now + 100000 as UnixMs,
						user: {
							id: 200 as Id,
							name: 'NigBigga123',
							avatar: 'https://i.pravatar.cc/150?img=3',
							joinedAt: now,
							badges: b(),
							isVerified: true,
							currency: 0 as Currency,
							baseRole: 'admin' as BaseRole,
							countryOfOrigin: 'pl' as CountryCode,
							isBanned: false,
						},
						bodyHtml: '<p>Fr fr no cap</p>',
						stats: {
							upvoteCount: 22,
							downvoteCount: 1,
							badges: {
								the_finger: 1234,
								stone: 7245,
								silver: 2231,
								gold: 5231,
							}
						} as VoteStats,
						userInteractions: {
							isFavorited: false,
							hasUpvoted: true,
							hasDownvoted: false,
							badgesGiven: {
								the_finger: true,
								stone: false,
								silver: false,
								gold: true,
							} as BadgesGiven,
						} as UserInteractions,
					},
					{
						id: 1 as Id,
						createdAt: now + 100000 as UnixMs,
						user: {
							id: 200 as Id,
							name: 're(d)tarded',
							avatar: 'https://i.pravatar.cc/150?img=6',
							joinedAt: now,
							badges: b(),
							isVerified: true,
							currency: 0 as Currency,
							baseRole: 'user' as BaseRole,
							countryOfOrigin: 'ru' as CountryCode,
							isBanned: false,
						},
						bodyHtml: '<p>Shieeeeeeeeeeeet</p>',
						stats: {
							upvoteCount: 11,
							downvoteCount: 312,
							badges: {
								the_finger: 1324,
								stone: 1234,
								silver: 1223,
								gold: 2532,
							}
						} as VoteStats,
						userInteractions: {
							isFavorited: false,
							hasUpvoted: false,
							hasDownvoted: true,
							badgesGiven: {
								the_finger: true,
								stone: false,
								silver: false,
								gold: false,
							} as BadgesGiven,
						} as UserInteractions,
						comments: [
							{
								id: 1 as Id,
								createdAt: now + 180000 as UnixMs,
								user: {
									id: 202 as Id,
									name: 'wewuzkkanggznshieet1',
									avatar: 'https://i.pravatar.cc/150?img=12',
									joinedAt: now,
									badges: b(),
									isVerified: true,
									currency: 0 as Currency,
									baseRole: 'user' as BaseRole,
									countryOfOrigin: 'is' as CountryCode,
									isBanned: false,
								},
								bodyHtml: '<p>Balls</p>',
								stats: {
									upvoteCount: 0,
									downvoteCount: 0,
									badges: {
										the_finger: 1324,
										stone: 1234,
										silver: 1223,
										gold: 2532,
									}
								} as VoteStats,
								userInteractions: {
									isFavorited: false,
									hasUpvoted: false,
									hasDownvoted: false,
									badgesGiven: {
										the_finger: false,
										stone: false,
										silver: false,
										gold: false,
									} as BadgesGiven,
								} as UserInteractions,
							}
						]
					},
					{
						id: 1 as Id,
						createdAt: now + 150000 as UnixMs,
						user: {
							id: 201 as Id,
							name: 'mediaoverlord4488',
							avatar: 'https://i.pravatar.cc/150?img=8',
							joinedAt: now,
							badges: b(),
							isVerified: true,
							currency: 0 as Currency,
							baseRole: 'user' as BaseRole,
							countryOfOrigin: 'is' as CountryCode,
							isBanned: false,
						},
						bodyHtml: '<p>Balls</p>',
						stats: {
							upvoteCount: 0,
							downvoteCount: 0,
						} as VoteStats,
						userInteractions: {
							isFavorited: false,
							hasUpvoted: false,
							hasDownvoted: false,
							badgesGiven: {
								the_finger: false,
								stone: false,
								silver: false,
								gold: false,
							} as BadgesGiven,
						} as UserInteractions,
					}
				] as CommentCore[],
			}
		] as CommentCore[],
		comments: [
		] as CommentCore[],
	}
])
</script>