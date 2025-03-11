import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
import PostCode from '../PostCode/PostCode';
import PostPage from '../Post_Query/PostQuery';

const initialPosts = [
  {
    _id: '1',
    userPhoto: '/images/user1.jpg',
    userName: 'John Doe',
    userTitle: 'Software Engineer',
    timeStamp: '2h ago',
    content: 'This is my first post!',
    likes: 10,
    comments: ['Nice work!', 'Great post!'],
    commentText: '',
    liked: false,
    showCommentBox: false
  },
  {
    _id: '2',
    userPhoto: '/images/user2.jpg',
    userName: 'Jane Smith',
    userTitle: 'Product Manager',
    timeStamp: '1d ago',
    content: 'Anyone working on React projects?',
    likes: 5,
    comments: ['Yes, I am!', 'React is awesome!'],
    commentText: '',
    liked: false,
    showCommentBox: false
  }
];

const PostCreation = () => {
  const [type, setType] = useState('post');
  const [posts, setPosts] = useState(initialPosts);

  const handleCreatePost = (newPost) => {
    setPosts([
      {
        ...newPost,
        _id: `${posts.length + 1}`,
        userPhoto: '/images/user1.jpg',
        userName: 'John Doe',
        userTitle: 'Software Engineer',
        timeStamp: 'Just now',
        likes: 0,
        comments: [],
        liked: false,
        showCommentBox: false
      },
      ...posts
    ]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Card for creating post */}
      <Card className="rounded-xl shadow-lg bg-white border border-gray-200 mb-4">
        <CardContent>
          {/* Tabs */}
          <Tabs value={type} onValueChange={setType} className="mb-4">
            <TabsList className="flex justify-center space-x-2 bg-gray-100 p-1 rounded-md">
              <TabsTrigger value="post" className={type === 'post' ? 'bg-blue-500 text-white' : 'text-gray-700'}>
                Post
              </TabsTrigger>
              <TabsTrigger value="code" className={type === 'code' ? 'bg-blue-500 text-white' : 'text-gray-700'}>
                Code
              </TabsTrigger>
              <TabsTrigger value="query" className={type === 'query' ? 'bg-blue-500 text-white' : 'text-gray-700'}>
                Query
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Post Code Component */}
          <PostCode closePost={() => console.log('Closed')} handleCreatePost={handleCreatePost} type={type} />
        </CardContent>
      </Card>

      {/* Display Posts */}
      <PostPage posts={posts} />
    </div>
  );
};

export default PostCreation;
