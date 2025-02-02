import React from 'react';
import styles from "../styles/terms.module.css";

const Page = () => {
  return (
    <div  className={styles.main}>
      <h1>Privacy Policy</h1>
      <p >Privacy Policy</p>
      <p>Last Updated: 6/14/2023</p>
      <p>This Privacy Policy describes how VOCS AI (“we,” “us,” or “our”) collects, uses, and protects the information provided by users (“you” or “your”) when accessing or using our services, including the conversion of vocals to AI voices. By using VOCS AI, you consent to the practices described in this Privacy Policy.</p>


      <p className={styles.termhead}>1. Information We Collect</p>
      <p>1.1 User Data: To provide our services, we may collect certain personal information that you voluntarily provide, such as your name, email address, and any audio files or other intellectual property uploaded by you for conversion to AI voices. We do not use this information for any purpose other than to fulfill the intended functionality of our services.</p>
      <p>1.2 Payment Information: When subscribing to our services or making payments, you may be required to provide payment details, such as credit card information. Please note that we do not store or process payment information directly. We utilize third-party payment processors, such as PayPal and Stripe, who handle your payment information securely and in accordance with their respective privacy policies.</p>

      <p className={styles.termhead}>2. Use of Information</p>
      <p>2.1 User Data: We strictly maintain the confidentiality of the user data submitted through our services. We do not use, sell, distribute, or share your user data with any third parties for marketing or advertising purposes. The data you provide is solely used to generate the AI voices and facilitate the intended functionality of our services.</p>
      <p>2.2 Payment Information: We utilize third-party payment processors to handle payment transactions. Your payment information is securely processed by these third parties, and we do not store or have access to your credit card or payment details.</p>

      <p className={styles.termhead}>3. Data Security</p>
      <p>3.1 We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security of your information.</p>

      <p className={styles.termhead}>4. Intellectual Property</p>
      <p>4.1 Ownership: Any intellectual property, including audio files and other content uploaded by you for conversion to AI voices, remains your sole property and ownership. We do not claim ownership or rights over the intellectual property you submit.</p>
      <p>4.2 Confidentiality: We maintain strict confidentiality regarding the intellectual property uploaded by users. We do not use or share the intellectual property submitted through our services with any third parties, except as required to provide the intended functionality of our services.</p>

      <p className={styles.termhead}>5. Children’s Privacy</p>
      <p>5.1 Our services are not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take immediate steps to delete such information from our records.</p>

      <p className={styles.termhead}>6. Changes to this Privacy Policy</p>
      <p>6.1 We reserve the right to modify or update this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.</p>

      <p className={styles.termhead}>7. Contact Us</p>
      <p>If you have any questions or concerns regarding this Privacy Policy or our practices, please contact us at [contact information].</p>

      <p>By using VOCS AI, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy.</p>
    </div>
  );
};

export default Page;
