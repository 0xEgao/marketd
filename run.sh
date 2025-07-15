#!/bin/bash

echo "Starting Marketd..."

# Start backend in background
echo "Starting backend daemon..."
(cd daemon && cargo run) &
BACKEND_PID=$!
sleep 3

# Start frontend
echo "Starting frontend..."
(cd web && npm install && npm run dev) &
FRONTEND_PID=$!

echo "Backend running on PID: $BACKEND_PID"
echo "Frontend running on PID: $FRONTEND_PID"
echo "Open http://localhost:5173 in your browser"
wait