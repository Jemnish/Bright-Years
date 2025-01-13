import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={`w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3`}
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Conditions
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to Bright Years, an innovative platform designed to empower the elderly through tailored learning experiences. By accessing or using our platform, you agree to abide by the following terms and conditions. Please read them carefully as they outline your rights and responsibilities while using our services.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>1. User Eligibility</strong>
            <br />
            Bright Years is intended for individuals aged 50 and above. Caregivers and organizations supporting seniors are also welcome to create accounts on behalf of the elderly. By signing up, you confirm that you meet these eligibility requirements.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>2. Account Responsibility</strong>
            <br />
            Users are responsible for maintaining the confidentiality of their account information and for all activities conducted through their accounts. If you suspect unauthorized access, please contact our support team immediately.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>3. Prohibited Activities</strong>
            <br />
            Users agree not to engage in any activities that violate applicable laws, infringe on the rights of others, or disrupt the platform's functionality. This includes, but is not limited to, sharing offensive or misleading content, unauthorized data extraction, or attempting to compromise platform security.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>4. Course Content</strong>
            <br />
            All course materials provided through Bright Years are intended for personal use only. Redistribution or unauthorized commercial use of this content is strictly prohibited. While we strive to offer high-quality content, Bright Years is not liable for inaccuracies or incomplete information.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>5. Privacy and Data Security</strong>
            <br />
            We are committed to safeguarding user privacy and ensuring data security. Our practices are outlined in the Bright Years Privacy Policy, which we encourage you to review. By using the platform, you consent to data collection as described in the Privacy Policy.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>6. Termination of Access</strong>
            <br />
            Bright Years reserves the right to suspend or terminate user accounts at its discretion, including but not limited to cases of policy violation or suspected misuse.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>7. Amendments to Terms</strong>
            <br />
            We may update these terms periodically to reflect changes in our platform or policies. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the updated terms.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Thank you for choosing Bright Years. Together, we can create a brighter future for lifelong learning and personal growth.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
