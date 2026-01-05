# Inteview kata for dev-ops position

The objectoive of the execise is to fix, build (docker) and deploy in a kubernetes cluster a simple blockchain app.

## Prerequisites

Have a github account and fork this repository.

Local installation of 
- Docker
- kubectl
- helm
- node 22.14+

## Activities

1. connect to the kubernetes cluster using the provided kubeconfig file (`export KUBECONFIG=./interview-cluster.yaml`)
2. compile the typescript project and fix the issues
3. fix and build the docker image
4. fix and execute the helm chart into the cluster
5. verify that the application is running correctly by port-forwarding locally `curl http://localhost:8080/`


## Helper commands 

`cd app`
- setup: `npm install`
- local run: `npm run dev`
- build: `npm run build`
- local start the built app: `npm run start`
- build docker image locally: `docker build .`

`cd ..`
- connect to the cluster: `export KUBECONFIG=./interview-cluster.yaml`
- helm install: `helm install blockchain-ops ./chart -n ns-interview -f app.values.yaml`
- curl command: `curl http://localhost:8080/`