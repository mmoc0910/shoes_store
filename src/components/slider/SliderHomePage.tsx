import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const sliders = [
  {
    title: "slide 1",
    img: "https://sneakerbardetroit.com/wp-content/uploads/2017/02/Nike-BHM-Black-History-Month-2017-Collection.jpg",
  },
  {
    title: "slide 2",
    img: "https://giaysneaker.store/media/magefan_blog/reebok-va-harry-potter-bo-suu-tap-giay-doc-dao-lay-cam-hung-tu-the-gioi-phu-thuy.jpg",
  
  },
  {
    title: "slide 3",
    img: "https://obs.line-scdn.net/0hj0NBYEbCNR9zOx5C-_tKSEltNnBAVyYcFw1kHDBVaysLCSJAS1V9Kl89aikMWXJBHVV-cFQ-Li4ODXUZHVR8/w1200",
  },

{
  title: "slide 4",
  img: "https://bizweb.dktcdn.net/100/427/145/files/giay-mlb-chinh-hang-sneaker-authentic-0909665979.jpg?v=1670207891149"
}
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
