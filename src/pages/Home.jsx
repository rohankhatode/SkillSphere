import AboutUs from "../Components/AboutUs/AboutUs";
import Activities from "../Components/Activities/Activities";
import CategoryCards from "../Components/CategoryCard/CategoryCards";
import Certificate from "../Components/Certificate/Certificate";
import FAQ from "../Components/FAQ/FAQ";
import Footer from "../Components/Footer/Footer";

import Growth from "../Components/Growth/Growth";
import Hero from "../Components/Hero/Hero";
import PopularCourses from "../Components/PopularCourses/PopularCourses";
import WhyChoose from "../Components/WhyChoose/WhyChoose"



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