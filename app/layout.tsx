import React from 'react'
import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
	title: 'JavaScript Cardio',
	description: 'Practice your JavaScript skills with our interactive coding challenges.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<head>
				<style>{`
          body {
            background-color: #121212;
            color: #ffffff;
          }
          #app-content {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          #app-content.loaded {
            opacity: 1;
          }
          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            z-index: 9999;
          }
          .loading-screen.hidden {
            display: none;
          }
        `}</style>
			</head>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased'
					// Add any other classes you need
				)}
				suppressHydrationWarning
			>
				<div
					id="loading-screen"
					className="loading-screen"
				>
					<p>Loading...</p>
				</div>
				<div id="app-content">{children}</div>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            function hideLoadingScreen() {
              document.getElementById('app-content').classList.add('loaded');
              document.getElementById('loading-screen').classList.add('hidden');
            }
            if (document.readyState === 'complete') {
              hideLoadingScreen();
            } else {
              window.addEventListener('load', hideLoadingScreen);
            }
          `,
					}}
				/>
				<Analytics />
			</body>
		</html>
	)
}
