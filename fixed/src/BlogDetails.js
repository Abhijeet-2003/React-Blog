import { useParams, useHistory } from "react-router-dom";
import useFetch from './useFetch';
import { useState } from 'react';

const BlogDetails = () => {
    const {id} = useParams();
    const { data:blog, isPending, error } = useFetch('http://localhost:8000/blogs/'+id);
    const [delPending, setDelPending] = useState(false);
    const history=useHistory();

    const handleClick= () => {
        setDelPending(true);
        setTimeout(() => {
            fetch('http://localhost:8000/blogs/'+id, {
                method: 'DELETE'
            }).then(()=> {
                setDelPending(false);
                history.push('/');
            })
        }, 1000)
    }

    const handleEdit = () => {
        history.push(`/blogs/${id}/edit`);
    }

    return (
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div> {error} </div> }
            { blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By {blog.author}</p>
                    <div>{blog.body}</div>
                    { !delPending && <button onClick={handleClick}>Delete</button> }
                    { delPending && <button disabled>Deleting..</button> }
                    <button onClick={handleEdit}>Edit</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;