import React from "react";
function ProfileComponent({ profile }) {
  return (
    <div>
      <div className=" relative w-[400px] h-[500px] rounded-md border-[2px] border-zinc-600 ">
        <div className="w-full h-[200px] bg-blue-500"></div>
        <div className="w-full h-[200px] border-b-[1px] border-zinc-400">
        <div className="absolute left-1/2 top-1/2 -translate-y-[50%] -translate-x-[50%] w-full flex flex-col items-center">
          <img
            className="w-[125px] h-[125px] rounded-full  "
            src={profile.profileUrl}
            alt={profile.username}
          />
          <div className="w-full  flex flex-col gap-2 items-center justify-center ">
            <div className="flex gap-3 r leading-none items-center">
            <span className="text-2xl font-semibold">{profile.username}</span>
            <span>{profile.age}</span>
            </div>
            <div>
                <span>{profile.city}</span>
            </div>
          </div>
        </div>
        </div>
        <div className="bg-red-200 w-full h-[96px] rounded-br-md flex items-center justify-evenly">
            <div className="flex flex-col items-center">
                <span className="text-xl font-semibold">{profile.followers}K</span>
                <span>Followers</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-semibold" >{profile.likes}K</span>
                <span>Likes</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-semibold" >{profile.posts}K</span>
                <span>Posts</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
