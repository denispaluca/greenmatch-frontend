import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useStoreState} from "../../state";
import {Header} from "../Header/Header";

export function Layout(){
  const loggedIn = useStoreState('loggedIn');
  const navigate = useNavigate();

  useEffect(()=>{
    if(!loggedIn){
      navigate('/login');
    }
  },[loggedIn, navigate]);
  
  return(
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
