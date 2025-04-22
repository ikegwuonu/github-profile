# GitHub User Search

A simple, responsive application that allows users to search for GitHub profiles using the GitHub API.

## Features

- Search for GitHub users by username
- View user profile information including:
  - Avatar
  - Name
  - Bio
  - Public repositories count
  - Followers
  - Link to GitHub profile
- Responsive design for both desktop and mobile
- Debounced search to minimize API calls
- Error handling for user not found and other errors
- Loading states for better user experience

## Tech Stack

- **Next.js**: React framework for building the application
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **shadcn/ui**: For UI components
- **Lucide React**: For icons

## Setup and Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/github-user-search.git
   cd github-user-search
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/page.tsx`: Main page component with search functionality
- `components/user-profile.tsx`: Component to display user profile information
- `hooks/use-debounce.tsx`: Custom hook for debouncing search input

## Implementation Details

### Search Functionality
The application uses a debounced search input to prevent making API calls on every keystroke. The debounce delay is set to 500ms, which provides a good balance between responsiveness and API efficiency.

### API Integration
The application fetches user data from the GitHub API using the endpoint `https://api.github.com/users/{username}`. No API key is required for basic usage, but rate limits apply.

### Error Handling
The application handles various error states:
- User not found (404)
- Network errors
- Other API errors

Each error is displayed to the user with a clear message.

### Responsive Design
The UI is fully responsive and works well on both desktop and mobile devices:
- Card layout adjusts for different screen sizes
- Avatar and user information reorganize on smaller screens
- Search input and buttons are optimized for touch interfaces

## Thought Process

When building this application, I focused on:

1. **User Experience**: Creating a clean, intuitive interface that makes it easy to search for and view GitHub profiles.

2. **Performance**: Implementing debouncing to reduce unnecessary API calls and optimize performance.

3. **Error Handling**: Ensuring the application gracefully handles all potential error states and provides clear feedback to users.

4. **Code Quality**: Using TypeScript for type safety, organizing code into reusable components, and following best practices for React and Next.js development.

5. **Responsive Design**: Making sure the application looks and works great on all device sizes.

## Future Improvements

- Add pagination for repositories
- Implement dark mode
- Add more detailed user information
- Save recent searches
- Add authentication to increase API rate limits

## License

MIT
