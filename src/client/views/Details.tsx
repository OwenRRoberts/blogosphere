import * as React from 'react';
import { useParams } from 'react-router-dom'
import type { IBlog } from '../utils/types';

const Details : React.FC<DetailsProps> = (props) => {
    const{ blogid } = useParams();
    const [blog, setBlog] = React.useState<IBlog>({} );

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            setBlog(blog);
        })()
    }, [])

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <h1 className="display-1 text-center">Details View {blogid}</h1>
                </div>
            </section>
        </main>
    )
}

interface DetailsProps{}

export default Details ;