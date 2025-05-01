# API Caching with Redis and Custom Caching Mechanism

This project demonstrates different approaches to API caching:
1. Redis-based caching
2. Custom in-memory caching implementation

The goal is to compare performance and implementation details between these two caching strategies.

## Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)

## Setup and Running

1. Clone the repository:
```bash
git clone <repository-url>
cd APICaching
```

2. Start the services using Docker Compose:
```bash
docker-compose up -d
```

This will start:
- Redis server
- API server
- Any other required services

## Project Structure

- `src/` - Source code
  - `redis/` - Redis caching implementation
  - `custom/` - Custom caching implementation
  - `api/` - API endpoints
- `docker-compose.yml` - Docker configuration
- `package.json` - Project dependencies

## API Endpoints

The API provides endpoints to test both caching mechanisms. Details will be added as the implementation progresses.

## Development

To run the project locally:

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Testing

Run tests using:
```bash
npm test
```

## License

[Add your license information here]
