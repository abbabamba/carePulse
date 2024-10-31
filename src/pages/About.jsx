import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center pt-10 text-secondary">
        <p className="text-secondary font-bold">ABOUT <span className="text-primary text-2xl">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px] rounded-xl border-l-8 border-primary" src={assets.about_image} alt=''/>

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-dark-200">
          <p>
          When a visitor wants to learn more about you or your business, the 
          About page is what they'll look for. Learn how to craft the perfect 
          page for your business, with About Us page examples from successful 
          brands to inspire you.
          </p>
          <p>
          It may go by different labels—About, Story, Mission—but these 
          types of pages serve the same key purpose: to be the page 
          for a brand to say, “This is who we are.”</p>
          <b className="text-primary">Our Vision</b>
          <p>Your About Us page is one of the first supporting pages 
          you'll likely design when building your website, regardless 
          of the industry you're in.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 text-primary">
        <p>WHY CHOOSE <span>US</span></p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 bg-secondary p-6 text-primary">
        <div className=" border- border-primary px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-4 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className=" border-b border-primary px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Convenience</b>
          <p>Access to a network of trusted healthcare professionals in your area. </p>
        </div>

        <div className=" border- border-primary px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
          <b>Personalization</b>
          <p>Tailored recommendation and reminder to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
