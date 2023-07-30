/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#6E1869',
                'secondary': '#3133BD',
                'thirtiary': '#280F91'
            },

            dropShadow: {
                'card': '6px 6px 0px #FFFFFF'
            },

            padding: {
                '14px': '0.875rem',
                '6px': '0.375rem'
            },
            backgroundImage: {
              'image-none': 'none'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'base'
        })
    ],
}
