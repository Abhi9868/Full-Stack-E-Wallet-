# Docker and Docker Compose Commands

This document contains essential Docker and Docker Compose commands commonly used by senior developers for container management, development, and deployment.

## Docker Commands

### 1. `docker --version`

**Explanation**: Displays the version of Docker installed on your machine.

### 2. `docker info`

**Explanation**: Displays system-wide information about Docker, including the number of containers, images, and system resources.

### 3. `docker pull <image_name>`

**Explanation**: Downloads a Docker image from the Docker Hub or a custom repository.

### 4. `docker build -t <tag> <path>`

**Explanation**: Builds a Docker image from a `Dockerfile` located at `<path>` and tags it with `<tag>`.

### 5. `docker images`

**Explanation**: Lists all available Docker images on your local machine.

### 6. `docker ps`

**Explanation**: Lists all running containers.

### 7. `docker ps -a`

**Explanation**: Lists all containers (including stopped ones).

### 8. `docker run -d <image_name>`

**Explanation**: Runs a Docker container from an image in detached mode (background).

### 9. `docker run -p <host_port>:<container_port> <image_name>`

**Explanation**: Maps a port from the host to a port inside the container.

### 10. `docker exec -it <container_id> /bin/bash`

**Explanation**: Opens an interactive shell inside a running container.

### 11. `docker exec <container_id> <command>`

**Explanation**: Runs a command in a running container (e.g., `docker exec my_container ls`).

### 12. `docker stop <container_id>`

**Explanation**: Stops a running container.

### 13. `docker start <container_id>`

**Explanation**: Starts a stopped container.

### 14. `docker restart <container_id>`

**Explanation**: Restarts a running or stopped container.

### 15. `docker rm <container_id>`

**Explanation**: Removes a stopped container.

### 16. `docker rmi <image_name>`

**Explanation**: Removes a Docker image from your local system.

### 17. `docker logs <container_id>`

**Explanation**: Displays the logs of a running or stopped container.

### 18. `docker logs -f <container_id>`

**Explanation**: Follows the logs (real-time output) of a running container.

### 19. `docker inspect <container_id>`

**Explanation**: Provides detailed information about a container or image in JSON format.

### 20. `docker network ls`

**Explanation**: Lists all Docker networks.

### 21. `docker network create <network_name>`

**Explanation**: Creates a new Docker network.

### 22. `docker volume ls`

**Explanation**: Lists all Docker volumes.

### 23. `docker volume create <volume_name>`

**Explanation**: Creates a new Docker volume.

### 24. `docker volume rm <volume_name>`

**Explanation**: Removes a Docker volume.

### 25. `docker prune`

**Explanation**: Cleans up unused Docker resources (containers, images, networks).

### 26. `docker system prune`

**Explanation**: Removes all unused containers, images, volumes, and networks.

## Docker Compose Commands

### 27. `docker-compose up`

**Explanation**: Starts all the services defined in a `docker-compose.yml` file.

### 28. `docker-compose up -d`

**Explanation**: Starts the services in detached mode (background).

### 29. `docker-compose down`

**Explanation**: Stops and removes all containers, networks, and volumes created by `docker-compose up`.

### 30. `docker-compose build`

**Explanation**: Builds the Docker images for all services defined in the `docker-compose.yml` file.

### 31. `docker-compose logs`

**Explanation**: Displays logs for all services defined in the `docker-compose.yml` file.

### 32. `docker-compose logs -f <service_name>`

**Explanation**: Follows logs for a specific service.

### 33. `docker-compose ps`

**Explanation**: Lists all containers that are part of the current Docker Compose project.

### 34. `docker-compose exec <service_name> <command>`

**Explanation**: Runs a command inside a running container for a specific service.

### 35. `docker-compose stop`

**Explanation**: Stops all running services but doesn't remove them.

### 36. `docker-compose restart`

**Explanation**: Restarts all services defined in the `docker-compose.yml` file.

### 37. `docker-compose pull`

**Explanation**: Pulls the latest version of the images defined in the `docker-compose.yml` file.

### 38. `docker-compose push`

**Explanation**: Pushes the built images to a Docker registry.

### 39. `docker-compose run <service_name>`

**Explanation**: Runs a one-time command for a service in a new container.

### 40. `docker-compose build --no-cache`

**Explanation**: Builds the images without using cache, forcing a fresh build.

### 41. `docker-compose exec <service_name> bash`

**Explanation**: Opens an interactive bash shell in the specified service container.

### 42. `docker-compose config`

**Explanation**: Validates and outputs the current `docker-compose.yml` file configuration.

### 43. `docker-compose scale <service_name>=<number_of_instances>`

**Explanation**: Scales a specific service to the desired number of container instances.

### 44. `docker-compose create`

**Explanation**: Creates containers for services but doesn’t start them.

### 45. `docker-compose run --rm <service_name>`

**Explanation**: Runs a one-time command in a service container and removes the container after completion.

### 46. `docker-compose exec <service_name> sh`

**Explanation**: Opens an interactive shell in the specified service container, but uses `sh` if bash is unavailable.

### 47. `docker-compose down --volumes`

**Explanation**: Stops and removes containers, networks, and volumes defined in the `docker-compose.yml`.

### 48. `docker-compose logs --tail=10`

**Explanation**: Displays the last 10 lines of logs for all services.

### 49. `docker-compose up --build`

**Explanation**: Rebuilds images and starts services defined in the `docker-compose.yml` file.

### 50. `docker-compose ps -q`

**Explanation**: Displays the container IDs for all services in the current project.

---

## Conclusion

These commands will help senior developers with managing Docker containers, images, networks, and volumes effectively. Whether you're building, running, or debugging, these commands are essential for ensuring efficient container management.

Let me know if you'd like any specific command explained in further detail!
