import React, { useState } from 'react'
import axios from 'axios'

function Home() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [coverImage, setCoverImage] = useState('') 

  console.log(name, username, password, email, avatar, coverImage);


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        fullname,
        username, 
        email,
        password,
        avatar,
        coverImage
      }

      axios.post(`http://localhost:8000/api/v1/users/register`, userData)
      .then((response)=> console.log(response.data))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <section className='bg-red-200 h-screen w-full'>
      <h1>hello</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:  
          <input 
          onChange={(e)=> setFullname(e.target.value)} 
          value={fullname}
          type="text" />
        </label>

        <label htmlFor="username">Username: 
        <input
        value={username}
        onChange={(e)=> setUsername(e.target.value)} 
        type="text" />
        </label>

        <label htmlFor="email">Email: 
          <input 
          value={email}
        onChange={(e)=> setEmail(e.target.value)} 
          type="email" name="" id="" />
        </label>

        <label htmlFor="password"> Password: 
          <input 
          value={password}
        onChange={(e)=> setPassword(e.target.value)} 
          type="password" name="" id="" />
        </label>

          <br />

        <label htmlFor="avatar"> Avatar: 
          <input 
          value={avatar}
        onChange={(e)=> setAvatar(e.target.files[0])} 
          type="file" name="" id="" />
        </label>
        <label htmlFor="coverImage">CoverImage: 
        <input 
        value={coverImage}
        onChange={(e)=> setCoverImage(e.target.files[0])} 
        type="file" name="" id="" /></label>

          <input type="submit" value="Submit" />
      </form>
    </section>
    </>
  )
}

export default Home