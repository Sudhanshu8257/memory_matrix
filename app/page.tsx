import Grid from "@/components/memoryMatrix/Grid";
import Image from "next/image";

export default function Home() {
  return (
    <div  className="relative w-full h-screen flex items-center justify-center">
      <Image
        fill
        quality={100}
        priority
        alt="nature"
        src="/assets/background/Halloween.jpg"
      />
      <div className="w-full h-full absolute top-0 right-0 bg-black bg-opacity-70 backdrop-blur-sm" />
      <Grid />
    </div>
  );
}

/*
TODO
UI
THEME SELECTOR => desert haloween iceland ....
game won (confetti and trumpet)
dificulty selector => 4X4 , 6X6 , 8x8
score target
icons
pair match (a golden border to be show for matched pair)
responsiveness
sounds
hint
timer 
score
share highscore functionality
leaderboard + leaderboard page
landing page
*/
