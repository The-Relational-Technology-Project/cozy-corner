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
				// Outer Sunset Theme Colors
				ocean: {
					DEFAULT: 'hsl(var(--ocean))',
					light: 'hsl(var(--ocean-light))',
					dark: 'hsl(var(--ocean-dark))',
					foreground: 'hsl(var(--ocean-foreground))'
				},
				sunset: {
					DEFAULT: 'hsl(var(--sunset))',
					light: 'hsl(var(--sunset-light))',
					dark: 'hsl(var(--sunset-dark))',
					foreground: 'hsl(var(--sunset-foreground))'
				},
				sand: {
					DEFAULT: 'hsl(var(--sand))',
					light: 'hsl(var(--sand-light))',
					dark: 'hsl(var(--sand-dark))',
					foreground: 'hsl(var(--sand-foreground))'
				},
				dune: {
					DEFAULT: 'hsl(var(--dune))',
					light: 'hsl(var(--dune-light))',
					dark: 'hsl(var(--dune-dark))',
					foreground: 'hsl(var(--dune-foreground))'
				},
				fog: {
					DEFAULT: 'hsl(var(--fog))',
					light: 'hsl(var(--fog-light))',
					dark: 'hsl(var(--fog-dark))',
					foreground: 'hsl(var(--fog-foreground))'
				},
				sky: {
					DEFAULT: 'hsl(var(--sky))',
					light: 'hsl(var(--sky-light))',
					dark: 'hsl(var(--sky-dark))',
					foreground: 'hsl(var(--sky-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'wave': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'wave': 'wave 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;