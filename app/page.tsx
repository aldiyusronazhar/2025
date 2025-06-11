// import Image from "next/image";
import styles from "./page.module.scss";
import Header from "@/components/header/Header";
import About from "@/components/about/About";
// import VerticalTag from "@/components/ui/verticaltag/VerticalTag";
import Projects from "@/components/projects/Projects";
import { projects } from "@/components/projects/projectsData";
// import Ascii from "@/components/ascii/3dGsap";


import Sez from "@/components/ui/sez/Sez";

export default function Home() {
    return (
        <>
            {/* <Ascii/> */}
            {/* <VerticalTag/> */}
            <div className={styles.page__wrapper}>
                <Header />
                <Sez
                    sez1="001"
                    sez2="(About)"
                    sez3="Scroll More ___"
                    config={{
                        sez1: { shuffle: false },
                        sez2: { shuffle: false },
                        sez3: { shuffle: true, duration: 3000, interval: 4000, loop: true }
                    }}
                />
                <About />
                <Sez
                    sez1="002"
                    sez2="(Projects)"
                    sez3="Scroll More ___"
                    config={{
                        sez1: { shuffle: false },
                        sez2: { shuffle: false },
                        sez3: { shuffle: true, duration: 3000, interval: 4000, loop: true }
                    }}
                />
                {projects.map((project) => (
                    <Projects key={project.id} project={project} />
                ))}


            </div>
        </>
    );
}
