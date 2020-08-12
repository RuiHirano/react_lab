FROM golang:1.14.4-alpine3.12

WORKDIR /go/src

# install tools
RUN apk update && apk add --no-cache zip unzip curl git

# build synerex daemon
WORKDIR /react_lab/backend
COPY . .

# expose port
#EXPOSE 10000
RUN go build app.go
CMD ["./app"]