# Blogs-MicroServices
This repository contains a microservices application built with Node.js, React.js, Docker, and Kubernetes. It also includes a simple and custom implementation of an event bus. The purpose of this app is to allow users to create and view blog posts.

# Prerequisites
Before you begin, make sure you have the following installed on your machine:
   * Node.js
   * Docker
   * Kubernetes 

# Running the app locally
1. Clone the repository and navigate to the root directory:
``` shell
  git clone https://github.com/Harisabdullah/Blogs-MicroServices.git
  cd Blogs-MicroServices
```
2. Install the dependencies:
```shell
npm install
```
3. Deployment configs can be found in the `infra/k8s` directory. Make sure to change the deployment files to your own username. You must also have ingress-nginx installed with Docker. Run the following command to apply the deployment configs:
``` shell
kubectl apply .
```
4. In order to access the app locally, you'll need to add an entry to your hosts file. On Windows, the file is located at `C:\Windows\System32\drivers\etc\hosts` Add the following line at the end of the file:
``` shell
127.0.0.1 posts.com
```

5. Visit `posts.com` in your browser and the app should be running.

# Support
If you have any questions or need assistance, feel free to contact me at hariskhan1435@gmail.com
