FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start command with debugging
CMD ["/bin/sh", "-c", "echo 'Starting app...' && echo 'PORT=${PORT}' && echo 'Testing Python...' && python -c 'print(\"Python OK\")' && echo 'Testing imports...' && python -c 'from src.agent import app; print(\"Import OK\")' && echo 'Starting uvicorn...' && python -m uvicorn src.agent:app --host 0.0.0.0 --port ${PORT:-8080}"]
