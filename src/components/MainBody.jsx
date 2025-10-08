import React from "react";
import MBdNav from "./MBdNav";
import { BrowserRouter, Routes ,Route} from "react-router-dom";
import Login from "./Login";
import WatchList from "./WatchList";
import Movie from "./Movie";
import Pro from "./Pro";
import Banner from "./Banner";




// import

function MainBody() {
  return (

<>
    {/* //     
//       <MBdNav />
// <WatchList/>
//       <Routes>
//         <Route path="/" element={<Login />}/>

//       </Routes>
//     </BrowserRouter> */}
<BrowserRouter>

{/* <Banner/> */}





<Routes>
<Route  path="/" element={<Banner/>}/>
<Route  path="/watchlist" element={<WatchList/>}/>
<Route  path="/login" element={<Login/>}/>
<Route path="/pro" element={<Pro/>}/>


</Routes>
</BrowserRouter>
</>
  );
}

export default MainBody;
