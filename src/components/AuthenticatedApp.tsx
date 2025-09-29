import { useState } from 'react'
import { useSubscribeDev } from '@subscribe.dev/react'

interface VideoGeneration {
  id: string
  prompt: string
  videoUrl: string
  generatedAt: number
}

interface ErrorState {
  type: string
  message: string
  retryAfter?: number
}

function AuthenticatedApp() {
  const {
    client,
    usage,
    subscribe,
    subscriptionStatus,
    signOut,
    user,
    useStorage
  } = useSubscribeDev()

  const [videos, setVideos, syncStatus] = useStorage!<VideoGeneration[]>('monkey-videos', [])
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<ErrorState | null>(null)
  const [retryTimer, setRetryTimer] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!client || !prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      // Generate monkey video using wan-video model
      const monkeyPrompt = `A monkey ${prompt.trim()}. High quality, cinematic, detailed monkey features, realistic fur texture, expressive face`

      const { output } = await client.run('wan-video/wan-2.2-5b-fast', {
        input: {
          prompt: monkeyPrompt,
          aspect_ratio: '16:9'
        }
      })

      const videoUrl = output[0] as string
      const newVideo: VideoGeneration = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        videoUrl,
        generatedAt: Date.now()
      }

      setVideos([newVideo, ...videos])
      setPrompt('')
    } catch (err: any) {
      console.error('Video generation failed:', err)

      if (err.type === 'insufficient_credits') {
        setError({
          type: 'insufficient_credits',
          message: 'You don\'t have enough credits. Upgrade your plan to continue generating videos.'
        })
      } else if (err.type === 'rate_limit_exceeded') {
        const retryAfterMs = err.retryAfter || 60000
        setError({
          type: 'rate_limit_exceeded',
          message: 'Rate limit exceeded. Please wait before generating another video.',
          retryAfter: retryAfterMs
        })

        // Start countdown timer
        let remainingTime = Math.ceil(retryAfterMs / 1000)
        setRetryTimer(remainingTime)

        const interval = setInterval(() => {
          remainingTime--
          if (remainingTime <= 0) {
            clearInterval(interval)
            setRetryTimer(null)
            setError(null)
          } else {
            setRetryTimer(remainingTime)
          }
        }, 1000)
      } else {
        setError({
          type: 'unknown',
          message: err.message || 'Failed to generate video. Please try again.'
        })
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault()
      handleGenerate()
    }
  }

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id))
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">🐵 AI Monkey Video Generator</h1>
            {user && <p className="user-email">{user.email}</p>}
          </div>
          <div className="header-right">
            <button onClick={signOut} className="btn-secondary">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Credits</span>
            <span className="stat-value">{usage?.remainingCredits ?? 0}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Plan</span>
            <span className="stat-value">{subscriptionStatus?.plan?.name ?? 'Free'}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Status</span>
            <span className={`stat-badge ${subscriptionStatus?.status}`}>
              {subscriptionStatus?.status ?? 'none'}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Sync</span>
            <span className={`stat-badge ${syncStatus}`}>{syncStatus}</span>
          </div>
          <button onClick={subscribe!} className="btn-primary btn-small">
            Manage Subscription
          </button>
        </div>

        {/* Generator Section */}
        <div className="generator-section">
          <div className="generator-card">
            <h2>Generate Monkey Video</h2>
            <p className="generator-help">
              Describe what you want the monkey to do. Be creative!
            </p>

            <div className="input-group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="e.g., playing basketball, dancing in the rain, coding on a computer, skateboarding..."
                className="prompt-input"
                rows={3}
                disabled={isGenerating || retryTimer !== null}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim() || retryTimer !== null}
                className="btn-primary btn-large"
              >
                {isGenerating ? (
                  <>
                    <span className="spinner"></span>
                    Generating...
                  </>
                ) : retryTimer !== null ? (
                  `Retry in ${retryTimer}s`
                ) : (
                  'Generate Video'
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className={`error-message ${error.type}`}>
                <span className="error-icon">⚠️</span>
                <div className="error-content">
                  <p>{error.message}</p>
                  {error.type === 'insufficient_credits' && (
                    <button onClick={subscribe!} className="btn-primary btn-small">
                      Upgrade Now
                    </button>
                  )}
                  {error.type === 'rate_limit_exceeded' && retryTimer && (
                    <p className="retry-timer">Retry in {retryTimer} seconds</p>
                  )}
                  {error.type === 'unknown' && (
                    <button onClick={handleGenerate} className="btn-secondary btn-small">
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isGenerating && (
              <div className="loading-state">
                <div className="loading-animation">
                  <span className="loading-monkey">🐵</span>
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <p>AI is generating your monkey video...</p>
                <p className="loading-subtext">This usually takes 30-60 seconds</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Gallery */}
        <div className="gallery-section">
          <h2>Your Monkey Videos ({videos.length})</h2>

          {videos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎬</span>
              <h3>No videos yet</h3>
              <p>Generate your first monkey video above!</p>
            </div>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-wrapper">
                    <video
                      src={video.videoUrl}
                      controls
                      className="video-player"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="video-info">
                    <p className="video-prompt">{video.prompt}</p>
                    <p className="video-date">
                      {new Date(video.generatedAt).toLocaleString()}
                    </p>
                    <div className="video-actions">
                      <a
                        href={video.videoUrl}
                        download={`monkey-${video.id}.mp4`}
                        className="btn-secondary btn-small"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AuthenticatedApp