## Features :

    - User can browse through different Blogs
        - Personal : posts from people you follow
        - Explore
    - User can create blogs
        - AI assistance for writing
        - Image uploads
        - unsplash api integration for images
        - Feature rich editor for best writing experience.

# AIdeate

AIdeate is an AI-assisted blogging platform that allows users to create, explore, and share blogs. With its AI writing assistance and feature-rich editor, users can craft compelling content effortlessly. The platform also integrates image uploads and Unsplash API to enhance blog visuals.

## Features

### Explore Blogs

- **Personal Feed:** See posts from people you follow.

- **Explore Section:** Discover trending and interesting blogs from across the platform.

### Create Blogs

- **AI Writing Assistance:** Leverage AI to brainstorm ideas, generate content, and refine your blogs.

- **Image Uploads:** Enhance your blogs by uploading custom images.

- **Unsplash API Integration:** Access a vast library of high-quality images directly within the editor.

- **Feature-Rich Editor:** Enjoy an intuitive and powerful text editor for the best writing experience.

## Setting Up the Project

Follow these steps to set up AIdeate on your local system:

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)

- npm (or yarn)

- PostgreSQL

### Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/AIdeate.git
cd AIdeate
```

2. **Install Dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set Up Environment Variables:**
   There are two environment variable files used in the project: ==.env== and ==.env.local==. Example versions of these files (==.env.example== and ==.env.local.example==) are included in the repository. Copy and modify these files as needed:

```bash
cp .env.example .env
cp .env.local.example .env.local
```

Update the following variables in the respective files:

```bash
DATABASE_URL=your_postgresql_database_url
UNSPLASH_ACCESS_KEY=your_unsplash_api_access_key
AI_API_KEY=your_ai_service_api_key
```

4. **Run Database Migrations:**
   Use Prisma to set up the database schema:

```bash
npx prisma migrate dev
```

5. **Start the Development Server:**

```bash
npm run dev
# or
yarn dev
```

6. **Access the Application:**
   Open http://localhost:3000 in your browser to access AIdeate.

### Testing the Setup

- Check the logs to ensure the server is running without errors.

- Verify database connectivity by creating a sample blog.

## Contributing

We welcome contributions to AIdeate! If you'd like to report a bug, request a feature, or submit a pull request, please refer to our Contributing Guidelines.
