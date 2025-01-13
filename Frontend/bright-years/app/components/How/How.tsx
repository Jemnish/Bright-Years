import React from "react";
import Image from "next/image"; 
import { styles } from "../../styles/styles";

type Props = {};

const How = (props: Props) => {
  return (
    <div className="text-black dark:text-white px-4 sm:px-8 lg:px-16">
      <br />
      <h1
        className={`${styles.title} text-center text-[24px] sm:text-[32px] lg:text-[45px]`}
      >
        How it <span className="text-gradient">Works?</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-9">
        <div className="flex flex-col items-center text-center">
          <Image
            src={"/assets/how1.png"}
            alt="Step 1"
            width={128}
            height={128}
            className="mb-4 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="text-sm sm:text-base lg:text-lg font-semibold font">
            Buy the course
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Students practice at their own pace, first filling in gaps in their
            understanding and then accelerating their learning.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/how2.png"
            alt="Step 2"
            width={128}
            height={128}
            className="mb-4 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="text-sm sm:text-base lg:text-lg font-semibold font">
            Learn and complete
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Created by experts, library of trusted practice and lessons covers
            math, science, and more. Always free for learners and teachers.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/assets/how3.png"
            alt="Step 3"
            width={128}
            height={128}
            className="mb-4 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
          />
          <p className="text-sm sm:text-base lg:text-lg font-semibold font">
            Earn skill and certificate
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-light">
            Teachers can identify gaps in their students’ understanding, tailor
            instruction, and meet the needs of every student.
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default How;
