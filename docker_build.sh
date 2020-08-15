#!/bin/sh

echo "building images..."
docker build -t react_lab/frontend:latest -f frontend/Dockerfile ./frontend
docker build -t react_lab/backend:latest -f backend/Dockerfile ./backend

echo "----------------------------"
echo "finished!"
