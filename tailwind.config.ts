
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
				// Custom theme colors
				'dark-blue': '#2C3E50',
				'royal-blue': '#007BFF',
				'teal': '#17A2B8',
				'gold': '#FFD700',
				// New futuristic theme colors
				'mystic-blue': '#1A1F71',
				'neon-cyan': '#00E5FF',
				'electric-purple': '#8A2BE2',
				'charcoal-black': '#121212',
				// Dark mode specific backgrounds - improved with deeper colors
				'dark-bg': '#1A1F2C',
				'dark-card': '#221F26',
				'dark-accent': '#403E43',
				'dark-highlight': '#9b87f5',
				'neon-green': '#39FF14',
				'neon-blue': '#38bdf8',
				'neon-pink': '#FF1493',
				'neon-purple': '#8A2BE2',
				// Professional admin colors
				'neutral-50': '#F9FAFB',
				'neutral-100': '#F3F4F6',
				'neutral-200': '#E5E7EB',
				'neutral-300': '#D1D5DB',
				'neutral-400': '#9CA3AF',
				'neutral-500': '#6B7280',
				'neutral-600': '#4B5563',
				'neutral-700': '#374151',
				'neutral-800': '#1F2937',
				'neutral-900': '#111827',
				// Cyber theme colors
				'cyber-darker': '#121620',
				'cyber-dark': '#1A1F2C',
				'cyber-light': '#252A3A',
			},
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				'fira-code': ['Fira Code', 'monospace'],
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
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
						boxShadow: '0 0 15px 5px rgba(0, 123, 255, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 25px 10px rgba(0, 123, 255, 0.7)'
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
				'scanner-line': {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100%)'
					}
				},
				'progress-fill': {
					'0%': {
						width: '0%',
						backgroundColor: 'rgba(56, 189, 248, 0.5)'
					},
					'50%': {
						backgroundColor: 'rgba(56, 189, 248, 0.8)'
					},
					'100%': {
						width: '100%',
						backgroundColor: 'rgba(56, 189, 248, 0.5)'
					}
				},
				'data-rain': {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0'
					},
					'5%': {
						opacity: '0.8'
					},
					'95%': {
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateY(100%)',
						opacity: '0'
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
						filter: 'drop-shadow(0 0 8px rgba(0, 123, 255, 0.7))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 16px rgba(0, 123, 255, 1))'
					}
				},
				'count-up': {
					'0%': {
						content: '0'
					},
					'100%': {
						content: 'attr(data-count)'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 15px 5px rgba(0, 229, 255, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 25px 10px rgba(0, 229, 255, 0.7)'
					}
				},
				'cyber-glow': {
					'0%, 100%': {
						textShadow: '0 0 10px rgba(0, 229, 255, 0.7), 0 0 20px rgba(0, 229, 255, 0.5)'
					},
					'50%': {
						textShadow: '0 0 15px rgba(0, 229, 255, 1), 0 0 30px rgba(0, 229, 255, 0.8)'
					}
				},
				'shine': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'scroll-x': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'text-shimmer': 'text-shimmer 5s infinite linear',
				'scanner-line': 'scanner-line 2s ease-in-out infinite',
				'progress-fill': 'progress-fill 2s ease-in-out infinite',
				'data-rain': 'data-rain 3s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'circuit-animation': 'circuit-animation 20s linear infinite',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'slide-up': 'slide-up 0.9s ease-out forwards',
				'glow-pulse': 'glow-pulse 2s infinite',
				'count-up': 'count-up 2s forwards',
				'neon-pulse': 'neon-pulse 2s infinite',
				'cyber-glow': 'cyber-glow 2s infinite',
				'shine': 'shine 1.5s forwards',
				'blink': 'blink 1.5s infinite',
				'scroll-x': 'scroll-x 20s linear infinite',
				'spin-slow': 'spin-slow 3s linear infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))'
			},
			boxShadow: {
				'neon-glow': '0 0 15px 5px rgba(0, 123, 255, 0.5)',
				'teal-glow': '0 0 15px 5px rgba(23, 162, 184, 0.5)',
				'gold-glow': '0 0 15px 5px rgba(255, 193, 7, 0.5)',
				'cyan-glow': '0 0 15px 5px rgba(0, 229, 255, 0.5)',
				'purple-glow': '0 0 15px 5px rgba(138, 43, 226, 0.5)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
