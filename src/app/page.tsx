"use client";

import type React from "react";

import { useState } from "react";
import { Search, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserProfile from "@/components/user-profile";
import useDebounce from "@/hooks/use-debounce";

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce the search input to avoid making API calls on every keystroke
  const debouncedUsername = useDebounce(username, 500);

  // Function to fetch GitHub user data
  const fetchUser = async (username: string) => {
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${debouncedUsername}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUser(username);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          GitHub User Search
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading || !username.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}

        {error && !isLoading && (
          <Card className="p-6 text-center bg-red-50 border-red-200">
            <div className="text-red-500 mb-2 font-medium">Error</div>
            <p>{error}</p>
          </Card>
        )}

        {user && !isLoading && !error && <UserProfile user={user} />}

        {/* Empty State */}
        {!user && !isLoading && !error && (
          <Card className="p-8 text-center bg-gray-50 border-gray-200">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              No User Found
            </h2>
            <p className="text-gray-500">
              Enter a GitHub username to see their profile information
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
