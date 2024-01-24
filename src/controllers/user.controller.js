import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'


//  ***GENERATE ACCESS REFRESH TOKEN 
const generateAccessRefreshTokens = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Somethign went wrong while generating referesh and access token")
    }
}


// ***REGISTER USER 
const registerUser = asyncHandler( async (req, res)=>{
    /*

    // Algorithm while registering the user 

     step 1: get user details from frontend
     step 2: validation - not empty
     step 3: check if user already exists: username, email 
     step 4: check for images, check for avatar
     step 5: upload them to cloudinary, avatar 
     step 6: create user oject - create entry in db 
     step 7: remove password and refresh token field from response 
     step 8: check for user creation 
     step 9: return response 

     */



    // step 1: get user details from forntend
    const {fullName, email, username, password } = req.body
    console.log("Email: ", email)

    // step 2: validation - not empty 
    if(fullName === "") throw new ApiError(400, "Fullname is required")
    else if(email === "") throw new ApiError(400, "Email is required")
    else if(username === "") throw new ApiError(400, "username is required")
    else if(password === "") throw new ApiError(400, "Password is required")

    // step 3: check if user already exists: username , email 
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) throw new ApiError(409, "User with email or username already exists !")

    // step 4: check for images, avatar 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath) throw new ApiError(400, 'Avatar file is required')

    // step 5: upload them to cloudinary, avatar 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) throw new ApiError(400, 'Avatar file is required')

    // step 6: create user obj: create entry in db 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    // step 7: remove password and refreshToken field form response 
    const createdUser = await User.findById(user._id).select(
        // "-what_i_don't_want_into_response"
        "-password -refreshToken"
    )

    // step 8: check for user creation 
    if(!createdUser) throw new ApiError(500, "Something went wrong while registering the user");

    // step 9: return response 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully !")
    )
}); 


// ***LOGIN USER 
const loginUser = asyncHandler(async (req, res)=>{
    /*
    // Algorithm while login user 

    step 1: req body -> data 
    step 2: username or email
    step 3: password check 
    step 4: access and refresh token 
    step 5: send cookie 

    */

    // step 1: req body -> data 
    const {email, username, password} = req.body
    console.log(email)

    // step 2: username or email condition check
    if(!username && !email) throw new ApiError(400, "username and password is required ")
    
    const userValidation = await User.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    })

    if(!userValidation) throw new ApiError(404, "User does not exist")

    // step 3: password check 
    const isPasswordValid = await userValidation.isPasswordCorrect(password)

    if(!isPasswordValid) throw new ApiError(400, "Invalid user credentials")

    // step 4: access and refresh token 
    const {accessToken, refreshToken} = await generateAccessRefreshTokens(userValidation._id)

    const loggedInUser = await User.findById(userValidation._id).
    select("-password -refreshToken")

    // step 5: send cookie 
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.
    status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})


// ***LOG OUT USER 
const logoutUser = asyncHandler( async (req, res)=>{
    

    // find user current user
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }

    )

    // remove cookies 
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged Out Successfully"
        )
    )
})



// ***REFRESH ACCESS TOKEN 
const refreshAccessToken = asyncHandler( async(req, res)=>{
    // access cookie for refresh token 
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) throw new ApiError(401, "unauthorized request")

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
        
        if(!user) throw new ApiError(401, "Invalid refresh Token")
    
        if(incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used")
    
        const options = {
            httpOnly: true,
            secure: true
        }
        const {accessToken, newRefreshToken} = await generateAccessRefreshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshAccessToken)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})


// ***UPDATE PASSWORD 
const changeCurrentUserPassword = asyncHandler( async(req, res)=>{
    // require old and new password from user 
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?.id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect) throw new ApiError(400, "Invalid Old Password")

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password updated successfully"
        )
    )
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentUserPassword,
}