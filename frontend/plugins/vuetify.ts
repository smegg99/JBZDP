// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components,
		directives,
		ssr: true,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: { mdi },
		},
		theme: {
			defaultTheme: 'dark',
			themes: {
			dark: {
				dark: true,
				colors: {
					primary: '#BB86FC',
					background: '#121212',
				},
			},
		},
	},
})

	nuxtApp.vueApp.use(vuetify)
})
