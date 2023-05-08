import LaptopSection from "@/app/components/homeSections/LaptopSection";
import ClientOnly from "@/app/components/ClientOnly";
import "./home.css";
import FavouriteSection from "@/app/components/homeSections/FavouriteSection";
import SkillSection from "@/app/components/homeSections/SkillSection";
import ExperienceSection from "@/app/components/homeSections/ExperienceSection";

const Home = () => {
  return (
    <div
      id="container"
      className="h-[calc(100vh-theme(height.navh))] relative overflow-y-scroll"
    >
      <ClientOnly>
        <section className="h-full">
          <LaptopSection />
        </section>
        <section className="h-full">
          <SkillSection />
        </section>
        <section className="h-full">
          <ExperienceSection />
        </section>
        <section className="h-full">
          <FavouriteSection />
        </section>
      </ClientOnly>
    </div>
  );
};

export default Home;
