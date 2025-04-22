"use client";

import { ExternalLink, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

interface UserProfileProps {
  user: GitHubUser;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-gray-700 to-gray-900"></div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <div className="relative w-24 h-24 md:w-32 md:h-32 -mt-16 md:-mt-20 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                priority
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold">
              {user.name || user.login}
              {!user.name && (
                <span className="text-gray-500 ml-2">({user.login})</span>
              )}
            </h2>

            {user.name && <p className="text-gray-500 mb-4">@{user.login}</p>}

            {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{user.public_repos}</span>
                <span className="text-gray-600">Repositories</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{user.followers}</span>
                <span className="text-gray-600">Followers</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => window.open(user.html_url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              View GitHub Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
