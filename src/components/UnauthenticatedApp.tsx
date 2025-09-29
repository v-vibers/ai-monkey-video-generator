import { useSubscribeDev } from '@subscribe.dev/react'

function UnauthenticatedApp() {
  const { signIn } = useSubscribeDev()

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🐵 AI Monkey Video Generator</h1>
          <p className="auth-description">
            Create amazing AI-generated videos featuring monkeys in any scenario you can imagine!
          </p>
        </div>

        <div className="auth-features">
          <div className="feature">
            <span className="feature-icon">🎬</span>
            <div>
              <h3>AI-Powered Videos</h3>
              <p>Generate high-quality monkey videos with AI</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <div>
              <h3>Fast Generation</h3>
              <p>Get your videos in seconds</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">💎</span>
            <div>
              <h3>Premium Quality</h3>
              <p>Professional-grade video output</p>
            </div>
          </div>
        </div>

        <button onClick={signIn} className="btn-primary btn-large">
          Sign In to Start Generating
        </button>

        <p className="auth-footer">
          Powered by Subscribe.dev • Access 100+ AI models
        </p>
      </div>
    </div>
  )
}

export default UnauthenticatedApp