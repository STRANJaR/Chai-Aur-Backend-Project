import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ videoId, userId, initialLikes, isLikedByUser }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(isLikedByUser);

    const handleLike = async () => {
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);

        try {
            const response = await axios.post(`/api/videos/${videoId}/like`, { userId });
            console.log(response.data.message); // You can handle additional logic here if needed
        } catch (error) {
            console.error('Error updating like:', error);
            setLikes(liked ? likes + 1 : likes - 1);
            setLiked(liked);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>
                {liked ? 'Unlike' : 'Like'} ({likes})
            </button>
        </div>
    );
};

export default LikeButton;
