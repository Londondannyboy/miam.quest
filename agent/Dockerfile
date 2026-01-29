FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8080

# Start command
CMD python -m uvicorn src.agent:app --host 0.0.0.0 --port ${PORT:-8080}
