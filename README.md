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
2. review the code and explain the behaviour expected
3. compile and run the project and fix the issues
4. fix and build the docker image
5. fix and execute the helm chart into the cluster
6. verify that the application is running correctly by port-forwarding locally `curl http://localhost:8080/`

