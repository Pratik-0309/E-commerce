import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-112.5" alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            redefine the modern wardrobe. Our journey started with a simple
            idea: to provide high-quality, timeless fashion that empowers
            individuals to express their unique style.
          </p>
          <p>
            Since our inception, we have worked tirelessly to curate collections
            that blend contemporary trends with lasting durability. We believe
            that fashion should not only look good but feel good and last
            longer.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with confidence
            through curated fashion choices that stand the test of time, while
            providing an unparalleled shopping experience from start to finish.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards. From fabric durability to stitch
              precision, our commitment to excellence ensures that every item
              you purchase is built to last.
            </p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className="text-gray-600">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier. We offer a seamless experience
              from browsing to checkout, ensuring your favorite styles are just
              a few clicks away.
            </p>
          </div>
          <div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              Our team of dedicated professionals is here to assist you every
              step of the way. Whether you have a question about sizing or need
              help with a return, we prioritize your satisfaction above all
              else.
            </p>
          </div>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;
