"use client"

import { GenericDataCardsSkeleton } from "@/components/pending/GenericDataCardsSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@/lib/nextjs/use-search";
import { Suspense } from "react";

interface UserTabsProps {

}

export function UserTabs({}:UserTabsProps){
const [tab,setTab] =useSearch("tab")
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <Tabs
      defaultValue={tab ?? "readme"}
      onValueChange={(value) => {
        setTab(value);
      }}
      className="w-full h-full ">
      <TabsList className="grid w-full grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-4 lg:grid-rows-1 ">
        <TabsTrigger value="repos">Repos</TabsTrigger>
        <TabsTrigger value="starred">Starred</TabsTrigger>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>

      <TabsContent value="repos" className="">
        <Suspense fallback={<div className="w-full h-full bg-base-200 skeleton">.</div>}>
          {/* <OneGithubRepoREADME owner={user} repo={repo} branch={defaultBranchName} /> */}
          {/* <UserRepos user_repos_key={query.user} /> */}
          <div className="text-2xl font-bold h-full flex items-center justify-center">Repos</div>
        </Suspense>
      </TabsContent>

      <TabsContent value="starred" className="">
        <Suspense fallback={<GenericDataCardsSkeleton />}>
          {/* <Branches data={query.repository} /> */}
          {/* <UserStarredRepos starred_repos_key={query.user} /> */}
          <div className="text-2xl font-bold h-full flex items-center justify-center">Starred</div>
        </Suspense>
      </TabsContent>

      <TabsContent value="followers" className="">
        <Suspense fallback={<GenericDataCardsSkeleton />}>
          {/* {query.user && <UserFollowersFragment followers_key={query.user} />} */}
          <div className="text-2xl font-bold h-full flex items-center justify-center">
            Followers
          </div>
        </Suspense>
      </TabsContent>
      <TabsContent value="following" className="">
        <Suspense fallback={<GenericDataCardsSkeleton />}>
          {/* {query.user && <UserFollowingFragment following_key={query.user} />} */}
          <div className="text-2xl font-bold h-full flex items-center justify-center">
            Following
          </div>
        </Suspense>
      </TabsContent>
    </Tabs>
  </div>
);
}
