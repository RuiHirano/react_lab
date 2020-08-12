
node:
		kubectl get nodes -o wide

pod:
		kubectl get pods -o wide

svc:
		kubectl get svc -o wide

desc:
		cd kube && bash kube_describe.sh

log:
		cd kube && bash kube_log.sh

exec:
		cd kube && bash kube_exec.sh

apply:
		cd kube && bash kube_apply_volume.sh && bash kube_apply.sh

delete:
		cd kube && bash ./kube_delete.sh

build-dev:
		bash ./docker_build.sh

apply-dev:
		cd kube/develop && bash kube_apply_volume.sh && bash kube_apply.sh

delete-dev:
		cd kube/develop && bash ./kube_delete.sh





