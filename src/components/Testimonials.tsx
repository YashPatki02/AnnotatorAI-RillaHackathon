import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { delay, motion, useInView } from "framer-motion";

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Generate random initial positions for each card
    const getRandomPosition = () => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: 0,
    });

    const cardVariants = {
        hidden: () => ({
            ...getRandomPosition(),
        }),
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                ease: "easeInOut",
                duration: 0.6,
            },
            delay: 0.2,
        },
    };

    return (
        <section className="container flex flex-col items-center gap-6 py-20 sm:gap-7">
            <div className="flex flex-col gap-3">
                <span className="font-bold uppercase text-primary text-center">
                    Testimonials
                </span>
                <h2 className="text-3xl font-heading font-semibold text-center sm:text-4xl">
                    What our users say
                </h2>
            </div>
            <p
                ref={ref}
                className="text-center text-lg max-w-2xl text-muted-foreground"
            >
                Our users love AnnotatorAI. Here&apos;s what they have to say
                about us.
            </p>
            <div className="mt-1 columns-1 gap-5 md:columns-2 lg:columns-3">
                {[
                    "I love AnnotatorAI! They make it easy to create transcripts and summaries.",
                    "AnnotatorAI has helped me a lot with perfecting my transcripts. I love it!",
                    "The best tool for creating transcripts and summaries. I highly recommend it.",
                    "AnnotatorAI is a game-changer. I can't imagine my life without it.",
                    "I highly recommend AnnotatorAI. It's the best tool for creating transcripts.",
                    "I have improved my sales productivity by using AnnotatorAI. It's amazing!",
                ].map((testimonial, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={cardVariants}
                        className="mt-7 inline-block break-inside-avoid shadow-lg"
                    >
                        <Card>
                            <CardContent className="flex flex-col items-start gap-4 p-6 divide-y">
                                <p className="text-foreground">{testimonial}</p>
                                <div className="flex items-center gap-4 w-full pt-4">
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback>
                                            {
                                                ["DF", "GD", "SF", "UR", "SF"][
                                                    Math.floor(
                                                        Math.random() * 5
                                                    )
                                                ]
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="font-semibold leading-none text-foreground">
                                            {
                                                [
                                                    "David",
                                                    "John",
                                                    "Sarah",
                                                    "Jane",
                                                    "Sam",
                                                    "Alice",
                                                ][Math.floor(Math.random() * 6)]
                                            }
                                        </p>
                                        <p className="text-muted-foreground">
                                            {
                                                [
                                                    "CEO",
                                                    "CTO",
                                                    "COO",
                                                    "CFO",
                                                    "CMO",
                                                ][Math.floor(Math.random() * 5)]
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
