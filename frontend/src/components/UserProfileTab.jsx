import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import TweetCard from "./TweetCard"
import UserUploadedVideos from "./User/UserUploadedVideos"



const UserProfileTab = () => {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-2">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="playlist">Playlist</TabsTrigger>
                <TabsTrigger value="tweet">Tweet</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
                <UserUploadedVideos/>
            </TabsContent>

            <TabsContent value="playlist">
                playlist
            </TabsContent>

            <TabsContent value="tweet">
                <TweetCard/>
            </TabsContent>

            <TabsContent value="following">
                following
            </TabsContent>
        </Tabs>
    )
}

export default UserProfileTab