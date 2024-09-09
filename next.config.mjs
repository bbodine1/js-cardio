// next.config.mjs
import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
	// Your Next.js configuration options go here
	// For example:
	reactStrictMode: true,
	// Add any other Next.js config options you need
}

export default withSentryConfig(nextConfig, {
	// Sentry config options remain the same
	org: 'very-good-marketing-co',
	project: 'js-cardio',
	sentryUrl: 'https://sentry.io/',
	silent: !process.env.CI,
	widenClientFileUpload: true,
	reactComponentAnnotation: {
		enabled: true,
	},
	tunnelRoute: '/monitoring',
	hideSourceMaps: true,
	disableLogger: true,
	automaticVercelMonitors: true,
})
