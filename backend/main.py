from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

app = FastAPI(
    title="Test App API",
    description="Test application backend - VillaEx Deployment Style",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Test App API is running!",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "test-app-backend",
        "environment": os.getenv("ENVIRONMENT", "development")
    }

@app.get("/api/hello")
async def hello():
    return {
        "message": f"🎉 Hello from Test App API! Deployed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} (VillaEx Style via Komodo)",
        "version": "1.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/info")
async def info():
    return {
        "app_name": "Test App",
        "version": "1.0.0",
        "description": "Deployed via Komodo on Docker Swarm",
        "komodo_url": "http://10.99.1.100:9020",
        "api_docs": "/docs",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
