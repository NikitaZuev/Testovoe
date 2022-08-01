import {post} from '../../types/post'


function Posts(props:any):JSX.Element{
  return(
    <>
      {props.posts.map((post:any)=>
        <tr key={post.id}>
          <td className='table__id'>{post.id}</td>
          <td className='table__title'>{post.title}</td>
          <td className='table__body'>{post.body}</td>
          <td>qwe</td>
        </tr>
      )}
    </>

  )
}
export default Posts;
