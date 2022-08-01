import { usePagination } from "../../hooks/usePagination";
import {Pages} from '../../types/pages'
import { Link } from 'react-router-dom';

function FootNavigations({page,changePage,totalPosts,pagePrev,pageNext}:Pages):JSX.Element{
  const pages = usePagination(totalPosts)
  return(
    <div className='foot__navigation'>
      <Link to={`/${page-1}`}><button onClick={()=> pagePrev(page)}>Назад</button></Link> 
      <div>
        {pages.map((p:number)=>
         <Link  key={p} to={`/${p}`}><button onClick={()=> changePage(p)} className={page === p || page === 0 ? 'page__number active' : 'page__number'}>{p}</button></Link> 
        )}
      </div>
     <Link to={`/${page+1}`}><button onClick={()=> pageNext(page)}>Далее</button></Link> 
    </div>
  )
}
export default FootNavigations;