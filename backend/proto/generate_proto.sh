#!/bin/sh

protoc -I . backend.proto --go_out=plugins=grpc:.