import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const PostDetails = (props) => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { post, posts, setPosts } = props
    const [userFromPost1, setuserFromPost1] = useState({})

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/user/" + post.user)
            .then((res) => {
                setuserFromPost1(res.data.user)
                setLoaded(true)
            }, [])
    })

    const deletePost = (postId) => {
        axios.delete(`http://localhost:8000/api/post/${postId}/delete`)
            .then(() => { setPosts(posts.filter(post => post._id !== postId)) })
    }
    return (
        <Card

            sx={{ margin: '1rem 0 1.5rem 3rem', width: '30vw', height: '70vh' }}
            elevation={3}
        >
            <CardHeader
                avatar={
                    <Avatar alt="MB" src="/static/images/avatar/2.jpg" />
                }
                title={userFromPost1.name}
                subheader={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                action={
                    <IconButton>
                        <DeleteOutlineIcon
                            fontSize="medium"
                            sx={{ color: "#181D31" }}
                            onClick={() => deletePost(post._id)}
                        />
                    </IconButton>
                }
            />
            <CardMedia
                component="img"
                height="55%"
                image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Paella dish"
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                </IconButton>
                <Button
                    startIcon={<ModeCommentIcon />}
                    size="large"
                    sx={{ color: '#063970' }}
                    onClick={!user ? () => navigate(`/login`) : () => navigate(`/post/${post._id}`)}
                ></Button>

            </CardActions>
        </Card >

    );
};

export default PostDetails;