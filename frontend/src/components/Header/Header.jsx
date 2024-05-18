import {useEffect, useRef, useContext} from 'react';
import { authContext } from '../../context/AuthContext';

const navLinks = [
{
 // if you want,  add nav links
},
];

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user,role,token} = useContext(authContext)

  const handleStickyHeader = () =>{
    window.addEventListener('scroll', () =>{
      if(document.body.scrollTop > 80 ||document.documentElement.scroll > 80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(() =>{
    handleStickyHeader()

    return () =>window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

  return ( 
  <header className='header flex items-center' ref={headerRef}>
   <div className='container'>
    <div className='flex items-center justify-between'>
        {/*============== logo ================= */ }
        <div>
          <h1>Ceciliyan</h1>
        </div>

    

   </div> 
   </div>
   </header>
   );
};

export default Header;
