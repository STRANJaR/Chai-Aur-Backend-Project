import './App.css'

import { Link, Outlet } from 'react-router-dom'
import Header from './components/Header'
import SidearYT from './components/SidearYT'
import Container from './components/Container/Container'
import VideoCard from './components/VideoCard'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { setCredentials, } from './store/authSlice'





const videoData = [
  {
    "id": "1",
    "title": "Big Buck Bunny",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "Vlc Media Player",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    "subscriber": "25254545 Subscribers",
    "isLive": true
  },
  {
    "id": "2",
    "title": "The first Blender Open Movie from 2006",
    "thumbnailUrl": "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    "duration": "12:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "Blender Inc.",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "description": "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    "subscriber": "25254545 Subscribers",
    "isLive": true
  },
  {
    "id": "3",
    "title": "For Bigger Blazes",
    "thumbnailUrl": "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "T-Series Regional",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "description": "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    "subscriber": "25254545 Subscribers",
    "isLive": true
  },
  {
    "id": "4",
    "title": "For Bigger Escape",
    "thumbnailUrl": "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "T-Series Regional",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "description": " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    "subscriber": "25254545 Subscribers",
    "isLive": false
  },
  {
    "id": "5",
    "title": "Big Buck Bunny",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "Vlc Media Player",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    "subscriber": "25254545 Subscribers",
    "isLive": true
  },
  {
    "id": "6",
    "title": "For Bigger Blazes",
    "thumbnailUrl": "https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "T-Series Regional",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "description": "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    "subscriber": "25254545 Subscribers",
    "isLive": false
  },
  {
    "id": "7",
    "title": "For Bigger Escape",
    "thumbnailUrl": "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
    "duration": "8:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "T-Series Regional",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "description": " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    "subscriber": "25254545 Subscribers",
    "isLive": true
  },
  {
    "id": "8",
    "title": "The first Blender Open Movie from 2006",
    "thumbnailUrl": "https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp",
    "duration": "12:18",
    "uploadTime": "May 9, 2011",
    "views": "24,969,123",
    "author": "Blender Inc.",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "description": "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    "subscriber": "25254545 Subscribers",
    "isLive": false
  }
];


function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const user = JSON.parse(localStorage.getItem('user'))


    if (token && user) {
      try {
        const decodedToken = jwtDecode(token)


        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')

          console.log('removed token')
        } else {
          dispatch(setCredentials({ user, accessToken: token }));
        }
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
  }, [dispatch])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className='w-full h-auto'>
        <Header />
        <section className='grid grid-cols-5 '>
          <div className='col-start-1 col-end-2'>
            <SidearYT />
          </div>

          <div className='col-span-4'>

            <Container className=' flex flex-wrap p-3 '>
              {videoData && videoData.map((video) => (
                <Link to={video.videoUrl} className=' p-2' key={video.id}>

                  <VideoCard
                    // key={video.id}
                    channelName={video.author}
                    thumbnail={video.thumbnailUrl}
                    videoViews={video.views}
                    uploadTime={video.uploadTime}
                    videoTitle={video.title}
                  />
                </Link>

              ))}
            </Container>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
