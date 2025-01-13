import React from "react";
import { styles } from "../styles/styles";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">Bright Years?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Bright Years is an innovative platform designed to help the elderly
          embrace the joys of learning and personal growth through modern
          technology. As we age, it becomes increasingly important to stay
          mentally active, and learning new skills is one of the best ways to
          maintain cognitive function and emotional well-being. Bright Years
          provides a welcoming and intuitive environment for seniors who are
          eager to explore new opportunities and learn at their own pace.
          <br />
          <br />
          At Bright Years, we understand the unique challenges that older adults
          face when it comes to technology. From limited digital literacy to
          accessibility concerns, our mission is to break down these barriers
          and provide a seamless learning experience. With carefully curated
          courses and user-friendly interfaces, we make it possible for seniors
          to explore new hobbies, acquire skills, or simply stay connected with
          the world around them.
          <br />
          <br />
          The platform offers a variety of features that cater specifically to
          the needs of elderly users, including large fonts, voice-guided
          instructions, and customized learning plans. Whether it's learning to
          play a musical instrument, mastering digital literacy, or taking up
          painting, Bright Years provides a wide range of engaging courses to
          suit all interests.
          <br />
          <br />
          Our goal is more than just to provide an educational platform — we aim
          to empower seniors by giving them the tools they need to feel
          confident, independent, and connected. We believe that lifelong
          learning is the key to a fulfilling life at any age, and Bright Years
          is here to help our users embrace the future with excitement and
          curiosity.
          <br />
          <br />
          Join us at Bright Years, where every day is an opportunity to learn,
          grow, and connect. Our platform is more than just about education;
          it's about creating a brighter future for seniors and inspiring them
          to live their best lives.
        </p>

        <br />
      </div>
    </div>
  );
};

export default About;
