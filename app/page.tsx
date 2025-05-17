import Grid from "@/components/memoryMatrix/Grid";
import { ThemeSelector } from "@/components/memoryMatrix/theme-selector";

export default function Home() {
  return (
    <div className="relative theme-background w-full h-screen flex items-center justify-center">
      <div className="w-full h-full absolute top-0 right-0 z-0 bg-black bg-opacity-70 backdrop-blur-sm" />
      <div className="w-full h-full flex flex-col items-center justify-center z-[5]">
        <ThemeSelector />

        <Grid />
      </div>
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

/*
context 
=> difficulty (4X4 , 6X6 , 8x8)
=> theme (Halloween , Nature , Snow ,Underwater)
=> game start 
=> game end
=> timer 
=> moves
*/

/* 
To Ship faster 


landing page Basic 
about page 
user flow  
  start Game => choose difficulty => choose theme => game start => game end 
score history setup basic from local storage
responsiveness
*/
