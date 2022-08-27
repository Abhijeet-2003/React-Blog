import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
    const [title, setTitle]= useState('');
    const [body, setBody]= useState('');
    const [author, setAuthor]= useState('mario');
    const [isPending, setIsPending]= useState(false);
    const history= useHistory();
    const {id} = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog={title, body, author};

        setIsPending(true);

        setTimeout(() => {
            fetch('http://localhost:8000/blogs/'+id, {
            // method: 'UPDATE',
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(blog)
            }).then(() => {
                setIsPending(false);
                history.push(`/blogs/${id}`);
            })
        },1000)
        
    }

    return (
        <div className="create">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                 type="text"
                 required 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                 required
                 value={body}
                 onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Edit Blog</button> }
                { isPending && <button disabled>Editing..</button> }
            </form>
        </div>
    );
}
 
export default Edit;