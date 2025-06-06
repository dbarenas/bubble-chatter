# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY backend/requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend directory contents into the container at /app/backend
COPY ./backend /app/backend

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable (optional, for information)
ENV NAME ChatBubbleBackend

# Run app.py when the container launches
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
