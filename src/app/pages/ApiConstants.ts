export const Baseurl = "http://192.168.43.80:3000/api/"
export const BaseurlMobile = "http://192.168.43.80:3000/api/"

export const LoginApi ="users/validate"
export const ReadApi ="users/validateread"

export const TrendingApi="users/update"
export const InnovationApi="users/updateinnovation"
export const ItApi="users/updateit"
export const TrainingApi="users/updatetraining"
export const PeopleApi="users/updatepeople"
export const CurrentApi="users/updatecurrent"
export const AccoladesApi="users/updateaccolades"

export const AddpostApi ="posts/addpost"
export const AddApprovedPostApi="ApprovedPosts/approvepost"
export const InboxPostApi="posts/inboxPosts"
export const MessagesCountApi="posts/messagecount"
export const CategoryCountApi="ApprovedPosts/categorycount"
export const AddApprovedPostApiList="ApprovedPosts/acceptedposts"
export const FilterPostsApi="ApprovedPosts/filter"
export const ImagePost="http://192.168.43.80:3000/attachment"
export const DeletePostApi="posts/delete"
export const AddlikeApi="likes/addlike"
export const likecountApi="likes/likecount"
export const AddcommentApi="comments/addcomments"
export const CommentsListApi="comments/commentsList"
export const CommentsCountApi="comments/commentscount"
export interface PostsDesc{
category:string;
title:string;
description:string;
attachment:string;
}