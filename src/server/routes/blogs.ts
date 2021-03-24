import { Router } from 'express';
import db from '../db';

const router = Router();

// GET REQUEST TO /API/BLOGS
router.get('/blogid?', async (req, res) => {

    const blogid = Number(req.params.blogid);

    try { 
        if(blogid) {
            const [blog] = await db.blogs.one(blogid);
            res.json(blog);
        } else{
            const blogs = await  db.blogs.all();
            res.json(blogs);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'get on my coding level, which is not good', error});
    }
    //res.json({ msg: 'TEST BLOGS GET' }); replaced with try/catch
});

// POST REQUEST TO /API/BLOGS
//REQUEST BODY: {title: string, content: string}
router.post('/', async (req, res) => {

    const newBlog = req.body;
    newBlog.authorid = 1;

    try { 
        const result = await db.blogs.insert(newBlog);
        res.json({msg: 'created!', id: result.insertID});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'get on my coding level, which is not good', error});
    }
    //res.json({ msg: 'TEST BLOGS POST' }); replaced with try/catch
});

// PUT REQUEST TO /API/BLOGS/1
//REQUEST BODY: {title: string, content: string}
router.put('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);
    const editedBlog = req.body;

    try { 
        const result = await db.blogs.update(editedBlog, blogid);
        res.json({msg: `blog ${blogid} edited`, aftectedRows: result.affectedRows});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'get on my coding level, which is not good', error});
    }
    //res.json({ msg: 'TEST BLOGS POST' }); replaced with try/catch
});

// Delete REQUEST TO /API/BLOGS/1
//REQUEST BODY: {title: string, content: string}
router.delete('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);

    try { 
        const result = await db.blogs.destroy(blogid);
        res.json({msg: `blog ${blogid} destroyed`, aftectedRows: result.affectedRows});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'get on my coding level, which is not good', error});
    }
});

export default router;