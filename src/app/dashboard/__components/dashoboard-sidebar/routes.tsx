import {  User } from "lucide-react";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
export const routes  = [
  { name: "profile", href: "/", icon: <User /> },
  { name: "repositories", href: "/repositories", icon: <RiGitRepositoryCommitsLine /> },
] as const
