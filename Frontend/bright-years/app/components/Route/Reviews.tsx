import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewsCard from "../Reviews/ReviewsCard";

type Props = {};

export const reviews = [
  {
    name: "Geene Bates",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    profession: "Retired Teacher",
    comment:
      "Bright Years has opened up a new world for me. I’ve always wanted to learn to play the guitar, and this platform has made it so easy and enjoyable. The personalized lessons are just what I needed, and the community is so supportive. It’s never too late to start something new!",
  },
  {
    name: "Alex Carter",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Former Lawyer",
    comment:
      "I’ve been able to dive into subjects I never had time for during my career. Bright Years has a fantastic range of courses, and I love how they cater to my pace. I’m now learning a new language, something I’ve always wanted to do. I feel more engaged and inspired every day!",
  },
  {
    name: "Sophie Grant",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Retired Nurse",
    comment:
      "As a retired nurse, I wanted to stay sharp and continue learning. Bright Years made it easy to find courses that fit my interests. The health-related courses have been particularly helpful in keeping me informed, and I feel empowered by the knowledge I’m gaining.",
  },
  {
    name: "Isabella Davies",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Retired Entrepreneur",
    comment:
      "I’ve always been passionate about entrepreneurship and was eager to share my experience with others. Bright Years gave me the opportunity to do just that. I’m not only learning new skills but also connecting with a community of like-minded individuals who inspire me every day.",
  },
  {
    name: "Liam Cooper",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    profession: "Artist",
    comment:
      "Art has always been my passion, and with Bright Years, I can explore new techniques and mediums that I never had time for before. The platform’s flexibility allows me to work at my own pace, and I’ve been able to reconnect with my creative side in ways I never imagined.",
  },
  {
    name: "Emily Wright",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    profession: "Retired Writer",
    comment:
      "I’ve always enjoyed writing, and now, through Bright Years, I’m sharpening my skills with creative writing courses. I love how the platform gives me the opportunity to try new things, and I’m thrilled to see how much I’ve grown in a short time. It’s never too late to rediscover your passions!",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/review_section.png")}
            alt="businnes"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our User Are <span className="text-gradient">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <p className={`${styles.label}`}>
            Empowering Voices: Dive Deeper Into How Our Users Inspire Us, Share
            Their Transformative Journeys, and Play a Pivotal Role in Shaping
            the Future of Bright Years, Contributing Through Their Stories,
            Feedback, and Unique Experiences That Drive Our Growth and
            Innovation.
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewsCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
