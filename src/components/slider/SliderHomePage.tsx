import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const sliders = [
  {
    title: "slide 1",
    img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "slide 2",
    img: "https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "slide 3",
    img: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SliderHomePage = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden">
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {sliders.map(({ title, img }) => (
          <SwiperSlide key={title}>
            <img
              src={img}
              alt={title}
              className="w-full h-[320px] xl:h-[450px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderHomePage;
