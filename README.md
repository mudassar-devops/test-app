# Test App - VillaEx Deployment Style

A complete example application demonstrating CI/CD pipeline with Komodo, Docker Swarm, and GitHub webhooks.

## Architecture

```
Frontend (Next.js) → Backend (FastAPI) → (Optional: Database)
```

## Project Structure

```
test-app/
├── frontend/              # Next.js application
│   ├── pages/            # React pages
│   ├── Dockerfile        # Frontend image
│   └── package.json      # Dependencies
│
├── backend/              # FastAPI application
│   ├── main.py          # API endpoints
│   ├── Dockerfile       # Backend image
│   └── requirements.txt  # Python dependencies
│
├── swarm/                # Docker Swarm configurations
│   ├── prod/            # Production environment
│   │   ├── compose.yml
│   │   └── prod.env
│   └── staging/         # Staging environment
│       ├── compose.yml
│       └── staging.env
│
└── README.md
```

## Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker
- Docker Compose

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
# Open http://localhost:8000/docs
```

## Deployment

### Docker Build

#### Frontend
```bash
docker build -t testapp-frontend:latest ./frontend
docker run -p 3000:3000 testapp-frontend:latest
```

#### Backend
```bash
docker build -t testapp-backend:latest ./backend
docker run -p 8000:8000 testapp-backend:latest
```

### Docker Swarm Deployment

#### Production
```bash
docker stack deploy -c swarm/prod/compose.yml testapp \
  --with-registry-auth
```

#### Staging
```bash
docker stack deploy -c swarm/staging/compose.yml testapp-staging \
  --with-registry-auth
```

## Komodo Integration

### Build Configuration
- **Frontend Build:** `testapp-frontend`
- **Backend Build:** `testapp-backend`
- **Registry:** Docker Hub (`nexavoxa` account)

### Stack Configuration
- **Production Stack:** `testapp-production`
- **Staging Stack:** `testapp-staging` (optional)

### Procedures
- **Deployment Procedure:** `testapp_production_deploy`
  - Builds frontend and backend images
  - Pushes to Docker Hub
  - Deploys to Docker Swarm

## GitHub Integration

### Webhook Configuration
1. Go to GitHub Repository → Settings → Webhooks
2. Add webhook:
   - Payload URL: `http://10.99.1.100:9020/webhooks/github`
   - Content type: `application/json`
   - Events: Push events
   - Active: ✅

### Deployment Flow
```
Code Push (master branch)
    ↓
GitHub Webhook
    ↓
Komodo Receives Webhook
    ↓
Build Images (Frontend & Backend)
    ↓
Push to Docker Hub
    ↓
Deploy to Docker Swarm
    ↓
Live! 🚀
```

## API Endpoints

### Health Check
```bash
GET http://localhost:8000/api/health
```

### Hello Message
```bash
GET http://localhost:8000/api/hello
```

### App Info
```bash
GET http://localhost:8000/api/info
```

### API Documentation
```
http://localhost:8000/docs (Swagger)
http://localhost:8000/redoc (ReDoc)
```

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

### Backend
- `ENVIRONMENT` - Environment name (production/staging)
- `DEBUG` - Debug mode (true/false)

## Monitoring

### Logs
```bash
# Production
docker service logs testapp_backend
docker service logs testapp_frontend

# Staging
docker service logs testapp-staging_backend
docker service logs testapp-staging_frontend
```

### Health Status
```bash
curl http://localhost:8000/api/health
curl http://localhost:3000
```

## Troubleshooting

### Application won't start
1. Check Komodo logs: `docker logs compose_core_1`
2. Check build logs in Komodo UI
3. Verify images exist: `docker images | grep testapp`

### API not responding
1. Check backend is running: `curl http://localhost:8000/api/health`
2. Check network connectivity between services
3. Review docker service logs

### Frontend can't reach API
1. Verify `NEXT_PUBLIC_API_URL` environment variable
2. Check backend service is healthy
3. Test API directly: `curl http://backend:8000/api/hello`

## Documentation

- [Komodo Documentation](https://docs.komodo.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm)

## License

MIT

## Author

Mudassar Devops

## Support

For issues and questions, please open a GitHub issue.
