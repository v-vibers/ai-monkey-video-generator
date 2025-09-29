# 🐵 AI Monkey Video Generator

Create amazing AI-generated videos featuring monkeys in any scenario you can imagine! Built with React, TypeScript, Vite, and powered by Subscribe.dev.

## Features

- 🎬 **AI-Powered Video Generation**: Generate high-quality monkey videos using state-of-the-art AI models
- ⚡ **Fast Generation**: Get your videos in 30-60 seconds
- 💎 **Premium Quality**: Professional-grade video output with 16:9 aspect ratio
- 💾 **Cloud Storage**: Your videos are automatically saved and synced across devices
- 📊 **Usage Tracking**: Monitor your credits and plan status
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **AI Platform**: Subscribe.dev (Access to 100+ AI models)
- **Video Model**: wan-video/wan-2.2-5b-fast
- **Styling**: Custom CSS with gradients and animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Subscribe.dev account and project token

### Installation

1. Clone the repository:
```bash
git clone https://github.com/v-vibers/ai-monkey-video-generator.git
cd ai-monkey-video-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_SUBSCRIBE_DEV_PROJECT_TOKEN=your_project_token_here
```

Get your project token from [Subscribe.dev Dashboard](https://subscribe.dev)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Sign In**: Click the "Sign In to Start Generating" button to authenticate
2. **Enter Prompt**: Describe what you want the monkey to do (e.g., "playing basketball", "dancing in the rain", "coding on a computer")
3. **Generate**: Click "Generate Video" and wait 30-60 seconds
4. **View & Download**: Your generated video will appear in the gallery below, where you can watch, download, or delete it

## Project Structure

```
src/
├── components/
│   ├── AuthenticatedApp.tsx    # Main app with video generation
│   └── UnauthenticatedApp.tsx  # Sign-in screen
├── App.tsx                      # Root component with auth routing
├── App.css                      # Application styles
├── main.tsx                     # Entry point with SubscribeDevProvider
└── index.css                    # Global styles
```

## Key Features Explained

### Authentication
- Uses Subscribe.dev's built-in authentication
- Component separation pattern for React Hooks compliance
- Automatic session management

### Video Generation
- Prompts are enhanced with monkey-specific details for better results
- Error handling for insufficient credits, rate limits, and network errors
- Loading states with animations and progress indicators

### Cloud Storage
- Videos are persisted using Subscribe.dev's cloud storage
- Automatic synchronization across devices
- Sync status indicators (local, syncing, synced, error)

### Error Handling
- **Insufficient Credits**: Prompts user to upgrade subscription
- **Rate Limit**: Shows countdown timer and disables generation
- **Network Errors**: Provides retry button

### Subscription Management
- Display current plan and credits
- One-click access to Stripe-powered billing portal
- Real-time usage tracking

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUBSCRIBE_DEV_PROJECT_TOKEN` | Your Subscribe.dev project token | Yes |

## Development Notes

- **React 18 Required**: This app requires React 18.x (React 19+ is not compatible with Subscribe.dev SDK)
- **Component Separation**: Uses proper component separation to avoid React Hooks rules violations
- **Type Safety**: Full TypeScript support for better developer experience

## Troubleshooting

### "Invalid token" or JWT errors
- Ensure your project token is correct and starts with `pub_`
- Verify the token is properly set in your `.env` file
- Restart the dev server after changing `.env`

### Videos not saving
- Check the sync status indicator in the stats bar
- Ensure you're signed in
- Check browser console for errors

### Generation failing
- Check your remaining credits in the stats bar
- Verify you're not rate-limited (retry timer will show if you are)
- Try a different prompt or check your internet connection

## License

MIT

## Credits

Built with [Subscribe.dev](https://subscribe.dev) - The platform for AI-powered applications

---

*Generated with [VGit](https://vgit.app) 🤖*
