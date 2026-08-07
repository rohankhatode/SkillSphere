import AboutUs from "../Components/Home/AboutUs";
import Activities from "../Components/Home/Activities";
import CategoryCards from "../Components/Home/CategoryCards";
import Certificate from "../Components/Home/Certificate";
import FAQ from "../Components/Home/FAQ";
import Footer from "../Components/Home/Footer";

import Growth from "../Components/Home/Growth";
import Hero from "../Components/Home/Hero";
import PopularCourses from "../Components/Home/PopularCourses";
import WhyChoose from "../Components/Home/WhyChoose"



function Home() {
  return (
    <>
        <Hero />
        <CategoryCards />
        <PopularCourses />
        <WhyChoose/>
        <Certificate />
        <Growth />
        <AboutUs />
        <FAQ />
        <Activities />
        <Footer />
    </>
  );
}

export default Home;