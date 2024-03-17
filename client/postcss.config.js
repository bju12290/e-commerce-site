import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
      safelist: [
        /^bg-/, 
        /^text-/, 
        /^border-/, 
        /^alert-/,
        'modal', 'show', 'hidden',
        'aos-init','aos-animate', 
        /^data-aos-/,
        // SwiperJS specific classes
        /^swiper/, // Safelists any class starting with "swiper"
        // Specific SwiperJS classes you might want to safelist
        'swiper-container',
        'swiper-wrapper',
        'swiper-slide',
        'swiper-pagination',
        'swiper-button-next',
        'swiper-button-prev',
        'swiper-scrollbar',
      ],
    }),
  ],
};