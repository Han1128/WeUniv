// 轮播图配置
export const Swiper_Options = {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
    // clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
};
