import React, {useState, useEffect} from 'react';
import OpacPagination from './OpacPagination'
import OpacPost from './OpacPost'

const OpacModule = ({data,getTextValue}) => {
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false)
const [currentPage, setCurrentPage] = useState(1)
const [hidePagination, setHidePagination] = useState(false)
const [postsPerPage] = useState(19);


useEffect(() => {
   

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);

        setPosts(data)
        setLoading(false)


        if(data.length <=20){
          console.log("20 answer :- ",data.length)
          setHidePagination(false)
        }else{
          setHidePagination(true)
          console.log("50 answer")
        }


  };



  //GET CURRENT POSTS

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log("check :- ",posts)


  //CHANGE PAGE

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <OpacPost posts={currentPosts} loading={loading} getTextValue={getTextValue}
      />
      {hidePagination && (

        <OpacPagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
      )}
    </>
  )
}

export default OpacModule
