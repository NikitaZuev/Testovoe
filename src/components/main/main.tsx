import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect} from 'react';
import {getPageCount} from '../../utils/pages'
import Posts from '../posts/posts'
import {post} from '../../types/post'
import PostService from '../../API/PostService' 
import { usePosts } from '../../hooks/usePosts'; 
import FootNavigations from '../pages/footNavigations';

function Main():JSX.Element{

  const [posts,setPosts] = useState<post[]>([] as post[]);
  const [sort, setSort] = useState('');
  const [click,setClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPosts, setTotalPosts] = useState(0); 
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPoost = usePosts(posts,sort,searchQuery,click);


  async function data() {
      const response = await PostService.getAll(limit,page);
      setPosts(response.data)
      const totalCount = parseInt(response.headers['x-total-count'])
      setTotalPosts(getPageCount(totalCount,limit))
  }

  useEffect(()=>{
    data();
  },[page])

  const changePage = (page:number) =>{

      setPage(page)
    }
  
  const pagePrev = (page:number) =>{
    page != 1 ? setPage(page-1) : setPage(1)
  }
  const pageNext = (page:number) =>{
    page != totalPosts ? setPage(page+1) : setPage(page)
  }
  const sortClick = (event: React.MouseEvent)=>{
    setSort((event.target as Element).id);
    click == false ? setClick(true) : setClick(false)
  }
  const searchLimit = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchQuery(event.target.value)
    if((event.target.value) != ''){
      setLimit(100);
      setPage(0)
    }
    else{
      setLimit(10);
      setPage(1)
    }
  }

  return(
    <section>
      <div className='input__box'>
        <input type="text" placeholder='Поиск' value={searchQuery} onChange={e => searchLimit(e)}></input>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th className='table__id' id={'id'} onClick={event=>sortClick(event)}>ID <ExpandMoreIcon/></th>
              <th id={'title'} onClick={event=>sortClick(event)}>Заголовок<ExpandMoreIcon/></th>
              <th id={'body'} onClick={event=>sortClick(event)}>Описание<ExpandMoreIcon/></th>
            </tr>
            <Posts posts={sortedAndSearchedPoost}/>
          </tbody>
        </table>
      </div>
      <FootNavigations page={page} changePage={changePage} pagePrev={pagePrev} pageNext={pageNext} totalPosts={totalPosts} />
    </section>
  );}
export default Main;