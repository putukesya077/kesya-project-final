/** @type {import('tailwindcss').Config} */
// CATATAN: Proyek ini memakai Tailwind CSS v4, yang menggunakan konfigurasi
// berbasis CSS (lihat @theme di src/input.css). File ini TIDAK otomatis
// dipakai kecuali ditambahkan baris `@config "./tailwind.config.js";` di
// src/input.css. Saat ini file ini tidak berpengaruh pada hasil build.

module.exports = {

  content: [

    "./index.html",

    "./pages/**/*.{html,js}",

    "./js/**/*.js",

  ],

  theme: {

    extend: {

      colors: {

        primary: "#B86A43",

        "primary-dark": "#8F4F31",

        background: "#FFF8F2",

        heading: "#3A231A",

        text: "#6F625D",

        border: "#E9DDD5",

      },

      fontFamily: {

        heading: ["Cormorant Garamond", "serif"],

        body: ["Poppins", "sans-serif"],

      },

      boxShadow: {

        soft: "0 20px 60px rgba(0,0,0,.08)",

      },

    },

  },

  plugins: [],

}