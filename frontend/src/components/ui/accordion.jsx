import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import styles from "./accordion.module.css";

function Accordion({ className, ...props }) {
    return (
        <AccordionPrimitive.Root
            className={className}
            data-slot="accordion"
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={`${styles.accordionItem} ${className || ""}`}
            {...props}
        />
    );
}

function AccordionTrigger({ className, children, ...props }) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={`${styles.accordionTrigger} ${className || ""}`}
                {...props}
            >
                {children}
                <ChevronDownIcon className={styles.chevronIcon} />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({ className, children, ...props }) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className={styles.accordionContent}
            {...props}
        >
            <div
                className={`${styles.accordionContentInner} ${className || ""}`}
            >
                {children}
            </div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
