import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../components/ui/accordion";
import styles from "./Faqs.module.css";

const Faqs = () => {
    return (
        <div className={styles.faqsContainer}>
            <div className={styles.faqsBackground}></div>
            <div className={styles.faqsTag}>FAQs</div>
            <h2 className={styles.faqsHeading}>Frequently Asked Questions</h2>
            <div className={styles.accordionWrapper}>
                <Accordion
                    type="single"
                    collapsible
                    className={styles.faqAccordion}
                >
                    <AccordionItem value="item-1" className={styles.faqItem}>
                        <AccordionTrigger className={styles.faqTrigger}>
                            What is Qredifai and how does it work?
                        </AccordionTrigger>
                        <AccordionContent className={styles.faqContent}>
                            Qredifai is an AI-powered platform that helps job
                            seekers optimize their resumes and match with
                            suitable job opportunities. Our system analyzes your
                            skills and experience to provide personalized
                            recommendations and improve your chances of landing
                            your dream job.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className={styles.faqItem}>
                        <AccordionTrigger className={styles.faqTrigger}>
                            How much does it cost to use Qredifai?
                        </AccordionTrigger>
                        <AccordionContent className={styles.faqContent}>
                            We offer various subscription plans to cater to
                            different needs, including a free tier with basic
                            features. Premium plans unlock additional tools and
                            insights that enhance your job search experience.
                            Visit our Pricing page for detailed information.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className={styles.faqItem}>
                        <AccordionTrigger className={styles.faqTrigger}>
                            How does Qredifai protect my personal data?
                        </AccordionTrigger>
                        <AccordionContent className={styles.faqContent}>
                            We take data protection seriously. Your personal
                            information is encrypted and securely stored. We
                            never share your data with third parties without
                            your explicit consent, and you maintain full control
                            over your information at all times.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className={styles.faqItem}>
                        <AccordionTrigger className={styles.faqTrigger}>
                            Can I use Qredifai for different industries?
                        </AccordionTrigger>
                        <AccordionContent className={styles.faqContent}>
                            Absolutely! Qredifai is designed to work across
                            various industries and job roles. Our AI system
                            adapts to specific industry requirements and
                            terminology, making it effective regardless of your
                            career field.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5" className={styles.faqItem}>
                        <AccordionTrigger className={styles.faqTrigger}>
                            How do I get started with Qredifai?
                        </AccordionTrigger>
                        <AccordionContent className={styles.faqContent}>
                            Getting started is easy! Simply create an account,
                            upload your resume, and complete your profile. Our
                            system will immediately begin analyzing your
                            information and providing personalized
                            recommendations to help you in your job search.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default Faqs;
