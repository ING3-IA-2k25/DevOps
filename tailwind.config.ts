import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        fontFamily: {
            'sans': ['ui-sans-serif', 'system-ui'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['ui-monospace', 'SFMono-Regular'],
            'display': ['Oswald'],
            'body': ['"Open Sans"'],
            'spotify-mix': ['"Spotify Mix"', 'sans-serif'],
            'spotify-mix-ultra': ['"Spotify Mix Ultra"', 'sans-serif'],
        },
        extend: {
            colors: {
                wewak: {
                    '50': '#fdf3f4',
                    '100': '#fbe8eb',
                    '200': '#f6d5da',
                    '300': '#ea9daa',
                    '400': '#e58799',
                    '500': '#d75c77',
                    '600': '#c13d60',
                    '700': '#a22e4f',
                    '800': '#882947',
                    '900': '#752642',
                    '950': '#411020',
                },
                fern: {
                    '50': '#f0fdf4',
                    '100': '#dbfde6',
                    '200': '#baf8cf',
                    '300': '#84f1aa',
                    '400': '#48e07d',
                    '500': '#00ea59',
                    '600': '#14a547',
                    '700': '#13823b',
                    '800': '#156633',
                    '900': '#13542c',
                    '950': '#042f15',
                },
            },
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9',
            },
        },
    },
}
