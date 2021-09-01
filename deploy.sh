#!/bin/bash
# 编译任务界面
echo 'start build'
yarn build
echo 'build success'
scp -r dist/* root@39.97.252.98:/data/fast-image-editor
echo 'deploy success'
