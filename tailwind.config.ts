
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Sci-fi theme colors
				neon: {
					blue: "#00f7ff",
					purple: "#8B5CF6",
					pink: "#D946EF",
					green: "#10B981"
				},
				cyber: {
					dark: "#121212",
					darker: "#0a0a0a",
					light: "#2a2a2a"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 15px 5px rgba(0, 247, 255, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 25px 10px rgba(0, 247, 255, 0.7)'
					}
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'circuit-animation': {
					'0%': {
						backgroundPosition: '0% 0%'
					},
					'100%': {
						backgroundPosition: '100% 100%'
					}
				},
				'fade-in': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(40px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 8px rgba(0, 247, 255, 0.7))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 16px rgba(0, 247, 255, 1))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'text-shimmer': 'text-shimmer 5s infinite linear',
				'float': 'float 3s ease-in-out infinite',
				'circuit-animation': 'circuit-animation 20s linear infinite',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'slide-up': 'slide-up 0.9s ease-out forwards',
				'glow-pulse': 'glow-pulse 2s infinite'
			},
			backgroundImage: {
				'circuit-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMTIxMjEyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZjdmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iMiI+PC9wYXRoPgo8cGF0aCBkPSJNMjggMEwyOCAzNEw1NiA1MEw1NiAxNkwyOCAwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmN2ZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')",
				'cyber-grid': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwYTBhMGEiPjwvcmVjdD4KPGcgc3Ryb2tlPSIjMDBmN2ZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiI+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMTAwIj48L2xpbmU+CiAgPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIj48L2xpbmU+CiAgPGxpbmUgeDE9IjUwIiB5MT0iMCIgeDI9IjUwIiB5Mj0iMTAwIj48L2xpbmU+CiAgPGxpbmUgeDE9IjAgIiB5MT0iNTAiIHgyPSIxMDAiIHkyPSI1MCI+PC9saW5lPgo8L2c+Cjwvc3ZnPg==')",
				'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))'
			},
			boxShadow: {
				'neon-glow': '0 0 15px 5px rgba(0, 247, 255, 0.5)',
				'neon-purple': '0 0 15px 5px rgba(139, 92, 246, 0.5)',
				'neon-pink': '0 0 15px 5px rgba(217, 70, 239, 0.5)',
				'neon-green': '0 0 15px 5px rgba(16, 185, 129, 0.5)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
