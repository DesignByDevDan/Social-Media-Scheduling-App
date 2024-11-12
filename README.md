# Social Media Scheduling App

## Overview

This is a Social Media Scheduling App built with Next.js, React, and TypeScript. The app allows users to schedule posts, manage drafts, and generate AI-powered content for various social media platforms. The project is designed to enhance productivity and streamline the process of managing social media content.

## Features

- **Post Scheduling**: Users can schedule posts for specific times and dates.
- **Draft Management**: Users can create, edit, and save drafts for later use.
- **AI Content Generation**: Generate social media post ideas using AI.
- **User Authentication**: Integration with Twitter OAuth for authentication.
- **Modern UI/UX**: Built with Tailwind CSS and CopilotKit to provide an intuitive user experience.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, CopilotKit
- **Backend**: Node.js, API Routes with Next.js
- **Database**: Redis (for storing schedule data)
- **Authentication**: Twitter OAuth
- **Deployment**: Vercel or any cloud platform

## Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/DesignByDevDan/Social-Media-Scheduling-App.git
   cd Social-Media-Scheduling-App
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Create Environment Variables**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_API_KEY=your_copilot_api_key
   REDIS_URL=your_redis_url
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   ```

4. **Run the Application**

   ```sh
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Scheduling Posts**: Click on "Schedule Post" in the navigation bar to schedule a new post.
- **Managing Drafts**: Go to "View Drafts" to see saved drafts, edit, or delete them.
- **Generating Content**: Use the "Generate AI Content" feature to create content ideas for social media posts.

## Folder Structure

- `src/app/api` - Backend API routes for scheduling, drafts, and Twitter integration.
- `src/app/components` - React components for the app UI.
- `src/app/pages` - Pages for scheduling, drafts, and AI content generation.
- `src/app/dashboard` - Contains the dashboard components.

## Deployment

The app can be deployed on platforms like **Vercel** or **Netlify** for easy hosting.

1. Push the code to a remote repository (e.g., GitHub).
2. Link the repository to your hosting platform.
3. Set up the environment variables on the hosting platform.

## Contributing

Feel free to contribute to this project by forking the repository and creating a pull request. Contributions are welcome to improve functionality or enhance features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub**: [DesignByDevDan](https://github.com/DesignByDevDan)

## Acknowledgments

- The app leverages the power of **CopilotKit** for AI-powered text area enhancements.
- Inspired by productivity tools for managing social media efficiently.

---

**Note**: Make sure you have your Twitter developer credentials ready to integrate the OAuth feature.
