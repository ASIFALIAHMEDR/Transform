import Image from "next/image";
import About from "./Components/About";
import Achivements from "./Components/Achivements";

export default function Home() {
  return (
    <div> 
      <div className="first-page">
        <Image src="/pexel.jpg" alt="as" width={1920} height={700}/>
      </div>

      <About />
      <Achivements />
    </div>
  )
}
