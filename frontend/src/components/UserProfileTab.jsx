import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs"
import UserUploadedVideos from "./User/UserUploadedVideos"



const UserProfileTab = () => {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-2">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="playlist">Playlist</TabsTrigger>
                <TabsTrigger value="watch-history">Watch History</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
                <UserUploadedVideos/>
            </TabsContent>

            <TabsContent value="playlist">
                playlist
            </TabsContent>

            <TabsContent value="watch-history">
                WatchHistory
            </TabsContent>

            <TabsContent value="following">
                following
            </TabsContent>
        </Tabs>
    )
}

export default UserProfileTab