import moment from 'moment';
import * as React from 'react';
import { useParams } from 'react-router-dom'
import type { IBlog } from '../utils/types';

const Details: React.FC<DetailsProps> = (props) => {
    const { blogid } = useParams();
    const [blog, setBlog] = React.useState<IBlog>(null);

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
                    <article className="card my-2 shadow">
                        <div className="card-body">
                            <h1 className="card-text text-center">{blog?.title}</h1>
                            <h4 className="card-text text-muted text-center mb-2">
                                Written on {moment(blog?._created).format} by {{ blog?.name}("MMM Do, YYYY")}
                            </h4>
                            <div className="card-text px-5">{blog?.content.split('\n').map((para, i) => (
                                <p key={`p-block-${i}`}>{para}</p>
                            ))}</div>
                            <div>
                                <link className="btn btn-outline-secondary" to="/">Go Back</link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

interface DetailsProps { }

export default Details;